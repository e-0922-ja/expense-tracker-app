import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { SecondaryButton } from "./SecondaryButton";
import { Category } from "../../types";

interface ExpenseProps {
  categories: Category[];
}

export const FormNewExpense = ({ categories }: ExpenseProps) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("");
  const [payer, setPayer] = useState("");

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleChangePayer = (event: SelectChangeEvent) => {
    setPayer(event.target.value);
  };

  return (
    <form action="">
      <Typography variant="h6" component="h2">
        Date
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={date} onChange={(newValue) => setDate(newValue)} />
      </LocalizationProvider>
      <Typography variant="h6" component="h2">
        Description
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <FormControl sx={{ width: "25ch" }}>
          <OutlinedInput placeholder="Please enter text" />
        </FormControl>
      </Box>
      <Typography variant="h6" component="h2">
        Categories
      </Typography>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={category}
          onChange={handleChangeCategory}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((item) => (
            <MenuItem value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6" component="h2">
        Amount
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <FormControl sx={{ width: "25ch" }}>
          <OutlinedInput placeholder="Please enter text" />
        </FormControl>
      </Box>
      <Typography variant="h6" component="h2">
        Payer
      </Typography>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={payer}
          onChange={handleChangePayer}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          <MenuItem value={payer}>Yuki</MenuItem>
        </Select>
      </FormControl>
      <SecondaryButton title={"submit"} />
    </form>
  );
};
