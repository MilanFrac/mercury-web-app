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
import services from '../data/services';
import AddEventForm from '../Components/AddEventForm/AddEventForm';

export default function FixedTags() {

  const fixedOptions = [services[0]];
  const [value, setValue] = React.useState([...fixedOptions, services[2]]);

  return (
      <AddEventForm availableServices={services} />
    );

//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '40ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <br />
//       <h1>Utwórz zdarzenie</h1>
//       <br />
//       <h6>Dane Personalne</h6>
//       <div/>
//         <TextField 
//           id="outlined-required-imie"
//           label="Imie"
//           style={{ marginRight:'40px'}}
//         />
//         <TextField
//           id="outlined-required-nazwisko"
//           label="Nazwisko"
//         />
//         <br/>
//         <h6>Dane Kontaktowe</h6>
//         <div />
//         <TextField
//           id="outlined-required-numer-telefonu"
//           label="Numer Telefonu"
//           defaultValue="+48"
//           style={{ marginRight:'40px'}}
//         />
//         <TextField
//           id="outlined-required-adres-mailowy"
//           label="Adres Mailowy"
//         />
//         <br/>
//         <h6>Adres</h6>
//         <div />
//         <TextField
//           id="outlined-required-miasto"
//           label="Miasto"
//           style={{ marginRight:'40px'}}
//         />
//         <TextField
//           id="outlined-required-ulica"
//           label="Ulica"
//         />
//         <div/>
//         <TextField
//           id="outlined-required-kod-pocztowy"
//           label="Kod Pocztowy"
//           defaultValue="xx-xxx"
//         />

// <br/>
// <h6>czas</h6>
// <div>
//   <LocalizationProvider dateAdapter={AdapterDayjs} locale={plLocale}>
//     <TimePicker label="Godzina" />
//     <DatePicker 
//       label="Dzień" 
//       firstDayOfWeek={1} 
//     />
//   </LocalizationProvider>
// </div>

// <br/>
// <h6>Rodzaj Usługi</h6>

// <Autocomplete
//   multiple
//   size='small'
//   limitTags={2}
//   id="multiple-limit-tags"
//   options={services}
//   getOptionLabel={(option) => option.title}
//   renderInput={(params) => (
//     <TextField {...params} label="Usługa" placeholder="Usługa" />
//   )}
// />

// <div>
//   <Button variant="warning" style={{ marginRight: '60px' }}>
//     Anuluj
//   </Button>
//   <Button type="submit" variant="success">Zatwierdź</Button>
// </div>

//     </Box>
//   );
}