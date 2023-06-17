import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
  Checkbox,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContents } from "../components/DrawerContents";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../supabase/schema";
import { Category } from "../../types";
import { GobackButton } from "../components/GobackButton";
import { useNavigate } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import HouseIcon from "@mui/icons-material/House";
import LightIcon from "@mui/icons-material/Light";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import Face3Icon from "@mui/icons-material/Face3";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { SubButton } from "../components/SubButton";

interface TransactionHistory {
  id: number;
  paidPerson: string;
  category: string;
  dispription: string;
  amount: number;
  date: string;
}

interface Dammy {
  id: number;
  firstName: string;
  splitBill: number;
}

interface CategoryIcon {
  category: string;
  icon: React.ReactElement;
}

export const HistoryDetailPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [checked, setChecked] = useState(false);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handlegoback = () => {
    navigate("/history");
  };

  const supabase = createClient<Database>(
    process.env.REACT_APP_SUPABASE_URL as string,
    process.env.REACT_APP_SUPABASE_ANON_KEY as string
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const transactionHistory: TransactionHistory = {
    id: 1,
    paidPerson: "Yuki",
    category: "Food",
    dispription: "starbucks",
    amount: 123,
    date: "5/23",
  };

  const dammy: Dammy[] = [
    { id: 1, firstName: "Max", splitBill: 100 },
    { id: 2, firstName: "Bob", splitBill: 200 },
    { id: 3, firstName: "Anna", splitBill: 300 },
  ];

  const categoryIcons: CategoryIcon[] = [
    { category: "Food", icon: <RestaurantIcon /> },
    { category: "Entertainment", icon: <MusicNoteIcon /> },
    { category: "Transportation", icon: <DirectionsTransitIcon /> },
    { category: "Cost of Living", icon: <HouseIcon /> },
    { category: "Utility", icon: <LightIcon /> },
    { category: "Health", icon: <MonitorHeartIcon /> },
    { category: "Beauty", icon: <Face3Icon /> },
    { category: "Cloth", icon: <ShoppingCartIcon /> },
    { category: "Others", icon: <HelpOutlineIcon /> },
    { category: "None", icon: <HorizontalRuleIcon /> },
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
        console.log(categories);
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
    console.error(error);
  };

  const handleGoBack = () => {
    navigate("/history");
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
        <SubBox>
          <GobackButton onClick={handleGoBack} />
          <DetailBox>
            <Section>
              <Title>{transactionHistory.dispription}</Title>
            </Section>
            <Section>
              <FormContainer>
                <InputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Amount</TopicTitle>
                    <StyledBox>
                      <Data>{transactionHistory.amount}</Data>
                    </StyledBox>
                  </SubInputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Who paid?</TopicTitle>
                    <StyledBox>
                      <Data>{transactionHistory.paidPerson}</Data>
                    </StyledBox>
                  </SubInputsWrapper>
                </InputsWrapper>
                <InputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Date</TopicTitle>
                    <StyledBox>
                      <Data>{transactionHistory.date}</Data>
                    </StyledBox>
                    <TopicTitle>Categories</TopicTitle>
                    <StyledBox>
                      <CategoryData>
                        <IconContainer>
                          <IconCircle>
                            {
                              categoryIcons.find(
                                (item) =>
                                  item.category === transactionHistory.category
                              )?.icon
                            }
                          </IconCircle>
                        </IconContainer>
                        {transactionHistory.category}
                      </CategoryData>
                    </StyledBox>
                  </SubInputsWrapper>
                  <SubInputsWrapper>
                    <InputSelectTitle>Already Have Returned?</InputSelectTitle>
                    <SplitterContainer>
                      {dammy.map((friend) => {
                        return (
                          <div key={friend.id}>
                            <SplitWrapper>
                              <CheckboxWrapper>
                                <Checkbox
                                  checked={checked}
                                  onChange={handleToggle}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              </CheckboxWrapper>
                              <SplitterName>{friend.firstName}</SplitterName>
                              <SplitterBox>
                                <StyledBox>
                                  <Data>${friend.splitBill}</Data>
                                </StyledBox>
                              </SplitterBox>
                            </SplitWrapper>
                          </div>
                        );
                      })}
                    </SplitterContainer>
                    <ButtonContainer>
                      <SubButton title={"save"} onClick={handlegoback} />
                    </ButtonContainer>
                  </SubInputsWrapper>
                </InputsWrapper>
              </FormContainer>
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

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
  }
`;

const SubInputsWrapper = styled.div`
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TopicTitle = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const InputSelectTitle = styled.div`
  margin-top: 1rem;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledBox = styled(Box)`
  margin-top: 8px;
`;

const SplitterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SplitWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SplitterName = styled.div`
  width: 30%;
  display: flex;
  padding-left: 1rem;
  color: ${({ theme }) => theme.palette.info.light};
`;

const SplitterBox = styled(Box)`
  width: 70%;
`;

const DetailBox = styled.div`
  margin: 0 1rem;
`;

const Data = styled.div`
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.info.light};
  border-radius: 10px;
`;

const CategoryData = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.info.light};
  border-radius: 10px;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

const IconCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  color: #fff;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
`;

const SubBox = styled(Box)`
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;
