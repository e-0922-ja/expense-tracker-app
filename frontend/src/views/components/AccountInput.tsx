import { useState } from "react";
import styled from "styled-components";
import { Box, Button, OutlinedInput } from "@mui/material";
import { SubButton } from "./SubButton";
import { useForm } from "react-hook-form";
import {
  ERROR_BLANK_FIRSTNAME,
  ERROR_BLANK_LASTNAME,
  ERROR_EMPTY_FIRSTNAME,
  ERROR_EMPTY_LASTNAME,
  ERROR_RESET_PASSWORD_EMAIL_NOTHING,
  ERROR_RESET_PASSWORD_SEND_MAIL,
  ERROR_SOMETHING,
  SUCCESS_RESET_PASSWORD,
} from "../../constants/message";
import { addNewLinesAfterPunctuation } from "../../utils/textUtils";
import { Friend } from "../../types";
import { client } from "../../services/supabase";
import { useUpdateAccount } from "../../hooks/useUpdateAccount";
import { FormData, Message } from "../../types";

interface AccountInputProps {
  user: Friend;
  onGetSession: () => void;
}

const BASE_URI = process.env.REACT_APP_BASE_URI;

export const AccountInput = ({ user, onGetSession }: AccountInputProps) => {
  const [editStatus, setEditStatus] = useState(false);
  const [sendEmailMessage, setSendEmailMessage] = useState<Message>({
    isError: false,
    message: "",
  });

  const {
    register: registerUpdatedUser,
    handleSubmit: handleSubmitUpdatedUser,
    formState: { errors: errorsUpdatedUser },
  } = useForm<FormData>();

  const handleEdit = () => {
    setEditStatus(true);
  };

  const { updateAccountMessage, updateAccount } = useUpdateAccount();

  const handleSave = async (formData: FormData) => {
    await updateAccount(formData);
    onGetSession();
    setEditStatus(false);
  };

  const handleSendEmail = async () => {
    const currentEmail = user.email;
    if (!currentEmail) {
      setSendEmailMessage({
        isError: true,
        message: addNewLinesAfterPunctuation(
          ERROR_RESET_PASSWORD_EMAIL_NOTHING
        ),
      });
      return;
    }
    try {
      const redirectUrl = `${BASE_URI}/reset-password`;
      const { error: sendEmailError } = await client.auth.resetPasswordForEmail(
        currentEmail,
        {
          redirectTo: redirectUrl,
        }
      );
      if (sendEmailError) {
        setSendEmailMessage({
          isError: true,
          message: ERROR_RESET_PASSWORD_SEND_MAIL,
        });
        throw sendEmailError;
      }
      setSendEmailMessage({
        isError: false,
        message: addNewLinesAfterPunctuation(SUCCESS_RESET_PASSWORD),
      });
    } catch (error) {
      setSendEmailMessage({
        isError: true,
        message: addNewLinesAfterPunctuation(ERROR_SOMETHING),
      });
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
                {...registerUpdatedUser("firstName", {
                  required: {
                    value: true,
                    message: ERROR_EMPTY_FIRSTNAME,
                  },
                  validate: {
                    noWhitespaceOnly: (value) =>
                      value.trim() !== "" || ERROR_BLANK_FIRSTNAME,
                  },
                })}
                defaultValue={user.firstName}
                fullWidth
              />
            ) : (
              <Data>{user.firstName}</Data>
            )}
          </StyledBox>
          {errorsUpdatedUser.firstName && (
            <ErrorText>{errorsUpdatedUser.firstName.message}</ErrorText>
          )}
          <InputTitle>Last Name</InputTitle>
          <StyledBox>
            {editStatus ? (
              <StyledOutlinedInput
                type="text"
                {...registerUpdatedUser("lastName", {
                  required: {
                    value: true,
                    message: ERROR_EMPTY_LASTNAME,
                  },
                  validate: {
                    noWhitespaceOnly: (value) =>
                      value.trim() !== "" || ERROR_BLANK_LASTNAME,
                  },
                })}
                defaultValue={user.lastName}
                fullWidth
              />
            ) : (
              <Data>{user.lastName}</Data>
            )}
          </StyledBox>
          {errorsUpdatedUser.lastName && (
            <ErrorText>{errorsUpdatedUser.lastName.message}</ErrorText>
          )}
          <InputTitle>Email</InputTitle>
          <StyledBox>
            <EmailData editStatus={editStatus}>{user.email}</EmailData>
          </StyledBox>
          <ButtonContainer>
            {editStatus ? (
              <StyledButton variant="contained" disableRipple type="submit">
                save
              </StyledButton>
            ) : (
              <SubButton title={"edit"} onClick={handleEdit} />
            )}
          </ButtonContainer>
          {updateAccountMessage.message && (
            <ButtonMessage isError={updateAccountMessage.isError}>
              {updateAccountMessage.message}
            </ButtonMessage>
          )}
        </StyledFormBox>
      </InfoContainer>
      <SecondSubTitle>Reset Password</SecondSubTitle>
      <SubButtonWrapper>
        <StyledButton
          variant="contained"
          disableRipple
          onClick={handleSendEmail}
        >
          send
        </StyledButton>
        {sendEmailMessage && (
          <ButtonMessage isError={sendEmailMessage.isError}>
            {sendEmailMessage.message}
          </ButtonMessage>
        )}
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

const SecondSubTitle = styled.h3`
  margin-top: 6rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const SubButtonWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  @media (max-width: 600px) {
    width: 100%;
  }
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

const ButtonMessage = styled.div<{ isError: boolean }>`
  white-space: pre-wrap;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 7px;
  font-size: 1rem;
  color: ${({ isError }) => (isError ? "#ff908d" : "#4caf50")};
`;
