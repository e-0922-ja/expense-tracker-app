import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";
import { Button, InputAdornment, InputBase, Paper } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
            {errors.firstName && <ErrorText>First name is required</ErrorText>}
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
            {errors.lastName && <ErrorText>Last name is required</ErrorText>}
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
                  pattern: /^\S+@\S+\.\S+$/,
                })}
              />
            </InputPaper>
            {errors.email && (
              <ErrorText>Entered value does not match email format</ErrorText>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputPaper>
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
              <InputBase
                placeholder="Password"
                type="password"
                {...register("password", { required: true, pattern: /\w{6,}/ })}
              />
            </InputPaper>
            {errors.password && (
              <ErrorText>Password is more than 6 characteres</ErrorText>
            )}
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
            {errors.confirmPassword && (
              <ErrorText>Please confirm your password</ErrorText>
            )}
          </InputWrapper>

          <ButtonWrapper>
            <Button type="submit" variant="contained" disableRipple>
              submit
            </Button>
          </ButtonWrapper>
        </FormWrapper>
      </SignUpWrapper>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const SignUpWrapper = styled.div`
  padding: 20px 0;
  width: 45%;
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
  color: ${({ theme }) => theme.palette.secondary.light};
`;

const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
