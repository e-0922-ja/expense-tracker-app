import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";
import { Box, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  errPassword,
  errPasswordConf,
  passwordRegex,
} from "../../constants/regexPattern";
import { FormButton } from "../components/FormButton";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

interface PasswordData {
  password: string;
  confPassword: string;
}

export const PassWordResetPage = () => {
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
      const { error: passwordResetError } = await supabase.auth.updateUser({
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

  return (
    <ComponentWrapper>
      <LoginWrapper>
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
              fullWidth
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
              fullWidth
            />
          </StyledBox>
          {errors.confPassword && <ErrorText>{errPasswordConf}</ErrorText>}
          <ButtonWrapper>
            <FormButton title="Register" />
          </ButtonWrapper>
        </FormWrapper>
      </LoginWrapper>
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

const LoginWrapper = styled.div`
  padding: 20px 0;
  width: 40%;
  background: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      padding: 7px;
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
