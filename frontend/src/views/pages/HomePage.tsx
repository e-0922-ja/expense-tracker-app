import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { paths } from "../../constants/routePaths";
import TopImage from "../../images/topimage.png";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateLogin = () => navigate(paths.login);

  return (
    <Wrapper>
      <HeroSection>
        <HeroContainer>
          <Title>SpendShare</Title>
          <Text>
            Welcome to SpendShare, the ultimate tool for managing your group
            expenses with ease! Are you frequently dining out, traveling, or
            sharing costs with roommates, friends, or colleagues? SpendShare is
            designed to simplify your financial life. Our app allows you to
            split bills and track expenses effortlessly, bringing transparency,
            fairness, and convenience to shared expenditures.
          </Text>
          <ButtonWrapper>
            <StyledButton
              variant="contained"
              disableRipple
              onClick={handleNavigateLogin}
            >
              Get Started
            </StyledButton>
          </ButtonWrapper>
        </HeroContainer>
        <ImageContainer>
          <ImageTag src={TopImage} alt="topimage" />
        </ImageContainer>
      </HeroSection>
      <SubSection>
        <FeatContainer>
          <h3>Split Bills Instantly</h3>
          <div>
            Whether it's a restaurant bill, a utility payment, or a group gift,
            divide the costs equally or specify individual amounts in just a few
            taps.
          </div>
        </FeatContainer>
        <FeatContainer>
          <h3>Track Expenses</h3>
          <div>
            Keep a clear record of who paid what, when, and why. SpendShare
            helps you stay on top of your finances without the need for
            complicated spreadsheets.
          </div>
        </FeatContainer>
        <FeatContainer>
          <h3>Settle Debts Easily</h3>
          <div>
            No more awkward conversations about money. SpendShare calculates who
            owes what and facilitates seamless payments.
          </div>
        </FeatContainer>
      </SubSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100% - 64px);
  width: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const Title = styled.h1`
  font-size: 4rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.palette.secondary.light};
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60%;
  padding: 0 70px;
  gap: 30px;
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    padding: 0 20px;
    gap: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  width: 50%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  width: 50%;
  height: 100%;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const ImageTag = styled.img`
  @media (max-width: 600px) {
    height: 30%;
  }
`;

const SubSection = styled.div`
  gap: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40%;
  padding: 0 70px;
  background: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: 600px) {
    gap: 0;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const FeatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.info.light};
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.palette.secondary.main} !important;
`;
