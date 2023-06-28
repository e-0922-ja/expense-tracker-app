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
import { Database, Json } from "../../../../supabase/schema";
import { TransactionCard } from "../components/TransactionCard";
import { BorrowCalculateCard } from "../components/BorrowCalculateCard";
import { LendCalculateCard } from "../components/LendCalculateCard";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducer/userSlice";
import { FriendsCard } from "../components/FriendsCard";
import { Expense } from "../../types";

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export type BorrowedAmountReturns =
  Database["public"]["Functions"]["get_total_borrowed_amount"]["Returns"];
export type LentAmountReturns =
  Database["public"]["Functions"]["get_total_lent_amount"]["Returns"];
export type ExpensesReturns =
  Database["public"]["Functions"]["get_expenses"]["Returns"];

export const HistoryPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const account = useSelector(selectUser);
  const userId = account.user?.id!;
  const [borrowed, setBorrowed] = useState<BorrowedAmountReturns>([]);
  const [lent, setLent] = useState<LentAmountReturns>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getTotalLentAmount = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc("get_total_lent_amount", {
        user_id: userId,
      });
      if (error) {
        console.log(error);
      } else {
        console.log("lent", data);
        setLent(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const getTotalBorrowedAmount = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc("get_total_borrowed_amount", {
        user_id: userId,
      });
      if (error) {
        console.log(error);
      } else {
        console.log("borrowed", data);
        setBorrowed(data);
      }
    } catch (error: any) {
      console.log(error);
    }
  }, [userId]);

  const getExpenses = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc("get_expenses", {
        user_id: userId,
      });
      if (error) {
        console.log(error);
      } else {
        console.log("histories", data);
        const parsedExpenses: Expense[] = data.map((expense: Json) =>
          JSON.parse(JSON.stringify(expense))
        );
        setExpenses(parsedExpenses);
      }
    } catch (error: any) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    getTotalLentAmount();
    getTotalBorrowedAmount();
    getExpenses();
  }, [getTotalLentAmount, getTotalBorrowedAmount, getExpenses]);

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
                <BorrowCalculateCard borrowed={borrowed} />
                <LendCalculateCard lent={lent} />
              </CalculateCardContainer>
              <Title>All Expenses</Title>
              {expenses.map((expense) => (
                <TransactionCard key={expense?.id} expense={expense} />
              ))}
            </TabPanel>
            <TabPanel value="2">
              <Title>Previous groups</Title>
              {expenses.map((expense) => (
                <FriendsCard key={expense.id} expense={expense} />
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

const StyledIconButton = styled(IconButton)`
  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
  .MuiTouchRipple-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
`;

const MainBox = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 50px 120px;
  width: calc(100% - ${drawerWidth}px);
  height: 100vh;
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
  color: ${({ theme }) => theme.palette.info.light};
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
