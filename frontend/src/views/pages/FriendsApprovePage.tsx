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
import { Friend, Friendship, Users } from "../../types";
import { createClient } from "@supabase/supabase-js";
import { FriendCard } from "../components/FriendCard";
import { FriendApproveCard } from "../components/FriendApproveCard";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const FriendsApprovePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requestFriendsFromFriendship, setRequestFriendsFromFriendship] =
    useState<Friendship[]>([]);
  const [requestFriendsFromUsers, setRequestFriendsFromUsers] = useState<
    Users[]
  >([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user } = useSelector(selectUser);
  const userId = user?.id;

  useEffect(() => {
    getUserFriendsById();
    getRequestFriendsFromFriendShip();
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
        // console.log(data, "data");
        setFriends(data);
        // console.log(friends, "friends");
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const getRequestFriendsFromFriendShip = async () => {
    try {
      const { data, error }: { data: any; error: any } = await supabase
        .from("Friendships")
        .select("*")
        .eq("friendId", userId)
        .neq("userId", userId)
        .eq("statusId", 1);

      if (error) {
        console.log("Error: ", error);
      } else {
        setRequestFriendsFromFriendship(data);
        getRequestFriendsFromUsers(data); // Call here after setting the state
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getRequestFriendsFromUsers = async (
    friendsFromFriendship: Friendship[]
  ) => {
    try {
      const ids = friendsFromFriendship.map((user) => user.userId);
      console.log(ids, "ids");
      const { data, error }: { data: any; error: any } = await supabase
        .from("Users")
        .select("*")
        .in("id", ids);
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log(data, "hello");
        setRequestFriendsFromUsers(data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const requestFriendsIdsFromFriendship = requestFriendsFromFriendship.map(
    (item) => {
      return { userId: item.userId };
    }
  );

  console.log(requestFriendsIdsFromFriendship, "a");
  console.log(requestFriendsFromUsers, "b");

  const requestedPeople = requestFriendsIdsFromFriendship.flatMap(
    (item: { userId: string }) => {
      const matchedUsers = requestFriendsFromUsers.filter(
        (user) => user.id === item.userId
      );
      if (matchedUsers.length > 0) {
        return matchedUsers;
      }
      return [];
    }
  );

  console.log(requestedPeople, "Who");

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
                {requestedPeople.map((person) => (
                  <FriendApproveCard
                    id={person.id}
                    firstName={person.firstName}
                    lastName={person.lastName}
                    email={person.email}
                    key={person.id}
                    getRequestFriendsFromFriendShip={
                      getRequestFriendsFromFriendShip
                    }
                  />
                ))}
              </UnorderedList>
              <ThirdTitle>All friends</ThirdTitle>
              <hr />
              <UnorderedList>
                {friends!.map((friend, index) => {
                  return (
                    <FriendCard
                      id={friend.id}
                      firstName={friend.firstName}
                      lastName={friend.lastName}
                      email={friend.email}
                      key={index}
                    />
                  );
                })}
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

const ThirdTitle = styled.h3`
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;
