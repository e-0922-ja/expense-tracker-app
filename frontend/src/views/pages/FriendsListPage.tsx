import { useCallback, useEffect, useState } from "react";
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
import { FriendCard } from "../components/FriendCard";
import { FriendApproveCard } from "../components/FriendApproveCard";
import { client } from "../../services/supabase";
import { useSupabaseSession } from "../../hooks/useSupabaseSession";
import { FriendShipsReturns } from "../../types";

export const FriendsListPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  const [friends, setFriends] = useState<FriendShipsReturns>([]);
  const [userId, setUserId] = useState("");

  const { session } = useSupabaseSession();

  useEffect(() => {
    if (session && session.user) {
      setUserId(session.user.id);
    }
  }, [session]);

  const getUserFriendsById = useCallback(async () => {
    try {
      if (!userId) {
        throw new Error();
      }
      const { data, error } = await client.rpc("get_user_friends", {
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
  }, [userId]);

  useEffect(() => {
    getUserFriendsById();
  }, [getUserFriendsById]);

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
          <StyledIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </StyledIconButton>
        )}
        <SubBox>
          <DetailBox>
            <Section>
              <Title>Your Friends List</Title>
              {friends!.some(
                (friend) => !friend.sender && friend.statusId === 1 && friend.id
              ) ? (
                <>
                  <SubTitle>Friend Request</SubTitle>
                  <hr />
                  <UnorderedList>
                    {friends!.map((friend, index) =>
                      !friend.sender && friend.statusId === 1 && friend.id ? (
                        <FriendApproveCard
                          userId={userId}
                          friend={friend}
                          key={index}
                          getUserFriendsById={getUserFriendsById}
                        />
                      ) : null
                    )}
                  </UnorderedList>
                </>
              ) : null}
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
              {error && <ErrorText>{error}</ErrorText>}
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

const StyledIconButton = styled(IconButton)`
  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
  .MuiTouchRipple-root {
    color: ${({ theme }) => theme.palette.info.light};
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

const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 7px;
  font-size: 1rem;
  color: #ff908d;
`;
