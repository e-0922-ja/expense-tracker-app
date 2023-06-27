import styled from "styled-components";
import { IconButton, InputBase, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SupabaseService } from "../../services/supabase";
import { emailRegex, passwordRegex } from "../../utils/regexPatternUtils";
import { FormButton } from "../components/FormButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  ERROR_EMAIL,
  ERROR_FIRSTNAME,
  ERROR_LASTNAME,
  ERROR_PASSWORD,
  ERROR_PASSWORDCONF,
  ERROR_SOMETHING,
  ERROR_USER_EXIST,
  SUCCESS_SIGNUP,
} from "../../constants/message";
import { addNewLinesAfterPunctuation } from "../../utils/textUtils";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Message {
  isError: boolean;
  message: string;
}

export const SignUpPage = () => {
  const [authMessage, setAuthMessage] = useState<Message>({
    isError: false,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<NewUser>();

  const onSubmit = async (data: NewUser) => {
    const { firstName, lastName, email, password } = data;

    const { isError, message, user } = await SupabaseService.createAuthUser({
      email,
      password,
      firstName,
      lastName,
    });
    if (isError) {
      setAuthMessage({ isError: true, message: message });
      return;
    }
    if (!user) {
      setAuthMessage({
        isError: true,
        message: addNewLinesAfterPunctuation(ERROR_SOMETHING),
      });
      return;
    }
    const searchUser = await SupabaseService.findUserByEmail(user.email);
    if (searchUser) {
      setAuthMessage({ isError: true, message: ERROR_USER_EXIST });
      return;
    }
    await SupabaseService.createUser(user);
    setAuthMessage({
      isError: false,
      message: addNewLinesAfterPunctuation(SUCCESS_SIGNUP),
    });
  };

  return (
    <ComponentWrapper>
      <SignUpWrapper>
        <TitleWrapper>
          <Title>SignUp</Title>
          <Text>Already have an account? </Text>
          <Link to="/login">Login</Link>
        </TitleWrapper>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputPaper elevation={0}>
              <IconContainer>
                <AccountCircle />
              </IconContainer>
              <InputBase
                fullWidth
                placeholder="First Name"
                type="text"
                {...register("firstName", { required: true })}
              />
            </InputPaper>
            {errors.firstName && <ErrorText>{ERROR_FIRSTNAME}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputPaper elevation={0}>
              <IconContainer>
                <AccountCircle />
              </IconContainer>
              <InputBase
                fullWidth
                placeholder="Last Name"
                type="text"
                {...register("lastName", { required: true })}
              />
            </InputPaper>
            {errors.lastName && <ErrorText>{ERROR_LASTNAME}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputPaper elevation={0}>
              <IconContainer>
                <MailOutlineIcon />
              </IconContainer>
              <InputBase
                fullWidth
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: emailRegex,
                })}
              />
            </InputPaper>
            {errors.email && <ErrorText>{ERROR_EMAIL}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputPaperPassword elevation={0}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>

              <InputBase
                fullWidth
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  pattern: passwordRegex,
                })}
              />
            </InputPaperPassword>
            {errors.password && <ErrorText>{ERROR_PASSWORD}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputPaperPassword elevation={0}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              <InputBase
                fullWidth
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === getValues("password"),
                })}
              />
            </InputPaperPassword>
            {errors.confirmPassword && (
              <ErrorText>{ERROR_PASSWORDCONF}</ErrorText>
            )}
          </InputWrapper>
          <ButtonWrapper>
            <FormButton title="register" />
          </ButtonWrapper>
          {authMessage && (
            <SignupMessage isError={authMessage.isError}>
              {authMessage.message}
            </SignupMessage>
          )}
        </FormWrapper>
      </SignUpWrapper>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const SignUpWrapper = styled.div`
  padding: 20px 0;
  width: 35%;
  background: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: 70%;
  }
`;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const InputPaper = styled(Paper)`
  margin: 15px 0 7px;
  padding: 7px;
  display: flex;
  align-items: center;
`;

const InputPaperPassword = styled(Paper)`
  margin: 15px 0 7px;
  padding: 7px;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  color: ${({ theme }) => theme.palette.secondary.light};
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0 0 7px 0;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.info.light};
`;

const ErrorText = styled.span`
  font-size: 0.7rem;
  color: #ff908d;
`;

const SignupMessage = styled.div<{ isError: boolean }>`
  white-space: pre-wrap;
  display: flex;
  justify-content: center;
  width: 70%;
  margin-top: 7px;
  font-size: 1rem;
  color: ${({ isError }) => (isError ? "#ff908d" : "#4caf50")};
`;

const ButtonWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
`;

const IconContainer = styled.div`
  padding: 8px;
  color: rgba(0, 0, 0, 0.54);
`;
