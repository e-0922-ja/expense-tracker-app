import { useState } from "react";
import styled from "styled-components";
import { IconButton, InputBase, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../utils/regexPatternUtils";
import { FormButton } from "../components/FormButton";
import {
  ERROR_BLANK_FIRSTNAME,
  ERROR_BLANK_LASTNAME,
  ERROR_EMAIL,
  ERROR_EMPTY_FIRSTNAME,
  ERROR_EMPTY_LASTNAME,
  ERROR_PASSWORD,
  ERROR_PASSWORDCONF,
} from "../../constants/message";
import { useSignup } from "../../hooks/useSignup";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpPage = () => {
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

  const { signupMessage, signup } = useSignup();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<NewUser>();

  const onSubmit = async (data: NewUser) => {
    const { firstName, lastName, email, password } = data;
    signup({ firstName, lastName, email, password });
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
                {...register("firstName", {
                  required: {
                    value: true,
                    message: ERROR_EMPTY_FIRSTNAME,
                  },
                  validate: {
                    noWhitespaceOnly: (value) =>
                      value.trim() !== "" || ERROR_BLANK_FIRSTNAME,
                  },
                })}
              />
            </InputPaper>
            {errors.firstName && (
              <ErrorText>{errors.firstName.message}</ErrorText>
            )}
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
                {...register("lastName", {
                  required: {
                    value: true,
                    message: ERROR_EMPTY_LASTNAME,
                  },
                  validate: {
                    noWhitespaceOnly: (value) =>
                      value.trim() !== "" || ERROR_BLANK_LASTNAME,
                  },
                })}
              />
            </InputPaper>
            {errors.lastName && (
              <ErrorText>{errors.lastName.message}</ErrorText>
            )}
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
          <InputWrapper>
            <InputPaper elevation={0}>
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
            </InputPaper>
            {errors.confirmPassword && (
              <ErrorText>{ERROR_PASSWORDCONF}</ErrorText>
            )}
          </InputWrapper>
          <ButtonWrapper>
            <FormButton title="submit" />
          </ButtonWrapper>
          {signupMessage.message && (
            <SignupMessage isError={signupMessage.isError}>
              {signupMessage.message}
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
  display: flex;
  justify-content: center;
`;

const IconContainer = styled.div`
  padding: 8px;
  color: rgba(0, 0, 0, 0.54);
`;

// import { UseFormRegister, ValidationRule} from "react-hook-form";

// interface FormInputItemProps {
//   placeholder:
//     | "First Name"
//     | "Last Name"
//     | "Email"
//     | "Password"
//     | "Confirm Password";
//   inputType: "text" | "email" | "password";
//   register: UseFormRegister<NewUser>;
//   valueName:
//     | "firstName"
//     | "lastName"
//     | "email"
//     | "password"
//     | "confirmPassword";
//   required: boolean;
//   pattern?: ValidationRule<RegExp>;
//   validate?: (value: string) => boolean;
//   // errors?: FieldErrors<NewUser>;
// }

// const FormInputItem = ({
//   placeholder,
//   inputType,
//   register,
//   valueName,
//   required,
//   pattern,
//   validate,
// }: // errors,

// FormInputItemProps) => {
//   const Icon = () => (
//     <>
//       {(valueName === "firstName" || valueName === "lastName") && (
//         <AccountCircle />
//       )}
//       {valueName === "email" && <MailOutlineIcon />}
//       {valueName === "password" && <LockOutlinedIcon />}
//       {valueName === "confirmPassword" && <LockIcon />}
//     </>
//   );
//   return (
//     <InputWrapper>
//       <InputPaper>
//         <InputAdornment position="start">
//           <Icon />
//         </InputAdornment>
//         <InputBase
//           placeholder={placeholder}
//           type={inputType}
//           {...register(valueName, {
//             required,
//             pattern,
//             validate,
//           })}
//         />
//       </InputPaper>
//       {/* TODO: Consider how to show error statements */}
//       {/* {errors?.[valueName] && <ErrorText>{errPasswordConf}</ErrorText>} */}
//     </InputWrapper>
//   );
// };
