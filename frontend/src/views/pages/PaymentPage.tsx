import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { FriendIcon } from "../components/FriendIcon";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { Database } from "../../../../supabase/schema";

interface CategoryIcon {
  category: string;
  icon: React.ReactElement;
}

interface EachAmount extends Friend {
  amount: string;
}

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const PaymentPage = () => {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFriends: Friend[] = location.state.selectedFriends;
  const account = useSelector(selectUser);
  const splitters =
    account.isLogin && account.user ? [account.user, ...selectedFriends] : [];

  const memberWithAmount = splitters.map((member) => ({
    ...member,
    amount: "",
  }));
  const [memberExpense, setMemberExpense] =
    useState<EachAmount[]>(memberWithAmount);
  const [payer, setPayer] = useState(splitters[0].id.toString());

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleChangePayer = (event: SelectChangeEvent) => {
    setPayer(event.target.value);
  };

  const handlesubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    insertExpense();
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
          setCategory(data[0].id.toString());
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

  const insertExpense = async () => {
    const memberIds = memberExpense.map((member) => member.id.toString());
    const memberPaids = memberExpense.map((member) => member.id === payer);
    const memberAmounts = memberExpense.map((member) =>
      parseFloat(member.amount)
    );

    try {
      const { data, error } = await supabase.rpc("insert_expense", {
        group_name: "",
        date: date?.toISOString()!,
        registered_by: account.user!.id, // think about the user data handling later
        member_ids: memberIds,
        member_paids: memberPaids,
        member_amounts: memberAmounts,
        payer_id: payer,
        category_id: parseInt(category),
        description: description,
        payment: parseFloat(amount),
      });
      if (error) {
        setError(error.message);
      } else {
        console.log(data);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  const handleChangeDate = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleChangeEachAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedEachAmount = memberExpense.map((member) => {
      if (member.id.toString() === event.target.id) {
        return { ...member, amount: event.target.value };
      } else {
        return member;
      }
    });
    setMemberExpense(updatedEachAmount);
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
                  <StyledOutlinedNumberInput
                    value={amount}
                    onChange={handleChangeAmount}
                    type="number"
                    placeholder="0.0"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    fullWidth
                  />
                </StyledBox>
              </SubInputsWrapper>
              <SubInputsWrapper>
                <InputSelectTitle>Who paid?</InputSelectTitle>
                <Select
                  value={payer || (splitters.length > 0 ? splitters[0].id : "")}
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
                  {splitters.map((member, index) => {
                    return (
                      <MenuItem value={member.id} key={index}>
                        {member.id
                          ? `${member.firstName} ${member.lastName}`
                          : member.email}
                      </MenuItem>
                    );
                  })}
                </Select>
              </SubInputsWrapper>
            </InputsWrapper>
            <InputsWrapper>
              <SubInputsWrapper>
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
                </Select>
                <InputTitle>Description</InputTitle>
                <StyledBox>
                  <StyledOutlinedInput
                    value={description}
                    onChange={handleChangeDescription}
                    placeholder="Please enter text"
                    fullWidth
                  />
                </StyledBox>
                <InputTitle>Date</InputTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker value={date} onChange={handleChangeDate} />
                  </DemoContainer>
                </LocalizationProvider>
              </SubInputsWrapper>
              <SubInputsWrapper>
                <InputSelectTitle>How will you guys split?</InputSelectTitle>
                <SplitterContainer>
                  {memberExpense.map((member, index) => {
                    return (
                      <div key={index}>
                        <SplitWrapper>
                          <SplitterName>{member.firstName}</SplitterName>
                          <SplitterBox>
                            <StyledOutlinedNumberInput
                              id={member.id}
                              value={member.amount}
                              onChange={handleChangeEachAmount}
                              placeholder="0.0"
                              type="number"
                              startAdornment={
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
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
              <StyledButton variant="contained" disableRipple type="submit">
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 95%;
  width: 45%;
  background-color: ${({ theme }) => theme.palette.primary.main};
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
`;

const SubInputsWrapper = styled.div`
  width: 50%;
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
`;

const SplitterBox = styled(Box)`
  width: 70%;
`;

const StyledOutlinedInput = styled(OutlinedInput)`
  && .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 14px;
  }
`;

const StyledOutlinedNumberInput = styled(OutlinedInput)`
  && input::-webkit-outer-spin-button,
  && input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  && input[type="number"] {
    -moz-appearance: textfield;
  }
  && .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 14px;
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
