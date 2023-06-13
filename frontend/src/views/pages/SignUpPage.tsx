import styled from "styled-components";
import { Button, InputAdornment, InputBase, Paper } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SupabaseService } from "../../services/supabase";
import {
  emailRegex,
  errEmail,
  errFirstName,
  errLastName,
  errPassword,
  errPasswordConf,
  passwordRegex,
} from "../../constants/regexPattern";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpPage = () => {
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<NewUser>();

  const navigate = useNavigate();

  const onSubmit = async (data: NewUser) => {
    const { firstName, lastName, email, password } = data;

    const { isError, message, user } = await SupabaseService.createAuthUser({
      email,
      password,
      firstName,
      lastName,
    });
    if (isError) {
      setAuthError(message);
      return;
    }
    if (!user) {
      setAuthError("Something went wrong");
      return;
    }
    const searcUuser = await SupabaseService.findUserByEmail(user.email);
    if (searcUuser) {
      setAuthError("User already exists");
      return;
    }
    await SupabaseService.createUser(user);
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
            <InputPaper>
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
              <InputBase
                placeholder="First Name"
                type="text"
                {...register("firstName", { required: true })}
              />
            </InputPaper>
            {errors.firstName && <ErrorText>{errFirstName}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputPaper>
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
              <InputBase
                placeholder="Last Name"
                type="text"
                {...register("lastName", { required: true })}
              />
            </InputPaper>
            {errors.lastName && <ErrorText>{errLastName}</ErrorText>}
          </InputWrapper>
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
          <InputWrapper>
            <InputPaper>
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
              <InputBase
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: true,
                  pattern: passwordRegex,
                })}
              />
            </InputPaper>
            {errors.password && <ErrorText>{errPassword}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputPaper>
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
              <InputBase
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === getValues("password"),
                })}
              />
            </InputPaper>
            {errors.confirmPassword && <ErrorText>{errPasswordConf}</ErrorText>}
          </InputWrapper>

          <ButtonWrapper>
            <Button type="submit" variant="contained" disableRipple>
              submit
            </Button>
          </ButtonWrapper>
          {authError && <ErrorText>{authError}</ErrorText>}
        </FormWrapper>
      </SignUpWrapper>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  height: calc(100% - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const SignUpWrapper = styled.div`
  padding: 20px 0;
  width: 30%;
  background: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const Text = styled.p`
  margin: 0;
`;

const ErrorText = styled.span`
  font-size: 0.7rem;
  color: #ff908d;
`;

const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
