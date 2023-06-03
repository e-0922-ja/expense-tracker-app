import { useState } from "react";
import styled from "styled-components";
import {
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
  OutlinedInput,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContents } from "../components/DrawerContents";

import { useNavigate } from "react-router-dom";
import { SubButton } from "../components/SubButton";

export const AccountPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "Yuki",
    lastName: "Kasugai",
    email: "yuki@gmail.com",
    password: "*******",
  });
  const [editStatus, setEditStatus] = useState(false);

  const handleEdit = () => {
    setEditStatus(true);
  };

  const handleSave = () => {
    setEditStatus(false);
    // Here, you might want to have some logic to save the updated user data.
    // saveData(userData);
  };

  return (
    <Wrapper>
      <NavBox>
        <DeskTopDrawer variant="permanent" open>
          <Toolbar />
          <DrawerContents />
        </DeskTopDrawer>
        <MobileDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Toolbar />
          <DrawerContents />
        </MobileDrawer>
      </NavBox>
      <MainBox>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ width: "100%", typography: "body1" }}></Box>
        <DetailBox>
          <Section>
            <Title>Account</Title>
            <InfoContainer>
              <InputTitle>First Name</InputTitle>
              <StyledBox>
                <Data>{userData.firstName}</Data>
              </StyledBox>
              <InputTitle>last Name</InputTitle>
              <StyledBox>
                {editStatus ? (
                  <OutlinedInput
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                    fullWidth
                    sx={{
                      "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        padding: "14px",
                      },
                    }}
                  />
                ) : (
                  <Data>{userData.lastName}</Data>
                )}
              </StyledBox>
              <InputTitle>email</InputTitle>
              <StyledBox>
                {editStatus ? (
                  <OutlinedInput
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    fullWidth
                    sx={{
                      "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        padding: "14px",
                      },
                    }}
                  />
                ) : (
                  <Data>{userData.email}</Data>
                )}
              </StyledBox>
              <InputTitle>password</InputTitle>
              <StyledBox>
                {editStatus ? (
                  <OutlinedInput
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    fullWidth
                    sx={{
                      "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        padding: "14px",
                      },
                    }}
                  />
                ) : (
                  <Data>{userData.password}</Data>
                )}
              </StyledBox>

              <ButtonContainer>
                {editStatus ? (
                  <SubButton title={"save"} func={handleSave} />
                ) : (
                  <SubButton title={"edit"} func={handleEdit} />
                )}
              </ButtonContainer>
            </InfoContainer>
          </Section>
        </DetailBox>
      </MainBox>
    </Wrapper>
  );
};

const drawerWidth = 290;

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 64px);
`;

const NavBox = styled.div`
  flex-shrink: 0;

  @media (min-width: 600px) {
    width: ${drawerWidth}px;
  }
`;

const DeskTopDrawer = styled(Drawer)`
  display: none;
  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${drawerWidth}px;
  }

  @media (min-width: 600px) {
    display: block;
  }
`;

const MobileDrawer = styled(Drawer)`
  display: block;
  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${drawerWidth}px;
  }

  @media (min-width: 600px) {
    display: none;
  }
`;

const MainBox = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 50px 120px;
  width: 100%;
  overflow: auto;
  @media (min-width: 600px) {
    width: calc(100% - ${drawerWidth}px);
  }
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const DetailBox = styled.div`
  margin: 0 1rem;
`;

const InfoContainer = styled.div`
  width: 70%;
  margin: 3rem 0;
`;

const InputTitle = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledBox = styled(Box)`
  margin-top: 8px;
`;

const Data = styled.div`
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
`;
