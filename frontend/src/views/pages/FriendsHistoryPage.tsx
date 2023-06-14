import { useState } from "react";
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
// import { TransactionCard } from "../components/TransactionCard";
import { GobackButton } from "../components/GobackButton";
import { useNavigate } from "react-router-dom";
// import { BorrowCalculateCard } from "../components/BorrowCalculateCard";
// import { LendCalculateCard } from "../components/LendCalculateCard";

// interface TransactionHistory {
//   id: number;
//   paidPerson: string;
//   category: string;
//   dispription: string;
//   amount: number;
//   date: string;
// }

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const FriendsHistoryPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<Category[]>([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  // const transactionHistory: TransactionHistory[] = [
  //   {
  //     id: 1,
  //     paidPerson: "Yuki",
  //     category: "Food",
  //     dispription: "starbucks",
  //     amount: 123,
  //     date: "5/23",
  //   },
  //   {
  //     id: 2,
  //     paidPerson: "Hana",
  //     category: "Food",
  //     dispription: "Korean",
  //     amount: 123,
  //     date: "5/23",
  //   },
  //   {
  //     id: 3,
  //     paidPerson: "Kota",
  //     category: "Food",
  //     dispription: "Chinese",
  //     amount: 123,
  //     date: "5/23",
  //   },
  //   {
  //     id: 4,
  //     paidPerson: "Haruka",
  //     category: "Food",
  //     dispription: "Itarian",
  //     amount: 123,
  //     date: "5/23",
  //   },
  //   {
  //     id: 5,
  //     paidPerson: "Akito",
  //     category: "Food",
  //     dispription: "French",
  //     amount: 123,
  //     date: "5/23",
  //   },
  // ];

  const handleGoBack = () => {
    navigate("/history");
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
          <GobackButton onClick={handleGoBack} />
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
                {/* <BorrowCalculateCard
                  name={"Megan"}
                  amount={200}
                  totalAmount={300}
                />
                <LendCalculateCard
                  name={"Megan"}
                  amount={200}
                  totalAmount={300}
                /> */}
              </CalculateCardContainer>
              <Title>All Expenses</Title>
              {/* {transactionHistory.map((item) => (
                <TransactionCard key={item.id} item={item} />
              ))} */}
            </TransactionCardContainer>
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

const SubBox = styled(Box)`
  width: 100%;
`;
