import { useState } from "react";
import styled from "styled-components";
import {
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
  Tab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContents } from "../components/DrawerContents";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TransactionCard } from "../components/TransactionCard";
import { FriendsCard } from "../components/FriendsCard";
import { BorrowCalculateCard } from "../components/BorrowCalculateCard";
import { LendCalculateCard } from "../components/LendCalculateCard";

interface TransactionHistory {
  id: number;
  paidPerson: string;
  category: string;
  dispription: string;
  amount: number;
  date: string;
}

interface Name {
  id: number;
  firstName: string;
}

export const HistoryPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const transactionHistory: TransactionHistory[] = [
    {
      id: 1,
      paidPerson: "Yuki",
      category: "Food",
      dispription: "starbucks",
      amount: 123,
      date: "5/23",
    },
    {
      id: 2,
      paidPerson: "Hana",
      category: "Food",
      dispription: "Korean",
      amount: 123,
      date: "5/23",
    },
    {
      id: 3,
      paidPerson: "Kota",
      category: "Food",
      dispription: "Chinese",
      amount: 123,
      date: "5/23",
    },
    {
      id: 4,
      paidPerson: "Haruka",
      category: "Food",
      dispription: "Itarian",
      amount: 123,
      date: "5/23",
    },
    {
      id: 5,
      paidPerson: "Akito",
      category: "Food",
      dispription: "French",
      amount: 123,
      date: "5/23",
    },
  ];

  const friendList: Name[] = [
    { id: 1, firstName: "yuki" },
    { id: 2, firstName: "anna" },
    { id: 3, firstName: "max" },
    { id: 4, firstName: "tom" },
    { id: 5, firstName: "Bob" },
  ];

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
          <TabContext value={value}>
            <StyledBox>
              <StyledTabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <StyledTab label="ALL" value="1" />
                <StyledTab label="Friends" value="2" />
              </StyledTabList>
            </StyledBox>
            <TabPanel value="1">
              <Title>Summary for you</Title>
              <CalculateCardContainer>
                <BorrowCalculateCard
                  name={"Megan"}
                  amount={200}
                  totalAmount={300}
                />
                <LendCalculateCard
                  name={"Megan"}
                  amount={200}
                  totalAmount={300}
                />
              </CalculateCardContainer>
              <Title>All Expenses</Title>
              {transactionHistory.map((item) => (
                <TransactionCard key={item.id} item={item} />
              ))}
            </TabPanel>
            <TabPanel value="2">
              <Title>Previous groups</Title>
              {friendList.map((item) => (
                <FriendsCard key={item.id} friendName={item.firstName} />
              ))}
            </TabPanel>
          </TabContext>
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
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 50px 120px;
  width: calc(100% - ${drawerWidth}px);
  overflow: auto;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const CalculateCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Title = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const SubBox = styled(Box)`
  width: 100%;
`;

const StyledBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.info.light};
`;

const StyledTab = styled(Tab)`
  &&.MuiButtonBase-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
  &&.MuiTab-textColorPrimary.Mui-selected {
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

const StyledTabList = styled(TabList)`
  .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.palette.secondary.main} !important;
  }
`;
