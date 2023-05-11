import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";
import { Button, InputAdornment, InputBase, Paper } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordConf = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConf(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          firstName: firstName,
          lastName: lastName,
        },
      },
    });
    console.log(data, "data");
    console.log(error, "err");
  };

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
      <SignUpWrapper>
        <TitleWrapper>
          <Title>SignUp</Title>
          <Text>Already have an account? </Text>
          <Link to="/">Login</Link>
        </TitleWrapper>
        <FormWrapper onSubmit={onSubmit}>
          <StyledPaper>
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
            <InputBase
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={handleChangeFirstName}
            />
          </StyledPaper>

          <StyledPaper>
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
            <InputBase
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={handleChangeLastName}
            />
          </StyledPaper>

          <StyledPaper>
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
            <InputBase
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </StyledPaper>

          <StyledPaper>
            <InputAdornment position="start">
              <LockOutlinedIcon />
            </InputAdornment>
            <InputBase
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
          </StyledPaper>

          <StyledPaper>
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
            <InputBase
              placeholder="Password Confirmation"
              type="password"
              value={passwordConf}
              onChange={handleChangePasswordConf}
            />
          </StyledPaper>
          {/* Later, I will remove this div because I do not need to get user button*/}
          <div style={{ display: "flex" }}>
            <Button type="submit" variant="contained" disableRipple>
              submit
            </Button>
            <Button onClick={getUser} variant="contained" disableRipple>
              Get User
            </Button>
          </div>
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
  height: 70%;
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

const StyledPaper = styled(Paper)`
  width: 70%;
  margin-bottom: 15px;
  padding: 7px;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  color: ${({ theme }) => theme.palette.secondary.light};
  display: flex;
  margin-bottom: 15px;
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
