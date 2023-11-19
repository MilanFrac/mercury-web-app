import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'react-bootstrap/Button';
import plLocale from 'dayjs/locale/pl';
import 'dayjs/locale/pl';

export default function FixedTags() {
  const services = [
    { title: 'Montaż' },
    { title: 'Reklamacja' },
    { title: 'Pomiar' },
  ];

  const fixedOptions = [services[0]];
  const [value, setValue] = React.useState([...fixedOptions, services[2]]);

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <br />
      <h1>Utwórz zdarzenie</h1>
      <br />
      <h7>Dane Personalne</h7>
      <div/>
        <TextField 
          id="outlined-required-imie"
          label="Imie"
          style={{ marginRight:'40px'}}
        />
        <TextField
          id="outlined-required-nazwisko"
          label="Nazwisko"
        />
        <br/>
        <h7>Dane Kontaktowe</h7>
        <div />
        <TextField
          id="outlined-required-numer-telefonu"
          label="Numer Telefonu"
          defaultValue="+48"
          style={{ marginRight:'40px'}}
        />
        <TextField
          id="outlined-required-adres-mailowy"
          label="Adres Mailowy"
        />
        <br/>
        <h7>Adres</h7>
        <div />
        <TextField
          id="outlined-required-miasto"
          label="Miasto"
          style={{ marginRight:'40px'}}
        />
        <TextField
          id="outlined-required-ulica"
          label="Ulica"
        />
        <div/>
        <TextField
          id="outlined-required-kod-pocztowy"
          label="Kod Pocztowy"
          defaultValue="xx-xxx"
        />

<br/>
<h7>czas</h7>
<div>
  <LocalizationProvider dateAdapter={AdapterDayjs} locale={plLocale}>
    <TimePicker label="Godzina" />
    <DatePicker 
      label="Dzień" 
      firstDayOfWeek={1} 
    />
  </LocalizationProvider>
</div>

<br/>
<h7>Rodzaj Usługi</h7>

<Autocomplete
  multiple
  size='small'
  limitTags={2}
  id="multiple-limit-tags"
  options={services}
  getOptionLabel={(option) => option.title}
  renderInput={(params) => (
    <TextField {...params} label="Usługa" placeholder="Usługa" />
  )}
/>

<div>
  <Button variant="warning" style={{ marginRight: '60px' }}>
    Anuluj
  </Button>
  <Button variant="success">Zatwierdź</Button>
</div>

    </Box>
  );
}