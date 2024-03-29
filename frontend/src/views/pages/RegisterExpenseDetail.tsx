import styled from "styled-components";
import { FriendIcon } from "../components/FriendIcon";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { EachAmount, Expense, Friend, Message } from "../../types";
import { categories } from "../../constants/categoryIcons";
import { FormButton } from "../components/FormButton";
import { useForm } from "react-hook-form";
import { GobackButton } from "../components/GobackButton";
import {
  ERROR_BLANK_DESCRIPTION,
  ERROR_EMPTY_AMOUNT,
  ERROR_EMPTY_DESCRIPTION,
  SUCCESS_CREATE_EXPENSE,
} from "../../constants/message";
import { useSupabaseSession } from "../../hooks/useSupabaseSession";
import { client } from "../../services/supabase";

export const RegisterExpenseDetail = () => {
  const [category, setCategory] = useState(categories[0].name);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const location = useLocation();
  const selectedFriends: Friend[] = location.state.selectedFriends;
  const [payer, setPayer] = useState("");
  const [memberExpense, setMemberExpense] = useState<EachAmount[]>([]);
  const [user, setUser] = useState<Friend>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [createExpenseMessage, setCreateExpenseMessage] = useState<Message>({
    isError: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Expense>();

  const navigate = useNavigate();
  const { session } = useSupabaseSession();

  const amount = watch("amount");
  const description = watch("description");

  useEffect(() => {
    if (session && session.user) {
      setUser({
        id: session.user.id,
        email: session.user.email!,
        firstName: session.user.user_metadata.firstName,
        lastName: session.user.user_metadata.lastName,
      });
    }
  }, [session]);

  useEffect(() => {
    const splitters = [user, ...selectedFriends];
    const memberWithAmount = splitters.map((member) => ({
      ...member,
      amount: "",
      paid: member.id === user.id,
    }));
    setMemberExpense(memberWithAmount);
    setPayer(user.id);
  }, [user, selectedFriends]);

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

  const createExpense = handleSubmit(async (data: Expense) => {
    const resultInsertExpense = await insertExpense();
    if (resultInsertExpense) navigate("/history");
  });

  const insertExpense = async () => {
    const memberIds = memberExpense.map((member) => member.id.toString());
    const memberPaids = memberExpense.map((member) => member.paid);
    const memberAmounts = memberExpense.map((member) =>
      parseFloat(member.amount)
    );

    try {
      const { error } = await client.rpc("insert_expense", {
        group_name: "",
        date: date?.toISOString()!,
        registered_by: user.id,
        member_ids: memberIds,
        member_paids: memberPaids,
        member_amounts: memberAmounts,
        payer_id: payer,
        category: category,
        description: description,
        payment: parseFloat(amount),
      });
      if (error) {
        setCreateExpenseMessage({ isError: true, message: error.message });
        return false;
      } else {
        setCreateExpenseMessage({
          isError: false,
          message: SUCCESS_CREATE_EXPENSE,
        });
        return true;
      }
    } catch (error: any) {
      setCreateExpenseMessage({ isError: true, message: error.message });
      return false;
    }
  };

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;
    setValue("amount", newAmount);
    const eachAmount = newAmount
      ? Math.floor((parseFloat(newAmount) / memberExpense.length) * 100) / 100
      : 0;

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

  const handleChangeDate = (newDate: Dayjs | null) => {
    setDate(newDate);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;
    setValue("description", newAmount);
  };

  const handleGoBack = () => {
    navigate("/expense/select-friends");
  };

  return (
    <MainContainer>
      <SubContainer>
        <Section>
          <GobackButtonWrapper>
            <GobackButton onClick={handleGoBack} />
          </GobackButtonWrapper>
          <Title>Create Expense</Title>
          <PeopleSectionContainer>
            <FriendIcon friends={memberExpense} />
          </PeopleSectionContainer>
        </Section>
        <Section>
          <FormContainer onSubmit={createExpense}>
            <InputsWrapper>
              <SubInputsWrapper>
                <InputTitle>Amount</InputTitle>
                <StyledBox>
                  <StyledOutlinedNumberInput
                    {...register("amount", {
                      required: {
                        value: true,
                        message: ERROR_EMPTY_AMOUNT,
                      },
                    })}
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
                  {memberExpense.map((member, index) => {
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
                    placeholder="Please enter text"
                    fullWidth
                    {...register("description", {
                      required: {
                        value: true,
                        message: ERROR_EMPTY_DESCRIPTION,
                      },
                      validate: {
                        noWhitespaceOnly: (value) =>
                          value.trim() !== "" || ERROR_BLANK_DESCRIPTION,
                      },
                    })}
                    onChange={handleChangeDescription}
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
                              id={index.toString()}
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
              <FormButton title={"create expense"} />
            </ButtonContainer>
            {errors.amount && <ErrorText>{errors.amount.message}</ErrorText>}
            {errors.description && (
              <ErrorText>{errors.description.message}</ErrorText>
            )}
            {createExpenseMessage && (
              <ExpenseMessage isError={createExpenseMessage.isError}>
                {createExpenseMessage.message}
              </ExpenseMessage>
            )}
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
  height: 100vh;
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
  display: flex;
  justify-content: center;
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

  &&.Mui-disabled {
    .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled {
      -webkit-text-fill-color: ${({ theme }) => theme.palette.info.light};
    }
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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
        color: ${(props) => props.theme.palette.info.light};
      }

      &:active {
        color: ${(props) => props.theme.palette.info.light};
      }
    }
  }
`;

const CheckboxWrapper = styled.div`
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 7px;
  font-size: 1rem;
  color: #ff908d;
`;

const ExpenseMessage = styled.div<{ isError: boolean }>`
  display: flex;
  justify-content: center;
  width: 70%;
  margin-top: 7px;
  font-size: 1rem;
  color: ${({ isError }) => (isError ? "#ff908d" : "#4caf50")};
`;

const GobackButtonWrapper = styled.div`
  margin-top: 20px;
`;
