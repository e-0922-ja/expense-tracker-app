import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { SecondaryButton } from './SecondaryButton';
import { Category } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ExpenseProps {
  categories: Category[];
}

export const FormNewExpense = ({ categories }: ExpenseProps) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState('');
  const [payer, setPayer] = useState('');

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

  const handleChangeDate = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  return (
    <form action="">
      <Typography variant="h6" component="h2">
        Date
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={date} onChange={handleChangeDate} />
      </LocalizationProvider>
      <Typography variant="h6" component="h2">
        Description
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <FormControl sx={{ width: '25ch' }}>
          <OutlinedInput placeholder="Please enter text" />
        </FormControl>
      </Box>
      <Typography variant="h6" component="h2">
        Categories
      </Typography>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={category ? category : categories[0].id.toString()}
          onChange={handleChangeCategory}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6" component="h2">
        Amount
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <FormControl sx={{ width: '25ch' }}>
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
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={payer}>You</MenuItem>
          {selectedFriends.map((item) => (
            <MenuItem key={item.id} value={item.email}>
              {item.id ? `${item.firstName} ${item.lastName}` : item.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <SecondaryButton title={'submit'} />
    </form>
  );
};
