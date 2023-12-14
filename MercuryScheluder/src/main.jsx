import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);