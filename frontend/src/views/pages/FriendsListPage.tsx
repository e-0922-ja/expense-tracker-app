import Box from "@mui/material/Box";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { emailRegex } from "../../utils/regexPatternUtils";
import { useNavigate } from "react-router-dom";
import { InputAdornment, InputBase, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Friend, FriendWithStatus } from "../../types";
import { SubButton } from "../components/SubButton";
import { Database } from "../../../../supabase/schema";
import { SupabaseEdgeFunctionService } from "../../services/supabaseEdgeFunction";
import {
  ERROR_EMAIL,
  ERROR_SELECT_FRIENDS,
  ERROR_SEND_EXISTED_ADDRESS,
  ERROR_SEND_FAILED,
  ERROR_SEND_OWN_ADDRESS,
} from "../../constants/message";
import { GobackButton } from "../components/GobackButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { paths } from "../../constants/routePaths";

interface FriendEmail {
  email: string;
}

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export type FriendShipsReturns =
  Database["public"]["Functions"]["get_user_friends"]["Returns"];
export type FriendShipsArgs =
  Database["public"]["Functions"]["get_user_friends"]["Args"];
export type FriendShipsInsert =
  Database["public"]["Tables"]["Friendships"]["Insert"];

export const FriendsListPage = () => {
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [friends, setFriends] = useState<FriendShipsReturns>([]);
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
  const userId = userState.user?.id!;
  const userEmail = userState.user?.email;
  const userFirstName = userState.user?.firstName;
  const userLastName = userState.user?.lastName;

  const navigate = useNavigate();

  const getUserFriendsById = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc("get_user_friends", {
        user_id: userId,
      });
      if (error) {
        setError(error.message);
        return false;
      } else {
        setFriends(data);
        return true;
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  }, [userId]);

  useEffect(() => {
    getUserFriendsById();
  }, [getUserFriendsById]);

  const onSubmit = (data: FriendEmail) => {
    const { email } = data;
    sendFriendRequest(email);
  };

  const sendFriendRequest = async (email: string) => {
    const emailToLowerCase = email.toLowerCase();
    if (emailToLowerCase === userEmail) {
      setError(ERROR_SEND_OWN_ADDRESS);
    } else {
      const resultCountFriendShipByEmail = await countFriendShipByEmail(
        emailToLowerCase
      );
      if (
        typeof resultCountFriendShipByEmail === "number" &&
        resultCountFriendShipByEmail > 0
      ) {
        setError(ERROR_SEND_EXISTED_ADDRESS);
      } else {
        const resultGetFriendByEmail = await getFriendByEmail(emailToLowerCase);
        if (resultGetFriendByEmail) {
          const resultInsertFriendship = await insertFriendship(
            resultGetFriendByEmail,
            emailToLowerCase
          );
          if (resultInsertFriendship) {
            const emailResponse = await SupabaseEdgeFunctionService.sendEmail(
              email,
              `${userFirstName} ${userLastName}`
            );

            if (!emailResponse.status) {
              setError(ERROR_SEND_FAILED);
            }

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
    id: string,
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
        return false;
      } else {
        return data;
      }
    } catch (error: any) {
      setError(error.message);
      return false;
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
    const friendshipsData: FriendShipsInsert = {
      userId: userId,
      friendId: data.length > 0 ? data[0].id : null,
      friendEmail: data.length > 0 ? data[0].email : email,
      statusId: 1, // status: pending
      registeredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

  const handleClick = () => {
    if (selectedFriends.length > 0) {
      setSelectedError("");
      navigate(paths.payment, {
        state: { selectedFriends },
      });
    } else {
      setSelectedError(ERROR_SELECT_FRIENDS);
    }
  };

  const handleGoBack = () => {
    navigate("/history");
  };

  return (
    <MainContainer>
      <SubContainer>
        <GobackButtonWrapper>
          <GobackButton onClick={handleGoBack} />
        </GobackButtonWrapper>
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
                fullWidth
                {...register("email", {
                  required: true,
                  pattern: emailRegex,
                })}
              />
            </InputPaper>
            {errors.email && <ErrorText>{ERROR_EMAIL}</ErrorText>}
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
      <FriendListSubContainer>
        <Title>Friendslist</Title>
        <UnorderedList>
          {/* statusId 1: pending, 2: approved */}
          {/* friend.id could be null so pathing index instead of friend.id */}
          {friends!
            .filter((friend) => friend.statusId === 2 || friend.sender)
            .map((friend: FriendWithStatus, index) => {
              return (
                <List key={index}>
                  <CheckBox
                    type="checkbox"
                    id={index.toString()}
                    checked={
                      !!selectedFriends.find(
                        (selectedFriend) =>
                          selectedFriend.email === friend.email
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
                    disabled={friend.statusId === 1}
                  />
                  <Label htmlFor={index.toString()}>
                    {friend.statusId !== 1 ? (
                      <ListItem>
                        {friend.firstName} {friend.lastName}
                      </ListItem>
                    ) : (
                      <PendingFriendList>
                        <AccessTimeIcon fontSize="small" />
                        <PendingListItem>pending approval</PendingListItem>
                      </PendingFriendList>
                    )}
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
      </FriendListSubContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: calc(100% - 64px);
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  gap: 20px;
  background: ${({ theme }) => theme.palette.primary.main};
  height: 100vh;
  @media (max-width: 600px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

const FriendListSubContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 35%;
  padding: 2rem;
  background: ${({ theme }) => theme.palette.primary.main};
  margin-top: 70px;
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    padding: 0;
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
  margin-top: 30px;
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    padding: 0;
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

const PendingFriendList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PendingListItem = styled.span`
  display: inline-block;
  padding: 0 0.4rem;
  font-size: 0.8rem;
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

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

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

const GobackButtonWrapper = styled.div`
  width: 70%;
  display: flex;
`;
