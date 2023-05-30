import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Modal,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContents } from "../components/DrawerContents";
import { MainButton } from "../components/MainButton";
import FriendIcon from "../components/FriendIcon";
import { TransactionCard } from "../components/TransactionCard";
import { SecondaryButton } from "../components/SecondaryButton";
import { FormNewExpense } from "../components/FormNewExpense";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../supabase/schema";
import { Category } from "../../types";

interface TransList {
  category: string;
  dispription: string;
  amount: number;
  date: string;
}

export const TransactionPage = () => {
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
        <Section>
          <CategoryTitle>People</CategoryTitle>
          <PeopleSectionContainer>
            <FriendIcon />
          </PeopleSectionContainer>
        </Section>
        <Section>
          <CategoryTitle>Add Transaction</CategoryTitle>
          <MainButton title={"create"} func={handleOpen} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalContainer>
              <FormNewExpense categories={categories} />
            </ModalContainer>
          </Modal>
        </Section>
        <Section>
          <CategoryTitle>Previous History</CategoryTitle>
          {transactionHistory.map((item, index) => {
            return <TransactionCard item={item} key={index} />;
          })}
        </Section>
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
  padding: 50px 200px 50px 120px;
  width: 100%;
  overflow: auto;
  @media (min-width: 600px) {
    width: calc(100% - ${drawerWidth}px);
  }
`;

const Section = styled.div`
  margin-bottom: 80px;
`;

const CategoryTitle = styled.h2`
  margin-top: 0;
`;

const PeopleSectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-beteen;
`;

const ButtonContainer = styled.div`
  width: 15%;
  display: flex;
  justify-content: flex-end;
`;

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: #fff;
  padding: 30px;
  outline: none;
`;
