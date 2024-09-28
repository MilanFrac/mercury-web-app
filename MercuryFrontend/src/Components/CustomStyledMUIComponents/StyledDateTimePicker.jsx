import { DateTimePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';

export const StyledDateTimePicker = styled(DateTimePicker, {
  shouldForwardProp: (prop) => prop
})(({ theme }) => ({
  '& .MuiFormLabel-root': {
    '&.Mui-disabled': {
      // color: '#00000099'
      color: theme.palette.text.secondary
    }
  }
}));
