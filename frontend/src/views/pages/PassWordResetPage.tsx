import styled from "styled-components";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  errPassword,
  errPasswordConf,
  passwordRegex,
} from "../../constants/regexPattern";
import { FormButton } from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { client } from "../../services/supabase";

interface PasswordData {
  password: string;
  confPassword: string;
}

export const PassWordResetPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordData>();

  const handleChangePassWord = async (data: PasswordData) => {
    const { password } = data;
    try {
      const { error: passwordResetError } = await client.auth.updateUser({
        password,
      });
      if (passwordResetError) {
        throw passwordResetError;
      }
      navigate("/account");
    } catch (error) {
      alert("The error has occured");
    }
  };

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

  return (
    <ComponentWrapper>
      <PassResetWrapper>
        <TitleWrapper>
          <Title>Reset Password</Title>
          <Text>Please register your new password </Text>
        </TitleWrapper>
        <FormWrapper onSubmit={handleSubmit(handleChangePassWord)}>
          <InputTitle>Password</InputTitle>
          <StyledBox>
            <StyledOutlinedInput
              {...register("password", {
                required: true,
                pattern: passwordRegex,
              })}
              type={showPassword ? "text" : "password"}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <StyledVisibilityOff />
                    ) : (
                      <StyledVisibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </StyledBox>
          {errors.password && <ErrorText>{errPassword}</ErrorText>}
          <InputTitle>Confirm Password</InputTitle>
          <StyledBox>
            <StyledOutlinedInput
              {...register("confPassword", {
                required: true,
                validate: (value) => value === getValues("password"),
              })}
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <StyledVisibilityOff />
                    ) : (
                      <StyledVisibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </StyledBox>
          {errors.confPassword && <ErrorText>{errPasswordConf}</ErrorText>}
          <ButtonWrapper>
            <FormButton title="Register" />
          </ButtonWrapper>
        </FormWrapper>
      </PassResetWrapper>
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

const PassResetWrapper = styled.div`
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
  width: 70%;
  display: flex;
  flex-direction: column;
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
  padding-top: 7px;
  font-size: 0.7rem;
  color: #ff908d;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  margin-top: 8px;
  color: ${({ theme }) => theme.palette.info.light};
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

const InputTitle = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledVisibilityOff = styled(VisibilityOff)`
  color: ${({ theme }) => theme.palette.info.light};
`;

const StyledVisibility = styled(Visibility)`
  color: ${({ theme }) => theme.palette.info.light};
`;
