import React from "react";
import styled from "styled-components";
import { ColorTheme } from "../../types/colorType";

interface StyledProps {
  theme: ColorTheme;
}

const Wrapper = styled.div<StyledProps>`
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const TitleWrapper = styled.section<StyledProps>`
  height: 200px;
  background: ${({ theme }) => theme.palette.primary.light};
`;

const TitleH1 = styled.h1<StyledProps>`
  padding: 5px;
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
    </Wrapper>
  );
};
