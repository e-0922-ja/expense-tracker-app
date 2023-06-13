import styled from "styled-components";

export const Footer = () => {
  return (
    <Wrapper>
      <Text>Footer</Text>;
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #263335;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #fff;
  padding: 0 20px;
`;
