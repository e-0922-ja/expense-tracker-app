import { useEffect, useState } from "react";
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

interface TransList {
  category: string;
  dispription: string;
  amount: number;
  date: string;
}

interface Name {
  firstName: string;
}

export const HistoryPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  // const [date, setDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const supabase = createClient<Database>(
    process.env.REACT_APP_SUPABASE_URL as string,
    process.env.REACT_APP_SUPABASE_ANON_KEY as string
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const transactionHistory: TransList[] = [
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
  ];

  const friendList: Name[] = [
    { firstName: "yuki" },
    { firstName: "anna" },
    { firstName: "max" },
    { firstName: "tom" },
    { firstName: "Bob" },
  ];

  useEffect(() => {
    getCategories();
  }, []);

  // get categories from a table
  const getCategories = async () => {
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
  };

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
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="ALL" value="1" />
                <Tab label="Friends" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {transactionHistory.map((item, index) => (
                <TransactionCard key={index} item={item} />
              ))}
            </TabPanel>
            <TabPanel value="2">
              {friendList.map((item, index) => (
                <FriendsCard key={index} friendName={item} />
              ))}
            </TabPanel>
          </TabContext>
        </Box>
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
  background: ${({ theme }) => theme.palette.primary.light};
  padding: 50px 120px;
  width: 100%;
  overflow: auto;
  @media (min-width: 600px) {
    width: calc(100% - ${drawerWidth}px);
  }
`;
