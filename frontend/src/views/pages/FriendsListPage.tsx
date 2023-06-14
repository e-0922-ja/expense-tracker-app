import Box from "@mui/material/Box";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { emailRegex, errEmail } from "../../constants/regexPattern";
import { useNavigate } from "react-router-dom";
import { InputAdornment, InputBase, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Friend } from "../../types";
import { UUID } from "crypto";
import { SubButton } from "../components/SubButton";

interface FriendEmail {
  email: string;
}

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const FriendsListPage = () => {
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedError, setSelectedError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FriendEmail>();

  const userState = useSelector((state: RootState) => state.user);
  const userId = userState.user?.id;
  const userEmail = userState.user?.email;

  const navigate = useNavigate();

  useEffect(() => {
    getUserFriendsById();
  }, []);

  const onSubmit = (data: FriendEmail) => {
    const { email } = data;
    sendFriendRequest(email);
  };

  const sendFriendRequest = async (email: string) => {
    if (email === userEmail) {
      setError("You cannot send a friend request to your email address.");
    } else {
      const resultCountFriendShipByEmail = await countFriendShipByEmail(email);
      if (resultCountFriendShipByEmail > 0) {
        setError("You've already sent a friend request to this email.");
      } else {
        const resultGetFriendByEmail = await getFriendByEmail(email);
        if (resultGetFriendByEmail) {
          const resultInsertFriendship = await insertFriendship(
            resultGetFriendByEmail,
            email
          );
          if (resultInsertFriendship) {
            // ==============================================================
            // implement send email function later
            // ==============================================================

            // to retrieve the data to update the friend list
            const resultGetUserFriendsById = await getUserFriendsById();
            if (resultGetUserFriendsById) {
              reset();
              setError("");
            }
            setSuccess(
              `You have successfully sent a friend request to ${email}!`
            );
          }
        }
      }
    }
  };

  const handleSendEmail = () => {
    console.log("send mail");
  };

  // Check friends to add or not
  const handleCheckedChange = (
    id: UUID,
    email: string,
    firstName: string,
    lastName: string,
    isChecked: boolean
  ): void => {
    if (isChecked) {
      const addFriend: Friend = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      setSelectedFriends((prevSelectedFriends) => [
        ...prevSelectedFriends,
        addFriend,
      ]);
    } else {
      setSelectedFriends((prevSelectedFriends) =>
        prevSelectedFriends.filter((person) => person.email !== email)
      );
    }
  };

  // check if a user has already sent a friend request to the input email address
  const countFriendShipByEmail = async (email: string) => {
    try {
      const { data, error } = await supabase.rpc("check_friendship", {
        user_id: userId,
        friend_email: email,
      });
      if (error) {
        setError(error.message);
      } else {
        return data;
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const getFriendByEmail = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", email);
      if (error) {
        setError(error.message);
        return false;
      } else {
        return data;
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  // register the input email address to friendships table for a friend request
  const insertFriendship = async (data: any, email: string) => {
    const friendshipsData = {
      userId: userId,
      friendId: data.length > 0 ? data[0].id : null,
      friendEmail: data.length > 0 ? data[0].email : email,
      statusId: 1, // status: pending
      registeredAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const { error } = await supabase
        .from("Friendships")
        .insert(friendshipsData);
      if (error) {
        setError(error.message);
        return false;
      } else {
        return true;
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const getUserFriendsById = async () => {
    try {
      const { data, error } = await supabase.rpc("get_user_friends", {
        user_id: userId,
      });
      if (error) {
        setError(error.message);
        return false;
      } else {
        console.log(userId, "id");
        console.log(data, "data");
        setFriends(data);
        console.log(friends, "friends");
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const handleClick = () => {
    if (selectedFriends.length > 0) {
      setSelectedError("");
      navigate("/expenses/payment", {
        state: { selectedFriends },
      });
    } else {
      setSelectedError("select friends from your friends list");
    }
  };

  return (
    <MainContainer>
      <SubContainer>
        <Title>Add new friends</Title>
        <StyledBox component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputPaper elevation={0}>
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
              <InputBase
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: emailRegex,
                })}
              />
            </InputPaper>
            {errors.email && <ErrorText>{errEmail}</ErrorText>}
          </InputWrapper>
          <SubButtonWrapper>
            <SubButton title={"send"} onClick={handleSendEmail} />
            {error ? (
              <ErrorText>{error}</ErrorText>
            ) : success ? (
              <SuccessText>{success}</SuccessText>
            ) : null}
          </SubButtonWrapper>
        </StyledBox>
      </SubContainer>
      <SubContainer>
        <Title>Friendslist</Title>
        <UnorderedList>
          {friends!.map((friend: Friend, index) => {
            return (
              <List key={index}>
                <CheckBox
                  type="checkbox"
                  id={index.toString()}
                  checked={
                    !!selectedFriends.find(
                      (selectedFriend) => selectedFriend.email === friend.email
                    )
                  }
                  onChange={(event) =>
                    handleCheckedChange(
                      friend.id,
                      friend.email,
                      friend.firstName,
                      friend.lastName,
                      event.target.checked
                    )
                  }
                  disabled={!friend.id}
                />
                <Label htmlFor={index.toString()}>
                  <ListItem>
                    {friend.firstName
                      ? `${friend.firstName}  ${friend.lastName}`
                      : "-"}
                  </ListItem>
                  <ListItem>{friend.email}</ListItem>
                </Label>
              </List>
            );
          })}
        </UnorderedList>

        <ButtonContainer>
          <SubButton title={"create"} onClick={handleClick} />
        </ButtonContainer>
        {selectedFriends.length === 0 && <ErrorText>{selectedError}</ErrorText>}
      </SubContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: calc(100% - 64px);
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SubContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 35%;
  padding: 2rem;
  background: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
  }
`;

const Title = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const UnorderedList = styled.ul`
  padding: 0px;
  height: 60%;
  width: 80%;
  overflow: auto;
`;

const List = styled.li``;

const CheckBox = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 0.25rem;
  padding: 0.6rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  cursor: pointer;
  ${CheckBox}:checked + & {
    background: #e0e0e0;
  }
`;

const ListItem = styled.span`
  display: inline-block;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
`;

const ErrorText = styled.div`
  margin-top: 7px;
  font-size: 1rem;
  color: #ff908d;
`;

const SuccessText = styled.div`
  margin-top: 7px;
  font-size: 1rem;
  color: #4caf50;
`;

// ==============================================================
// commonized later
// ==============================================================
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// ==============================================================
// commonized later
// ==============================================================
const InputPaper = styled(Paper)`
  margin: 15px 0 0;
  padding: 7px;
  display: flex;
  align-items: center;
  border: solid 1px ${({ theme }) => theme.palette.secondary.main};
`;

const SubButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 70%;
  margintop: 2rem;
`;
