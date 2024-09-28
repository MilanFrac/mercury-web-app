import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop
})(({ theme }) => ({
  '& .MuiFormLabel-root': {
    '&.Mui-disabled': {
      // color: '#00000099'
      color: theme.palette.text.secondary
    }
  }
}));
