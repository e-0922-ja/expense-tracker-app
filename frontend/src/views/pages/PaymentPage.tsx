import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { FriendIcon } from "../components/FriendIcon";
import { ReactNode, useEffect, useState } from "react";
import { Category } from "../../types";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
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
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { Friend } from "../../types";
import { selectUser } from "../../reducer/userSlice";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

interface CategoryIcon {
  category: string;
  icon: React.ReactElement;
}
export const PaymentPage = () => {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("");
  const [payer, setPayer] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFriends: Friend[] = location.state.selectedFriends;
  const account = useSelector(selectUser);
  const splitters =
    account.isLogin && account.user
      ? [account.user, ...selectedFriends]
      : selectedFriends;

  const handleChangeCategory = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => {
    setCategory(event.target.value as string);
  };

  const handleChangePayer = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => {
    setPayer(event.target.value as string);
  };

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/history");
  };

  console.log(error);

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

  const handleChangeDate = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  return (
    <MainContainer>
      <SubContainer>
        <Section>
          <Title>Create Expense</Title>
          <PeopleSectionContainer>
            <FriendIcon friends={splitters} />
          </PeopleSectionContainer>
        </Section>
        <Section>
          <FormContainer onSubmit={handlesubmit}>
            <InputsWrapper>
              <SubInputsWrapper>
                <InputTitle>Amount</InputTitle>
                <StyledBox>
                  <StyledOutlinedInput
                    placeholder="0.0"
                    startAdornment={
                      <StyledInputAdornment position="start">
                        $
                      </StyledInputAdornment>
                    }
                    fullWidth
                  />
                </StyledBox>
              </SubInputsWrapper>
              <SubInputsWrapper>
                <InputSelectTitle>Who paid?</InputSelectTitle>
                <StyledSelect
                  value={
                    payer || (splitters.length > 0 ? splitters[0].email : "")
                  }
                  onChange={handleChangePayer}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  fullWidth
                  variant="outlined"
                >
                  {splitters.map((item, index) => {
                    return (
                      <MenuItem value={item.email} key={index}>
                        {item.id
                          ? `${item.firstName} ${item.lastName}`
                          : item.email}
                      </MenuItem>
                    );
                  })}
                </StyledSelect>
              </SubInputsWrapper>
            </InputsWrapper>
            <InputsWrapper>
              <SubInputsWrapper>
                <InputSelectTitle>Categories</InputSelectTitle>
                <StyledSelect
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
                >
                  {categories.map((item, index) => (
                    <MenuItem value={item.id} key={index}>
                      <MenuItemContainer>
                        {
                          categoryIcons.find(
                            (icon) => icon.category === item.name
                          )?.icon
                        }
                        {item.name}
                      </MenuItemContainer>
                    </MenuItem>
                  ))}
                </StyledSelect>
                <InputTitle>Description</InputTitle>
                <StyledBox>
                  <StyledOutlinedInput
                    placeholder="Please enter text"
                    fullWidth
                  />
                </StyledBox>
                <InputTitle>Date</InputTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePickerWrapper>
                      <DatePicker value={date} onChange={handleChangeDate} />
                    </DatePickerWrapper>
                  </DemoContainer>
                </LocalizationProvider>
              </SubInputsWrapper>
              <SubInputsWrapper>
                <InputSelectTitle>How will you guys split?</InputSelectTitle>
                <SplitterContainer>
                  {splitters.map((friend, index) => {
                    return (
                      <div key={index}>
                        <SplitWrapper>
                          <SplitterName>{friend.firstName}</SplitterName>
                          <SplitterBox>
                            <StyledOutlinedInput
                              placeholder="0.0"
                              startAdornment={
                                <StyledInputAdornment position="start">
                                  $
                                </StyledInputAdornment>
                              }
                              fullWidth
                            />
                          </SplitterBox>
                        </SplitWrapper>
                      </div>
                    );
                  })}
                </SplitterContainer>
              </SubInputsWrapper>
            </InputsWrapper>
            <ButtonContainer>
              <StyledButton variant="contained" disableRipple>
                create
              </StyledButton>
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
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 95%;
  width: 45%;
  background-color: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    padding: 0 20px;
  }
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 15px;
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
  @media (max-width: 600px) {
    gap: 0x;
    flex-direction: column;
  }
`;

const SubInputsWrapper = styled.div`
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const InputTitle = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const InputSelectTitle = styled.div`
  margin-top: 1rem;
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

const StyledOutlinedInput = styled(OutlinedInput)`
  &.MuiOutlinedInput-root {
    /* Change the background color */
    background-color: ${({ theme }) => theme.palette.primary.light};
    color: ${({ theme }) => theme.palette.info.light};

    .MuiInputBase-input.MuiOutlinedInput-input {
      padding: 14px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.info.light};
    }

    &:not(:hover) .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.info.light};
    }
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.info.light};
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.palette.secondary.main} !important;
`;

const StyledSelect = styled(Select)`
  &.MuiOutlinedInput-root {
    /* Change the background color */
    background-color: ${({ theme }) => theme.palette.primary.light};
    color: ${({ theme }) => theme.palette.info.light};

    .MuiInputBase-input.MuiOutlinedInput-input {
      padding: 14px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.info.light};
    }

    &:not(:hover) .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.info.light};
    }
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.info.light};
  }
`;

const StyledInputAdornment = styled(InputAdornment)`
  .MuiTypography-root.MuiTypography-body1.css-1pnmrwp-MuiTypography-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
`;

const DatePickerWrapper = styled.div`
  .MuiOutlinedInput-root {
    background-color: ${({ theme }) => theme.palette.primary.light};
    color: ${({ theme }) => theme.palette.info.light};

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.info.light};
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.info.light};
    }

    & .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.info.light};
    }
    .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium.css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root {
      color: ${(props) => props.theme.palette.info.light};

      &:hover {
        color: ${(props) => props.theme.palette.info.dark};
      }

      &:active {
        color: ${(props) => props.theme.palette.info.dark};
      }
    }
  }
`;
