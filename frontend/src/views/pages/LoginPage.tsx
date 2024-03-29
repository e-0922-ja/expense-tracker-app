import styled from "styled-components";
import { IconButton, InputBase, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { emailRegex, passwordRegex } from "../../utils/regexPatternUtils";
import { FormButton } from "../components/FormButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  ERROR_EMAIL,
  ERROR_PASSWORD,
  ERROR_USER_NOTFOUND,
} from "../../constants/message";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { client } from "../../services/supabase";
import { UserService } from "../../services/users";
import { login } from "../../reducer/userSlice";
import { CurrentUser, Message } from "../../types";

export const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [authMessage, setAuthMessage] = useState<Message>({
    isError: false,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrentUser>();

  const navigate = useNavigate();

  const handleloginWithEmail = async (currentUser: CurrentUser) => {
    const { email, password } = currentUser;
    const { error, data } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthMessage({ isError: true, message: error.message });
      return;
    }
    if (!data?.user) {
      setAuthMessage({ isError: true, message: ERROR_USER_NOTFOUND });
      return;
    }

    const userInfo = await UserService.getUserInfoFromSession();
    if (userInfo) {
      dispatch(login(userInfo.user_metadata.firstName));
      navigate("/history");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <ComponentWrapper>
      <LoginWrapper>
        <TitleWrapper>
          <Title>Login</Title>
          <Text>New to Expense tracker? </Text>
          <Link to="/signup">Signup</Link>
        </TitleWrapper>
        <FormWrapper onSubmit={handleSubmit(handleloginWithEmail)}>
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
            <InputPaper elevation={0}>
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
            </InputPaper>
            {errors.password && <ErrorText>{ERROR_PASSWORD}</ErrorText>}
          </InputWrapper>
          <ButtonWrapper>
            <FormButton title="login" />
          </ButtonWrapper>
          {authMessage && (
            <LoginMessage isError={authMessage.isError}>
              {authMessage.message}
            </LoginMessage>
          )}
        </FormWrapper>
      </LoginWrapper>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const LoginWrapper = styled.div`
  padding: 20px 0;
  width: 35%;
  background: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: 80%;
  }
`;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const InputPaper = styled(Paper)`
  margin: 15px 0 7px;
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

const LoginMessage = styled.div<{ isError: boolean }>`
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
