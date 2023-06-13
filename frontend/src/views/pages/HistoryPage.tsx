import { useCallback, useEffect, useState } from "react";
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
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../supabase/schema";
import { Category } from "../../types";
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

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const HistoryPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  // const [date, setDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
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

  // get categories from a table
  const getCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("Categories")
        .select("*")
        .order("sequence", { ascending: true });
      if (error) {
        setError(error.message);
        return false;
      } else {
        setCategories(data);
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="ALL" value="1" />
                <Tab label="Friends" value="2" />
              </TabList>
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
  width: 100%;
  overflow: auto;
  @media (min-width: 600px) {
    width: calc(100% - ${drawerWidth}px);
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
  border-bottom: 1px solid #000;
`;
