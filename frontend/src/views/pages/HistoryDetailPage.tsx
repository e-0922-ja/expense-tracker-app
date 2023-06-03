import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
  SelectChangeEvent,
  Checkbox,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContents } from "../components/DrawerContents";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../supabase/schema";
import { Category } from "../../types";
import { GobackButton } from "../components/GobackButton";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
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

interface TransList {
  category: string;
  dispription: string;
  amount: number;
  date: string;
}

interface Dammy {
  firstName: string;
}

export const HistoryDetailPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const materialTheme = useTheme();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  const [date, setDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [age, setAge] = useState("");

  const [checked, setChecked] = useState(false);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handledDammy = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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

  const transactionHistory: TransList[] = [
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
    { category: "food", dispription: "starbucks", amount: 123, date: "5/23" },
  ];

  const dammy: Dammy[] = [
    { firstName: "Max" },
    { firstName: "Bob" },
    { firstName: "Anna" },
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

  const handlesubmit = () => {
    navigate("/history");
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
        <Box sx={{ width: "100%", typography: "body1" }}>
          <GobackButton func={handleGoBack} />
          <DetailBox>
            <Section>
              <Title>StarBucks</Title>
            </Section>
            <Section>
              <FormContainer>
                <InputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Amount</TopicTitle>
                    <StyledBox>
                      <Data>$100</Data>
                    </StyledBox>
                  </SubInputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Who paid?</TopicTitle>
                    <StyledBox>
                      <Data>Yuki</Data>
                    </StyledBox>
                  </SubInputsWrapper>
                </InputsWrapper>
                <InputsWrapper>
                  <SubInputsWrapper>
                    <TopicTitle>Date</TopicTitle>
                    <StyledBox>
                      <Data>2023/06/02</Data>
                    </StyledBox>
                    <TopicTitle>Categories</TopicTitle>
                    <StyledBox>
                      <CategoryData>
                        <IconContainer>
                          <IconCircle>
                            <RestaurantIcon />
                          </IconCircle>
                        </IconContainer>
                        Food
                      </CategoryData>
                    </StyledBox>
                  </SubInputsWrapper>
                  <SubInputsWrapper>
                    <InputSelectTitle>Already Have Returned?</InputSelectTitle>
                    <SplitterContainer>
                      {dammy.map((friend, index) => {
                        return (
                          <div key={index}>
                            <SplitWrapper>
                              <Checkbox
                                checked={checked}
                                onChange={handleToggle}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                              <SplitterName>{friend.firstName}</SplitterName>
                              <SplitterBox>
                                <StyledBox>
                                  <Data>$100</Data>
                                </StyledBox>
                              </SplitterBox>
                            </SplitWrapper>
                          </div>
                        );
                      })}
                    </SplitterContainer>
                    <ButtonContainer>
                      <SubButton title={"save"} func={handlegoback} />
                    </ButtonContainer>
                  </SubInputsWrapper>
                </InputsWrapper>
              </FormContainer>
            </Section>
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

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
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
`;

const SubInputsWrapper = styled.div`
  width: 50%;
`;

const TopicTitle = styled.div`
  margin-top: 1rem;
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
  border-radius: 10px;
`;

const CategoryData = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
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
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
`;
