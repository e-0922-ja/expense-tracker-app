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
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../supabase/schema";
import { Category } from "../../types";
import { TransactionCard } from "../components/TransactionCard";
import { GobackButton } from "../components/GobackButton";
import { useNavigate } from "react-router-dom";
import { BorrowCalculateCard } from "../components/BorrowCalculateCard";
import { LendCalculateCard } from "../components/LendCalculateCard copy";

interface TransList {
  category: string;
  dispription: string;
  amount: number;
  date: string;
}

export const FriendsHistoryPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const supabase = createClient<Database>(
    process.env.REACT_APP_SUPABASE_URL as string,
    process.env.REACT_APP_SUPABASE_ANON_KEY as string
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

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

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleGoBack = () => {
    navigate("/history");
  };

  const handleGoToDetail = () => {
    navigate("/history/1");
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
          <GobackButton func={handleGoBack} />
          <DetailBox>
            <Section>
              <PageTitle>
                Expense with<Span>Kota</Span>
                <Span>Hana</Span>
              </PageTitle>
            </Section>
            <TransactionCardContainer>
              <Title>Summary for this group</Title>
              <CalculateCardContainer>
                <BorrowCalculateCard />
                <LendCalculateCard />
              </CalculateCardContainer>
              <Title>All Expenses</Title>
              {transactionHistory.map((item, index) => (
                <TransactionCard
                  key={index}
                  item={item}
                  func={handleGoToDetail}
                />
              ))}
            </TransactionCardContainer>
          </DetailBox>
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
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 50px 120px;
  width: 100%;
  overflow: auto;
  @media (min-width: 600px) {
    width: calc(100% - ${drawerWidth}px);
  }
`;

const PageTitle = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Title = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const TransactionCardContainer = styled.div`
  width: 100%;
`;

const DetailBox = styled.div`
  margin: 0 1rem;
`;

const CalculateCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.palette.secondary.light};
  margin-left: 0.5rem;
`;
