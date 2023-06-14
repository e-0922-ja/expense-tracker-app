import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";
import { IconButton, InputBase, Paper } from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  emailRegex,
  errEmail,
  errFirstName,
  errLastName,
  errPassword,
  errPasswordConf,
  passwordRegex,
} from "../../constants/regexPattern";
import { FormButton } from "../components/FormButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpPage = () => {
  const [authError, setAuthError] = useState("");
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

  const navigate = useNavigate();

  const onSubmit = async (data: NewUser) => {
    const { firstName, lastName, email, password } = data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });
    if (error) {
      setAuthError(error.message);
      return;
    }
    navigate("/login");
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
                placeholder="First Name"
                type="text"
                {...register("firstName", { required: true })}
              />
            </InputPaper>
            {errors.firstName && <ErrorText>{errFirstName}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputPaper elevation={0}>
              <IconContainer>
                <AccountCircle />
              </IconContainer>
              <InputBase
                placeholder="Last Name"
                type="text"
                {...register("lastName", { required: true })}
              />
            </InputPaper>
            {errors.lastName && <ErrorText>{errLastName}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputPaper elevation={0}>
              <IconContainer>
                <MailOutlineIcon />
              </IconContainer>
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
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  pattern: passwordRegex,
                })}
              />
            </InputPaperPassword>
            {errors.password && <ErrorText>{errPassword}</ErrorText>}
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
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === getValues("password"),
                })}
              />
            </InputPaperPassword>
            {errors.confirmPassword && <ErrorText>{errPasswordConf}</ErrorText>}
          </InputWrapper>

          <ButtonWrapper>
            <FormButton title="register" />
          </ButtonWrapper>
          {authError && <ErrorText>{authError}</ErrorText>}
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
