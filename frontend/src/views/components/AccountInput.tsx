import { useState } from "react";
import styled from "styled-components";
import { Box, Button, OutlinedInput } from "@mui/material";
import { SubButton } from "./SubButton";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, update } from "../../reducer/userSlice";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../constants/regexPattern";
import {
  ERROR_CHANGE_ACCOUNT_INFO,
  ERROR_EMAIL,
  ERROR_FIRSTNAME,
  ERROR_LASTNAME,
  ERROR_RESET_PASSWORD_EMAIL_NOTHING,
  ERROR_RESET_PASSWORD_SEND_MAIL,
  ERROR_SOMETHING,
  SUCCESS_CHANGE_ACCOUNT_INFO,
  SUCCESS_RESET_PASSWORD,
  deleteMsg,
} from "../../constants/messages";

interface AccountInputProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const AccountInput = ({
  firstName,
  lastName,
  email,
}: AccountInputProps) => {
  const dispatch = useDispatch();
  const [editStatus, setEditStatus] = useState(false);
  const [errorUpdateUserInfo, setErrorUpdateUserInfo] = useState("");
  const [successUpdateUserInfo, setSuccessUpdateUserInfo] = useState("");
  const [errorSendEmail, setErrorSendEmail] = useState("");
  const [successSendEmail, setSuccessSendEmail] = useState("");

  const {
    register: registerUpdatedUser,
    handleSubmit: handleSubmitUpdatedUser,
    formState: { errors: errorsUpdatedUser },
  } = useForm<FormData>();

  const account = useSelector(selectUser);

  const handleEdit = () => {
    setEditStatus(true);
  };

  const handleSave = async (formData: FormData) => {
    const { firstName, lastName, email } = formData;

    const updatedMetaData = {
      firstName: firstName,
      lastName: lastName,
    };

    const { data, error } = await supabase.auth.updateUser({
      email: email,
      data: updatedMetaData,
    });
    if (error) {
      setErrorUpdateUserInfo(ERROR_CHANGE_ACCOUNT_INFO);
      console.error(ERROR_CHANGE_ACCOUNT_INFO);
      deleteMsg(setErrorUpdateUserInfo, "");
    }

    if (data.user) {
      const fetchedUserInfoBySupabase = {
        id: data.user.id,
        firstName: data.user.user_metadata.firstName,
        lastName: data.user.user_metadata.lastName,
        email: data.user.email,
      };
      dispatch(update(fetchedUserInfoBySupabase));
      setSuccessUpdateUserInfo(SUCCESS_CHANGE_ACCOUNT_INFO);
      deleteMsg(setSuccessUpdateUserInfo, "");
    }
    setEditStatus(false);
  };

  const handleSendEmail = async () => {
    const currentEmail = account.user?.email;
    if (!currentEmail) {
      setErrorSendEmail(ERROR_RESET_PASSWORD_EMAIL_NOTHING);
      deleteMsg(setErrorSendEmail, "");
      return;
    }
    try {
      const { error: sendEmailError } =
        await supabase.auth.resetPasswordForEmail(currentEmail, {
          redirectTo: "http://localhost:3000/passwordReset",
        });
      if (sendEmailError) {
        setErrorSendEmail(ERROR_RESET_PASSWORD_SEND_MAIL);
        deleteMsg(setErrorSendEmail, "");
        throw sendEmailError;
      }
      setSuccessSendEmail(SUCCESS_RESET_PASSWORD);
      deleteMsg(setSuccessSendEmail, "");
    } catch (error) {
      setErrorSendEmail(ERROR_SOMETHING);
      deleteMsg(setErrorSendEmail, "");
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
                defaultValue={firstName} // use defaultValue instead of value
                fullWidth
              />
            ) : (
              <Data>{account.user?.firstName}</Data>
            )}
          </StyledBox>
          {errorsUpdatedUser.firstName && (
            <ErrorText>{ERROR_FIRSTNAME}</ErrorText>
          )}
          <InputTitle>Last Name</InputTitle>
          <StyledBox>
            {editStatus ? (
              <StyledOutlinedInput
                type="text"
                {...registerUpdatedUser("lastName", { required: true })} // if firstName is required
                defaultValue={lastName} // use defaultValue instead of value
                fullWidth
              />
            ) : (
              <Data>{account.user?.lastName}</Data>
            )}
          </StyledBox>
          {errorsUpdatedUser.lastName && (
            <ErrorText>{ERROR_LASTNAME}</ErrorText>
          )}
          <InputTitle>Email</InputTitle>
          <StyledBox>
            {editStatus ? (
              <StyledOutlinedInput
                {...registerUpdatedUser("email", {
                  required: true,
                  pattern: emailRegex,
                })}
                defaultValue={email}
                fullWidth
              />
            ) : (
              <Data>{account.user?.email}</Data>
            )}
          </StyledBox>
          {errorsUpdatedUser.email && <ErrorText>{ERROR_EMAIL}</ErrorText>}
          <ButtonContainer>
            {editStatus ? (
              <StyledButton variant="contained" disableRipple type="submit">
                save
              </StyledButton>
            ) : (
              <SubButton title={"edit"} onClick={handleEdit} />
            )}
          </ButtonContainer>
          {errorUpdateUserInfo && (
            <ErrorText
              dangerouslySetInnerHTML={{ __html: errorUpdateUserInfo }}
            />
          )}
          {successUpdateUserInfo && (
            <SuccessText
              dangerouslySetInnerHTML={{ __html: successUpdateUserInfo }}
            />
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
        {errorSendEmail && (
          <ErrorText dangerouslySetInnerHTML={{ __html: errorSendEmail }} />
        )}
        {successSendEmail && (
          <SuccessText dangerouslySetInnerHTML={{ __html: successSendEmail }} />
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

const SuccessText = styled.div`
  margin-top: 7px;
  font-size: 1rem;
  color: #4caf50;
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
