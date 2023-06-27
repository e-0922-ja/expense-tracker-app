import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContents } from "../components/DrawerContents";
import { AccountInput } from "../components/AccountInput";
import { useSupabaseSession } from "../../hooks/useSupabaseSession";
import { Friend } from "../../types";
import { UserService } from "../../services/supabase/users/service";
import { update } from "../../reducer/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

export const AccountPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [user, setUser] = useState<Friend>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const { session } = useSupabaseSession();

  useEffect(() => {
    if (session && session.user) {
      setUser({
        id: session.user.id,
        email: session.user.email!,
        firstName: session.user.user_metadata.firstName,
        lastName: session.user.user_metadata.lastName,
      });
    }
  }, [session]);

  const handleGetSession = async () => {
    const userInfo = await UserService.getUserInfoFromSession();
    if (userInfo) {
      setUser({
        id: userInfo.id,
        email: userInfo.email!,
        firstName: userInfo.user_metadata.firstName,
        lastName: userInfo.user_metadata.lastName,
      });
      dispatch(update(userInfo.user_metadata.firstName));
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
            keepMounted: true,
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
        <SubBox>
          <DetailBox>
            <Section>
              <AccountInput user={user} onGetSession={handleGetSession} />
              {/* <AccountInput user={user} /> */}
            </Section>
          </DetailBox>
        </SubBox>
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
  width: calc(100% - ${drawerWidth}px);
  overflow: auto;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const DetailBox = styled.div`
  margin: 0 1rem;
`;

const SubBox = styled(Box)`
  width: 100%;
`;
