import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import FriendIcon from "../components/FriendIcon";
import { MainButton } from "../components/MainButton";
import { useEffect, useState } from "react";
import { Category } from "../../types";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SubButton } from "../components/SubButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const TransactionPage = () => {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("");
  const [payer, setPayer] = useState("");

  const selectedFriendsState = useSelector(
    (state: RootState) => state.selectedFriends
  );
  const selectedFriends = selectedFriendsState.selectedFriends;

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleChangePayer = (event: SelectChangeEvent) => {
    setPayer(event.target.value);
  };

  const handlesubmit = () => {
    console.log("cick button");
  };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  // // get categories from a table
  // const getCategories = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("Categories")
  //       .select("*")
  //       .order("sequence", { ascending: true });
  //     if (error) {
  //       setError(error.message);
  //       return false;
  //     } else {
  //       console.log(data, "data");
  //       if (data) {
  //         console.log(data);
  //         setCategories(data as Category[]);
  //       }
  //     }
  //   } catch (error: any) {
  //     setError(error.message);
  //     return false;
  //   }
  // };

  return (
    <MainContainer>
      <SubContainer>
        <Section>
          <Title>With You and </Title>
          <PeopleSectionContainer>
            {/* <FriendIcon /> */}
          </PeopleSectionContainer>
        </Section>
        <Section>
          <FormContainer>
            <InputTitle>Date</InputTitle>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>

            <InputTitle>Description</InputTitle>

            <Box>
              <OutlinedInput placeholder="Please enter text" fullWidth />
            </Box>

            <InputTitle>Categories</InputTitle>

            <Select
              value={category}
              onChange={handleChangePayer}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              fullWidth
            >
              <MenuItem value={payer}>You</MenuItem>
              {selectedFriends.map((item) => {
                return (
                  <MenuItem value={item.email}>
                    {item.id
                      ? `${item.firstName} ${item.lastName}`
                      : item.email}
                  </MenuItem>
                );
              })}
            </Select>
            {/* <Select
              value={category ? category : categories[0].id.toString()}
              onChange={handleChangeCategory}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              fullWidth
            >
              {categories.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select> */}

            <InputTitle>Amount</InputTitle>

            <Box>
              <OutlinedInput placeholder="Please enter text" fullWidth />
            </Box>

            <InputTitle>Payer</InputTitle>

            <Select
              value={payer}
              onChange={handleChangePayer}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              fullWidth
            >
              <MenuItem value={payer}>You</MenuItem>
              {selectedFriends.map((item) => {
                return (
                  <MenuItem value={item.email}>
                    {item.id
                      ? `${item.firstName} ${item.lastName}`
                      : item.email}
                  </MenuItem>
                );
              })}
            </Select>

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
  width: 45%;
  padding: 2rem;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const Title = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Section = styled.div`
  width: 80%;
  margin-bottom: 50px;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputTitle = styled.div`
  margin-top: 7px;
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
