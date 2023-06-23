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
import { useSelector } from "react-redux";
import { selectUser } from "../../reducer/userSlice";
import { createClient } from "@supabase/supabase-js";
import { FriendCard } from "../components/FriendCard";
import { FriendApproveCard } from "../components/FriendApproveCard";
import { FriendShipsReturns } from "./FriendsListPage";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const FriendsApprovePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  const [friends, setFriends] = useState<FriendShipsReturns>([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user } = useSelector(selectUser);
  const userId = user?.id;

  useEffect(() => {
    getUserFriendsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserFriendsById = async () => {
    try {
      const { data, error } = await supabase.rpc("get_user_friends", {
        user_id: userId,
      });
      if (error) {
        setError(error.message);
        return false;
      } else {
        setFriends(data);
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  console.log(error);

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
              <Title>Your Friends List</Title>
              <SubTitle>Friend Request</SubTitle>
              <hr />
              <UnorderedList>
                {friends!.map((friend, index) =>
                  !friend.sender && friend.statusId === 1 && friend.id ? (
                    <FriendApproveCard
                      id={friend.id}
                      firstName={friend.firstName}
                      lastName={friend.lastName}
                      email={friend.email}
                      key={index}
                      getUserFriendsById={getUserFriendsById}
                    />
                  ) : null
                )}
              </UnorderedList>
              <SubTitle>All friends</SubTitle>
              <hr />
              <UnorderedList>
                {friends!.map((friend, index) =>
                  friend.statusId === 2 ? (
                    <FriendCard
                      id={friend.id}
                      firstName={friend.firstName}
                      lastName={friend.lastName}
                      email={friend.email}
                      key={index}
                    />
                  ) : null
                )}
              </UnorderedList>
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
  height: 100vh;
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

const UnorderedList = styled.ul`
  padding: 0px;
  height: 100%;
  width: 100%;
`;

const Title = styled.h2`
  margin-top: 1rem;
  padding-bottom: 2rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const SubTitle = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;
