import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { FriendIcon } from "../components/FriendIcon";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { Friend } from "../../types";
import { selectUser } from "../../reducer/userSlice";
import { Database } from "../../../../supabase/schema";
import { categories } from "../../constants/categoryIcons";

interface EachAmount extends Friend {
  amount: string;
  paid: boolean;
}

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const PaymentPage = () => {
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0].name);
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
    paid: member.id === account.user?.id,
  }));
  const [memberExpense, setMemberExpense] =
    useState<EachAmount[]>(memberWithAmount);
  const [payer, setPayer] = useState(splitters[0].id.toString());

  const handleChangeCategory = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  };

  const handleChangePayer = (event: SelectChangeEvent<unknown>) => {
    setPayer(event.target.value as string);
    const updatedPaid = memberExpense.map((member) => ({
      ...member,
      paid: member.id.toString() === event.target.value,
    }));

    setMemberExpense(updatedPaid);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultInsertExpense = await insertExpense();
    if (resultInsertExpense) navigate("/history");
  };

  console.log(error);

  const insertExpense = async () => {
    const memberIds = memberExpense.map((member) => member.id.toString());
    const memberPaids = memberExpense.map((member) => member.paid);
    const memberAmounts = memberExpense.map((member) =>
      parseFloat(member.amount)
    );

    try {
      console.log(category);
      const { data, error } = await supabase.rpc("insert_expense", {
        group_name: "",
        date: date?.toISOString()!,
        registered_by: account.user!.id, // think about the user data handling later
        member_ids: memberIds,
        member_paids: memberPaids,
        member_amounts: memberAmounts,
        payer_id: payer,
        category: category,
        description: description,
        payment: parseFloat(amount),
      });
      if (error) {
        setError(error.message);
        return false;
      } else {
        console.log(data);
        return true;
      }
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };
  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    const eachAmount =
      Math.floor((parseFloat(event.target.value) / splitters.length) * 100) /
      100;
    const updatedEachAmount = memberExpense.map((member) => {
      return { ...member, amount: eachAmount.toFixed(2) };
    });
    setMemberExpense(updatedEachAmount);
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userId = event.target.id;
    setMemberExpense((prevMembers) => {
      const updatedChecked = prevMembers.map((member) => {
        if (member.id === userId) {
          return {
            ...member,
            paid: !member.paid,
          };
        }
        return member;
      });
      return updatedChecked;
    });
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
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
          <FormContainer onSubmit={handleSubmit}>
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
                  value={payer}
                  onChange={handleChangePayer}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  fullWidth
                  variant="outlined"
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
                </StyledSelect>
              </SubInputsWrapper>
            </InputsWrapper>
            <InputsWrapper>
              <SubInputsWrapper>
                <InputSelectTitle>Categories</InputSelectTitle>
                <StyledSelect
                  value={category}
                  onChange={handleChangeCategory}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  fullWidth
                >
                  {categories.map((category, index) => (
                    <MenuItem value={category.name} key={index}>
                      <MenuItemContainer>
                        <category.icon />
                        {category.name}
                      </MenuItemContainer>
                    </MenuItem>
                  ))}
                </StyledSelect>
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
                    <DatePickerWrapper>
                      <DatePicker value={date} onChange={handleChangeDate} />
                    </DatePickerWrapper>
                  </DemoContainer>
                </LocalizationProvider>
              </SubInputsWrapper>
              <SubInputsWrapper>
                <InputSelectTitle>Amount per member</InputSelectTitle>
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
                              placeholder="0.0"
                              type="number"
                              startAdornment={
                                <StyledInputAdornment position="start">
                                  $
                                </StyledInputAdornment>
                              }
                              fullWidth
                              disabled={true}
                            />
                          </SplitterBox>
                          <CheckboxWrapper>
                            <Checkbox
                              id={member.id}
                              checked={
                                memberExpense.find(
                                  (user) => user.id === member.id
                                )?.paid
                              }
                              onChange={handleToggle}
                              inputProps={{ "aria-label": "controlled" }}
                              disabled={payer === member.id}
                            />
                          </CheckboxWrapper>
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

const StyledOutlinedNumberInput = styled(StyledOutlinedInput)`
  && input::-webkit-outer-spin-button,
  && input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  && input[type="number"] {
    -moz-appearance: textfield;
  }

  .Mui-disabled {
    color: ${({ theme }) => theme.palette.info.light};
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

const CheckboxWrapper = styled.div`
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;
