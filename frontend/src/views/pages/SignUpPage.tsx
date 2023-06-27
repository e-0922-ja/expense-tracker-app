import { useEffect } from "react";
import styled from "styled-components";
import { Button, InputAdornment, InputBase, Paper } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { UseFormRegister, ValidationRule, useForm } from "react-hook-form";
import {
  errEmail,
  errFirstName,
  errLastName,
  errPassword,
  errPasswordConf,
  passwordRegex,
} from "../../constants/regexPattern";
import { useSignup } from "../../hooks/useSignup";
import { paths } from "../../constants/routePaths";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpPage = () => {
  const { signupError, signup } = useSignup();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<NewUser>();

  const navigate = useNavigate();

  useEffect(() => {
    if (signupError.message === "Success!") {
      navigate(paths.login);
    }
  }, [navigate, signupError]);

  const onSubmit = async (data: NewUser) => {
    const { firstName, lastName, email, password } = data;
    signup({ firstName, lastName, email, password });
  };

  const isConfirmPasswordSame = (value: string) =>
    value === getValues("password");

  return (
    <ComponentWrapper>
      <SignUpWrapper>
        <TitleWrapper>
          <Title>SignUp</Title>
          <Text>Already have an account? </Text>
          <Link to="/login">Login</Link>
        </TitleWrapper>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormInputItem
            placeholder={"First Name"}
            inputType={"text"}
            register={register}
            valueName={"firstName"}
            required={true}
          />
          {errors.firstName && <ErrorText>{errFirstName}</ErrorText>}
          <FormInputItem
            placeholder={"Last Name"}
            inputType={"text"}
            register={register}
            valueName={"lastName"}
            required={true}
          />
          {errors.lastName && <ErrorText>{errLastName}</ErrorText>}
          <FormInputItem
            placeholder={"Email"}
            inputType={"email"}
            register={register}
            valueName={"email"}
            required={true}
          />
          {errors.email && <ErrorText>{errEmail}</ErrorText>}
          <FormInputItem
            placeholder={"Password"}
            inputType={"password"}
            register={register}
            valueName={"password"}
            required={true}
            pattern={passwordRegex}
          />
          {errors.password && <ErrorText>{errPassword}</ErrorText>}
          <FormInputItem
            placeholder={"Confirm Password"}
            inputType={"password"}
            register={register}
            valueName={"confirmPassword"}
            required={true}
            validate={isConfirmPasswordSame}
          />
          {errors.confirmPassword && <ErrorText>{errPasswordConf}</ErrorText>}
          <ButtonWrapper>
            <Button type="submit" variant="contained" disableRipple>
              submit
            </Button>
          </ButtonWrapper>
          {signupError.message && <ErrorText>{signupError.message}</ErrorText>}
        </FormWrapper>
      </SignUpWrapper>
    </ComponentWrapper>
  );
};

interface FormInputItemProps {
  placeholder:
    | "First Name"
    | "Last Name"
    | "Email"
    | "Password"
    | "Confirm Password";
  inputType: "text" | "email" | "password";
  register: UseFormRegister<NewUser>;
  valueName:
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "confirmPassword";
  required: boolean;
  pattern?: ValidationRule<RegExp>;
  validate?: (value: string) => boolean;
  // errors?: FieldErrors<NewUser>;
}

const FormInputItem = ({
  placeholder,
  inputType,
  register,
  valueName,
  required,
  pattern,
  validate,
}: // errors,
FormInputItemProps) => {
  const Icon = () => (
    <>
      {(valueName === "firstName" || valueName === "lastName") && (
        <AccountCircle />
      )}
      {valueName === "email" && <MailOutlineIcon />}
      {valueName === "password" && <LockOutlinedIcon />}
      {valueName === "confirmPassword" && <LockIcon />}
    </>
  );
  return (
    <InputWrapper>
      <InputPaper>
        <InputAdornment position="start">
          <Icon />
        </InputAdornment>
        <InputBase
          placeholder={placeholder}
          type={inputType}
          {...register(valueName, {
            required,
            pattern,
            validate,
          })}
        />
      </InputPaper>
      {/* TODO: Consider how to show error statements */}
      {/* {errors?.[valueName] && <ErrorText>{errPasswordConf}</ErrorText>} */}
    </InputWrapper>
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
