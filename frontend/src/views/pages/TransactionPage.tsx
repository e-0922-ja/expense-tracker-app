import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { FriendIcon } from "../components/FriendIcon";
import { MainButton } from "../components/MainButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { useEffect, useState } from "react";
import { Category } from "../../types";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import HouseIcon from "@mui/icons-material/House";
import LightIcon from "@mui/icons-material/Light";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import Face3Icon from "@mui/icons-material/Face3";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { SubButton } from "../components/SubButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { Friend } from "../../types";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

interface CategoryIcon {
  category: string;
  icon: React.ReactElement;
}
export const TransactionPage = () => {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("");
  const [payer, setPayer] = useState("");

  const navigate = useNavigate();
  let location = useLocation();
  let selectedFriends: Friend[] = location.state.selectedFriends;

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleChangePayer = (event: SelectChangeEvent) => {
    setPayer(event.target.value);
  };

  const handlesubmit = () => {
    navigate("/history");
  };

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
        console.log(data, "data");
        if (data) {
          console.log(data);
          setCategories(data as Category[]);
        }
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };
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

  return (
    <MainContainer>
      <SubContainer>
        <Section>
          <Title>With You and </Title>
          <PeopleSectionContainer>
            <FriendIcon friends={selectedFriends} />
          </PeopleSectionContainer>
        </Section>
        <Section>
          <FormContainer>
            <InputsWrapper>
              <SubInputsWrapper>
                <InputTitle>Amount</InputTitle>
                <StyledBox>
                  <OutlinedInput
                    placeholder="0.0"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    fullWidth
                    sx={{
                      "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        padding: "14px", // Adjust the padding value according to your needs
                      },
                    }}
                  />
                </StyledBox>
              </SubInputsWrapper>
              <SubInputsWrapper>
                <InputTitle>Description</InputTitle>
                <StyledBox>
                  <OutlinedInput
                    placeholder="Please enter text"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        padding: "14px",
                      },
                    }}
                  />
                </StyledBox>
              </SubInputsWrapper>
            </InputsWrapper>
            <InputsWrapper>
              <ThirdInputsWrapper>
                <InputSelectTitle>Categories</InputSelectTitle>
                <Select
                  value={
                    category
                      ? category
                      : categories.length > 0
                      ? categories[0].id.toString()
                      : ""
                  }
                  onChange={handleChangeCategory}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      padding: "14px", // Adjust the padding value according to your needs
                    },
                  }}
                >
                  {categories.map((item, index) => (
                    <MenuItem value={item.id} key={index}>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        {
                          categoryIcons.find(
                            (icon) => icon.category === item.name
                          )?.icon
                        }
                        {item.name}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
                <InputTitle>Date</InputTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "14px",
                        },
                        "& .MuiStack-root": {
                          paddingTop: "4px",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </ThirdInputsWrapper>
              <ThirdInputsWrapper>
                <InputSelectTitle>Who paid?</InputSelectTitle>
                <Select
                  value={payer}
                  onChange={handleChangePayer}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      padding: "14px", // Adjust the padding value according to your needs
                    },
                  }}
                >
                  <MenuItem value={payer}>You</MenuItem>
                  {selectedFriends.map((item, index) => {
                    return (
                      <MenuItem value={item.email} key={index}>
                        {item.id
                          ? `${item.firstName} ${item.lastName}`
                          : item.email}
                      </MenuItem>
                    );
                  })}
                </Select>
              </ThirdInputsWrapper>
              <ThirdInputsWrapper>
                <InputSelectTitle>How will you split?</InputSelectTitle>
              </ThirdInputsWrapper>
            </InputsWrapper>

            <ButtonContainer>
              <SubButton title={"create"} func={handlesubmit} />
            </ButtonContainer>
          </FormContainer>
        </Section>
      </SubContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: calc(100% - 64px);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85%;
  width: 60%;

  background: ${({ theme }) => theme.palette.primary.main};
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const SubInputsWrapper = styled.div`
  width: 50%;
`;

const ThirdInputsWrapper = styled.div`
  width: 33%;
`;

const InputTitle = styled.div`
  margin-top: 2rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const InputSelectTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const PeopleSectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-beteen;
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
`;

const StyledBox = styled(Box)`
  margin-top: 8px;
`;
