import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";
import { Button, InputAdornment, InputBase, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useForm } from "react-hook-form";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const LoginPage = () => {
  interface CurrentUser {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    // formState: { errors, isValid, isSubmitting },
    formState: { errors },
  } = useForm<CurrentUser>();
  //   formState: { errors, isValid, isSubmitting },
  // } = useForm<CurrentUser>({ mode: "onChange" });

  // Post

  // Data in database === data in loginform
  // Get user and boolean login

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let metadata = user?.user_metadata;
    console.log(user, "currentLoginUser");
    console.log(metadata, "meta");
  };

  return (
    <ComponentWrapper>
      <LoginWrapper>
        <TitleWrapper>
          <Title>Login</Title>
          <Text>New to Expense tracker? </Text>
          <Link to="/signup">Signup</Link>
        </TitleWrapper>
        <FormWrapper onSubmit={handleSubmit(getUser)}>
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
          <ButtonWrapper>
            <Button
              type="submit"
              variant="contained"
              disableRipple
              // disabled={!isValid || isSubmitting}
            >
              submit
            </Button>
          </ButtonWrapper>
        </FormWrapper>
      </LoginWrapper>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const LoginWrapper = styled.div`
  padding: 30px 0;
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
