import { useState } from "react";
import styled from "styled-components";
import { Box, OutlinedInput } from "@mui/material";
import { SubButton } from "./SubButton";
import { useDispatch } from "react-redux";
import { update } from "../../reducer/userSlice";
import { createClient } from "@supabase/supabase-js";

interface AccountInputProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const AccountInput = ({
  firstName,
  lastName,
  email,
}: AccountInputProps) => {
  console.log(email, "email");
  console.log(firstName, "firstName");
  console.log(lastName, "lastName");

  const dispatch = useDispatch();

  const [editStatus, setEditStatus] = useState(false);
  const [userData, setUserData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });

  const handleEdit = () => {
    setEditStatus(true);
  };

  const handleSave = async () => {
    const supabase = createClient(
      process.env.REACT_APP_SUPABASE_URL as string,
      process.env.REACT_APP_SUPABASE_ANON_KEY as string
    );

    const updatedMetaData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    console.log(userData.email, "previous email");

    const { data, error } = await supabase.auth.updateUser({
      email: userData.email,
      data: updatedMetaData,
    });
    if (error) {
      console.error("Error updating user email and metadata:", error);
    }

    if (data.user) {
      const fetchedUserInfoBySupabase = {
        firstName: data.user.user_metadata.firstName,
        lastName: data.user.user_metadata.lastName,
        email: data.user.email,
      };
      dispatch(update(fetchedUserInfoBySupabase));
    }

    setEditStatus(false);
  };

  const handleChangePass = () => {
    console.log("hello");
  };

  return (
    <div>
      <Title>User Info</Title>
      <InfoContainer>
        <InputTitle>First Name</InputTitle>
        <StyledBox>
          {editStatus ? (
            <StyledOutlinedInput
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              fullWidth
            />
          ) : (
            <Data>{userData.firstName}</Data>
          )}
        </StyledBox>
        <InputTitle>Last Name</InputTitle>
        <StyledBox>
          {editStatus ? (
            <StyledOutlinedInput
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              fullWidth
            />
          ) : (
            <Data>{userData.lastName}</Data>
          )}
        </StyledBox>
        <InputTitle>Email</InputTitle>
        <StyledBox>
          {editStatus ? (
            <StyledOutlinedInput
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              fullWidth
            />
          ) : (
            <Data>{userData.email}</Data>
          )}
        </StyledBox>
        <ButtonContainer>
          {editStatus ? (
            <SubButton title={"save"} onClick={handleSave} />
          ) : (
            <SubButton title={"edit"} onClick={handleEdit} />
          )}
        </ButtonContainer>
        <Title>Reset Password</Title>
        <StyledOutlinedInput value={userData.email} fullWidth />
        <ButtonContainer>
          <SubButton title={"Send Message"} onClick={handleChangePass} />
        </ButtonContainer>
      </InfoContainer>
    </div>
  );
};

const InfoContainer = styled.div`
  width: 70%;
  margin: 3rem 0;
`;

const InputTitle = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledBox = styled(Box)`
  margin-top: 8px;
`;

const Data = styled.div`
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 6rem;
`;

const StyledOutlinedInput = styled(OutlinedInput)`
  && .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 14px;
  }
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;
