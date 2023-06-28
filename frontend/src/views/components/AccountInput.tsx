import { useState } from "react";
import styled from "styled-components";
import { Box, Button, OutlinedInput } from "@mui/material";
import { SubButton } from "./SubButton";
import { useForm } from "react-hook-form";
import {
  // emailRegex,
  errEmail,
  errFirstName,
  errLastName,
} from "../../constants/regexPattern";
import { client } from "../../services/supabase";
import { Friend } from "../../types";

interface AccountInputProps {
  user: Friend;
  onGetSession: () => void;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const AccountInput = ({ user, onGetSession }: AccountInputProps) => {
  const [editStatus, setEditStatus] = useState(false);

  const {
    register: registerUpdatedUser,
    handleSubmit: handleSubmitUpdatedUser,
    formState: { errors: errorsUpdatedUser },
  } = useForm<FormData>();

  const handleEdit = () => {
    setEditStatus(true);
  };

  const handleSave = async (formData: FormData) => {
    const { firstName, lastName, email } = formData;

    const updatedMetaData = {
      firstName: firstName,
      lastName: lastName,
    };

    const { data, error } = await client.auth.updateUser({
      email: email,
      data: updatedMetaData,
    });

    if (error) {
      console.error("Error updating user email and metadata:", error);
    }

    if (data.user) {
      onGetSession();
    }

    setEditStatus(false);
  };

  const handleSendEmail = async () => {
    const currentEmail = user.email;
    if (!currentEmail) {
      alert("Email not defined");
      return;
    }
    try {
      const { error: sendEmailError } = await client.auth.resetPasswordForEmail(
        currentEmail,
        {
          redirectTo: "http://localhost:3000/passwordReset",
        }
      );
      if (sendEmailError) {
        throw sendEmailError;
      }
      alert("Please check your email");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <Title>Account</Title>
      <SubTitle>Your information</SubTitle>

      <InfoContainer>
        <StyledFormBox
          component="form"
          onSubmit={handleSubmitUpdatedUser(handleSave)}
        >
          <InputTitle>First Name</InputTitle>
          <StyledBox>
            {editStatus ? (
              <StyledOutlinedInput
                {...registerUpdatedUser("firstName", { required: true })} // if firstName is required
                defaultValue={user.firstName} // use defaultValue instead of value
                fullWidth
              />
            ) : (
              <Data>{user.firstName}</Data>
            )}
          </StyledBox>
          {errorsUpdatedUser.firstName && <ErrorText>{errFirstName}</ErrorText>}
          <InputTitle>Last Name</InputTitle>
          <StyledBox>
            {editStatus ? (
              <StyledOutlinedInput
                type="text"
                {...registerUpdatedUser("lastName", { required: true })} // if firstName is required
                defaultValue={user.lastName} // use defaultValue instead of value
                fullWidth
              />
            ) : (
              <Data>{user.lastName}</Data>
            )}
          </StyledBox>
          {errorsUpdatedUser.lastName && <ErrorText>{errLastName}</ErrorText>}
          <InputTitle>Email</InputTitle>
          <StyledBox>
            {/* {editStatus ? (
              <StyledOutlinedInput
                {...registerUpdatedUser("email", {
                  required: true,
                  pattern: emailRegex,
                })}
                defaultValue={user.email}
                fullWidth
              />
            ) : (
              <Data>{user.email}</Data>
            )} */}
            <EmailData editStatus={editStatus}>{user.email}</EmailData>
          </StyledBox>
          {errorsUpdatedUser.email && <ErrorText>{errEmail}</ErrorText>}
          <ButtonContainer>
            {editStatus ? (
              <StyledButton variant="contained" disableRipple type="submit">
                save
              </StyledButton>
            ) : (
              <SubButton title={"edit"} onClick={handleEdit} />
            )}
          </ButtonContainer>
        </StyledFormBox>
      </InfoContainer>
      <SubTitle>Reset Password</SubTitle>

      <SubButtonWrapper>
        <StyledButton
          variant="contained"
          disableRipple
          onClick={handleSendEmail}
        >
          send
        </StyledButton>
      </SubButtonWrapper>
    </div>
  );
};

const InfoContainer = styled.div`
  width: 70%;
  margin: 1rem 0;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const InputTitle = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledBox = styled(Box)`
  margin-top: 8px;
  color: ${({ theme }) => theme.palette.info.light};
`;

const Data = styled.div`
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 10px;
`;

const EmailData = styled.div<{ editStatus: boolean }>`
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 10px;
  color: ${({ editStatus }) => (editStatus ? "grey" : "black")};
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 6rem;
`;

const StyledOutlinedInput = styled(OutlinedInput)`
  &.MuiOutlinedInput-root {
    /* Change the background color */
    background-color: ${({ theme }) => theme.palette.primary.light};
    color: ${({ theme }) => theme.palette.info.light};

    .MuiInputBase-input.MuiOutlinedInput-input {
      padding: 14px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.info.light};
    }

    &:not(:hover) .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.info.light};
    }
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.info.light};
  }
`;

const Title = styled.h2`
  margin-top: 1rem;
  padding-bottom: 2rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const SubTitle = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const SubButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const StyledFormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margintop: 2rem;
`;

const ErrorText = styled.div`
  margin-top: 7px;
  font-size: 1rem;
  color: #ff908d;
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.palette.secondary.main} !important;
  border: 0;
  color: white;
  width: 100% !important;
  height: 40px !important;
  fontsize: 1rem !important;
  padding: 0 30px !important;
  border-radius: 24px !important;
`;
