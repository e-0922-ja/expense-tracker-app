import Box from "@mui/material/Box";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Button from "@mui/material/Button";
import { emailRegex, errEmail } from "../../constants/regexPattern";
import { useNavigate } from "react-router-dom";
import { InputAdornment, InputBase, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

interface Friend {
  firstName: string;
  lastName: string;
  email: string;
}

interface FriendEmail {
  email: string;
}

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const FriendsListPage = () => {
  const [userId, setUserId] = useState<string>("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FriendEmail>();

  const userState = useSelector((state: RootState) => state.user);
  const isLogin = userState.isLogin;
  // ==============================================================
  // use it when sending email that show
  // ==============================================================
  const firstName = userState.user?.firstName;
  const lastName = userState.user?.lastName;
  const navigate = useNavigate();

  // ==============================================================
  // change the operation to using userState to check the user is
  // logged in or not later
  // ==============================================================
  useEffect(() => {
    signIn(); // remove it later
    // isLogin ? getFriends() : navigate("/");
  }, []);

  useEffect(() => {
    if (userId) {
      getFriends();
    }
  }, [userId]);

  const onSubmit = (data: FriendEmail) => {
    const { email } = data;
    sendFriendRequest(email);
  };

  const sendFriendRequest = async (email: string) => {
    const resultGetFriendEmail = await getFriendEmail(email);
    if (resultGetFriendEmail) {
      const resultInsertFriendship = await insertFriendship(
        resultGetFriendEmail,
        email
      );

      if (resultInsertFriendship) {
        // send email
      }
    }
  };

  const getFriendEmail = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", email);
      if (error) {
        console.error(error);
        return false;
      } else {
        return data;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const insertFriendship = async (data: any, email: string) => {
    const friendshipsData = {
      userId: userId,
      friendId: data ? data[0].id : null,
      friendEmail: data ? data[0].email : email,
      statusId: 1, // status: pending
      registeredAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const { error } = await supabase
        .from("Friendships")
        .insert(friendshipsData);
      if (error) {
        console.error(error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // for showing a friends list to a user
  const getFriends = async () => {
    try {
      const { data, error } = await supabase.rpc("get_user_friends", {
        user_id: userId,
      });
      if (error) {
        console.error(error);
      } else {
        setFriends(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ==============================================================
  // this function below will be executed when user logged in
  // so remove it later
  // ==============================================================
  const signIn = async () => {
    const { data: userData, error: userError } =
      await supabase.auth.signInWithPassword({
        email: "life.4.ism@icloud.com",
        password: "Tr@ve1ing",
      });

    if (userError) {
      console.log(userError);
      return;
    }
    setUserId(userData.user?.id ?? "");
  };

  return (
    <MainContainer>
      <SubContainer>
        <Title>Add new friends</Title>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputWrapper>
            <InputPaper>
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
          <Button type="submit" variant="contained">
            SEND
          </Button>
        </Box>
      </SubContainer>
      <SubContainer>
        <TitleTwo>Friendslist</TitleTwo>
        <div>
          <UnorderedList>
            {friends!.map((friend: Friend, index) => {
              return (
                <List key={index}>
                  <ListItem>
                    {friend.firstName + " " + friend.lastName}
                  </ListItem>
                  <ListItem>{friend.email}</ListItem>
                </List>
              );
            })}
          </UnorderedList>
        </div>
      </SubContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  width: 600px;
  border: 2px solid black;
  padding: 2rem;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const Title = styled.h1`
  margin-top: 3rem;
  margin-bottom: 5rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const TitleTwo = styled.h1`
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const UnorderedList = styled.ul`
  padding: 0px;
  width: 500px;
`;

const List = styled.li`
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
`;

const ListItem = styled.span`
  display: inline-block;
`;

const ErrorText = styled.div`
  height: 0.75rem;
  font-size: 0.7rem;
  color: #ff908d;
`;

// ==============================================================
// commonized later
// ==============================================================
const InputWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

// ==============================================================
// commonized later
// ==============================================================
const InputPaper = styled(Paper)`
  margin: 15px 0 7px;
  padding: 7px;
  display: flex;
  align-items: center;
`;
