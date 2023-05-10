import styled from "styled-components";
import { Button } from "@mui/material";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
`;

const TitleWrapper = styled.section`
  height: 200px;
  background: ${({ theme }) => theme.palette.primary.light};
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const HomePage = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>HomePage</Title>
      </TitleWrapper>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
        commodi reiciendis fuga! Odio quasi nemo nam sapiente laborum possimus
        labore iste eaque id, eligendi, doloribus consequatur! Eaque impedit sit
        velit?
      </Text>
      <Button variant="contained" disableRipple>
        LogIn
      </Button>
      <Button variant="contained" disableRipple>
        SignUp
      </Button>
    </Wrapper>
  );
};
