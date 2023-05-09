import styled from "styled-components";
import { ColorTheme } from "../../types/colorType";
import { Button } from "@mui/material";

interface StyledProps {
  theme: ColorTheme;
}

const Wrapper = styled.div<StyledProps>`
  background: ${({ theme }) => theme.palette.primary.main};
`;

const TitleWrapper = styled.section<StyledProps>`
  height: 200px;
  background: ${({ theme }) => theme.palette.primary.light};
`;

const TitleH1 = styled.h1<StyledProps>`
  margin: 0;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Text = styled.p<StyledProps>`
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const HomePage = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <TitleH1>HomePage</TitleH1>
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
