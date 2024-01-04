
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker, plPL } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';
import plLocale from 'date-fns/locale/pl';
import axios from 'axios';

const Form = ({ onAddEvent, onCloseModal, setAllEvents }) => {
  const services = [
    { title: 'Montaż' },
    { title: 'Reklamacja' },
    { title: 'Pomiar' },
  ];

  const [value, setValue] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(() => new Date());

  const [personalData, setPersonalData] = React.useState({
    imie: '',
    nazwisko: '',
    numerTelefonu: '+48',
    adresMailowy: '',
    miasto: '',
    ulica: '',
    kodPocztowy: 'xx-xxx',
  });

  const [errors, setErrors] = useState({});

  const formatDate = (date, formatString) => format(date, formatString, { locale: plLocale });

  const handleAddEvent = () => {
    // Walidacja pól
    const newErrors = {};

    if (!personalData.imie.trim()) {
      newErrors.imie = 'Imię jest wymagane';
    }

    if (!personalData.nazwisko.trim()) {
      newErrors.nazwisko = 'Nazwisko jest wymagane';
    }

    if (!personalData.adresMailowy.includes('@')) {
      newErrors.adresMailowy = 'Nieprawidłowy adres email';
    }

    if (!personalData.miasto.trim() || /\d/.test(personalData.miasto)) {
      newErrors.miasto = 'Miasto jest wymagane i nie może zawierać cyfr';
    }

    if (!/^[A-Za-z]+\s\d+$/.test(personalData.ulica)) {
      newErrors.ulica = 'Ulica musi zawierać słowo i cyfrę (np. Nazwowa 123)';
    }

    if (!/^\d{2}-\d{3}$/.test(personalData.kodPocztowy)) {
      newErrors.kodPocztowy = 'Nieprawidłowy format kodu pocztowego (np. 80-000)';
    }

    if (value.length === 0) {
      newErrors.services = 'Usługa jest wymagana';
    }

    // Walidacja numeru telefonu
    if (!/^\+48\d{0,9}$/.test(personalData.numerTelefonu)) {
      newErrors.numerTelefonu = 'Nieprawidłowy numer telefonu';
    }

    // Jeśli są błędy, ustaw je w stanie i nie kontynuuj
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Reszta kodu pozostaje bez zmian
    const newEvent = {
      title: value.map((service) => service.title).join(', '),
      start: selectedDate,
      end: selectedDate,
      ...personalData,
    };

    console.log('Nowe wydarzenie:', newEvent);

    // Wywołaj funkcję przekazaną jako prop do dodania nowego wydarzenia
    onAddEvent(newEvent);

    // Zaktualizuj stan wszystkich wydarzeń w komponencie Form
    setAllEvents?.((prevEvents) => [...prevEvents, newEvent]);

    onCloseModal();
  };

  const handleCancel = () => {
    onCloseModal();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleAddEvent();

    const appointmentData = {
      firstName: personalData.imie,
      lastName: personalData.nazwisko,
      email: personalData.adresMailowy,
      phone: personalData.numerTelefonu,
      city: personalData.miasto,
      zipCode: personalData.kodPocztowy,
      street: personalData.ulica,
      houseNumber: 0,
      apartmentNumber: 0,
      startDate: selectedDate,
      endDate: selectedDate,
      services: [ 'example1', 'example2' ], 
    }
    
    axios
    .post(
      'http://192.168.1.13:8080/api2/appointmentsv2', 
      appointmentData,
      {
        "Access-Control-Allow-Origin": "*"
      }
    )
    .then((response) => {
      console.log(response.status, response.data.token);
    })
    .catch((err) => {
       console.log(err.message);
    });
  }

  return (
    <Box
      component="form"
      onSubmit={handleOnSubmit}
      sx={{
        background: '#',
        maxWidth: '80%',
        width: '800px',
        '& .MuiTextField-root': { m: 1, width: '100%' },
        margin: 'auto',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
      id="standard-basic"
      label="Imię"
      variant="standard"
      fullWidth
      value={personalData.imie}
      onChange={(e) => {
        const newValue = e.target.value;
        // Sprawdź, czy wartość zawiera tylko litery
        if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
          setPersonalData((prevData) => ({ ...prevData, imie: newValue }));
          setErrors((prevErrors) => ({ ...prevErrors, imie: '' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, imie: 'Imię może zawierać tylko litery' }));
        }
      }}
      error={Boolean(errors.imie)}
      helperText={errors.imie}
    />
  <TextField
  id="standard-basic"
  label="Nazwisko"
  variant="standard"
  fullWidth
  value={personalData.nazwisko}
  onChange={(e) => {
    const newValue = e.target.value;
    // Sprawdź, czy wartość zawiera tylko litery
    if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
      setPersonalData((prevData) => ({ ...prevData, nazwisko: newValue }));
      setErrors((prevErrors) => ({ ...prevErrors, nazwisko: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, nazwisko: 'Nazwisko może zawierać tylko litery' }));
    }
  }}
  error={Boolean(errors.nazwisko)}
  helperText={errors.nazwisko}
/>
      <TextField
  id="standard-basic"
  label="Numer Telefonu"
  variant="standard"
  fullWidth
  value={personalData.numerTelefonu}
  onChange={(e) => {
    // Sprawdź, czy wartość zaczyna się od "+48" i ma maksymalnie 12 znaków
    const newValue = e.target.value;
    if (newValue.startsWith('+48') && newValue.length <= 12) {
      setPersonalData((prevData) => ({ ...prevData, numerTelefonu: newValue }));
      setErrors((prevErrors) => ({ ...prevErrors, numerTelefonu: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, numerTelefonu: 'Nieprawidłowy numer telefonu' }));
    }
  }}
  error={Boolean(errors.numerTelefonu)}
  helperText={errors.numerTelefonu}
/>
      <TextField
        id="standard-basic"
        label="Adres Mailowy"
        variant="standard"
        fullWidth
        value={personalData.adresMailowy}
        onChange={(e) => setPersonalData((prevData) => ({ ...prevData, adresMailowy: e.target.value }))}
        error={Boolean(errors.adresMailowy)}
        helperText={errors.adresMailowy}
      />
      <TextField
        id="standard-basic"
        label="Miasto"
        variant="standard"
        fullWidth
        value={personalData.miasto}
        onChange={(e) => {
          const newValue = e.target.value;
          // Sprawdź, czy wartość zawiera tylko litery
          if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
            setPersonalData((prevData) => ({ ...prevData, miasto: newValue }));
            setErrors((prevErrors) => ({ ...prevErrors, miasto: '' }));
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, miasto: 'Miasto może zawierać tylko litery' }));
          }
        }}
        error={Boolean(errors.miasto)}
        helperText={errors.miasto}
      />
      <TextField
        id="standard-basic"
        label="Ulica"
        variant="standard"
        fullWidth
        value={personalData.ulica}
        onChange={(e) => setPersonalData((prevData) => ({ ...prevData, ulica: e.target.value }))}
        error={Boolean(errors.ulica)}
        helperText={errors.ulica}
      />
      <TextField
        id="standard-basic"
        label="Kod Pocztowy"
        variant="standard"
        fullWidth
        value={personalData.kodPocztowy}
        onChange={(e) => setPersonalData((prevData) => ({ ...prevData, kodPocztowy: e.target.value }))}
        error={Boolean(errors.kodPocztowy)}
        helperText={errors.kodPocztowy}
      />
      <Autocomplete
        multiple
        id="services"
        options={services}
        getOptionLabel={(option) => option.title}
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Usługi" variant="standard" fullWidth error={Boolean(errors.services)} helperText={errors.services} />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={plLocale}>
        <DatePicker
          label="Dzień"
          firstDayOfWeek={1}
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          renderInput={(props) => <TextField {...props} value={formatDate(selectedDate, 'dd.MM.yyyy')} />}
        />
        <TimePicker
          label="Godzina"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          renderInput={(props) => <TextField {...props} value={formatDate(selectedDate, 'HH:mm')} />}
        />
      </LocalizationProvider>
      <Button
        variant="success"
        type="submit"
        style={{ marginTop: '15px', marginRight: '10px' }}
      >
        Dodaj
      </Button>
      <Button
        variant="danger"
        onClick={handleCancel}
        style={{ marginTop: '15px' }}
      >
        Anuluj
      </Button>
    </Box>
  );
};

export default Form;