import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker, plPL } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';
import plLocale from 'date-fns/locale/pl';
import axios from 'axios';

const Form = ({ onAddEvent, onCloseModal, setAllEvents, selectedDate: initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());

  const [personalData, setPersonalData] = useState({
    imie: '',
    nazwisko: '',
    numerTelefonu: '+48',
    adresMailowy: '',
    miasto: '',
    ulica: '',
    kodPocztowy: 'xx-xxx',
  });

  const [value, setValue] = React.useState([]);
  const [errors, setErrors] = useState({});

  const services = [
    { title: 'Montaż' },
    { title: 'Reklamacja' },
    { title: 'Pomiar' },
  ];

  useEffect(() => {
    setSelectedDate(initialDate || new Date());
  }, [initialDate]);

  const formatDate = (date, formatString) => format(date, formatString, { locale: plLocale });

  const handleAddEvent = () => {
    const newEvent = {
      title: value.map((service) => service.title).join(', '),
      start: selectedDate,
      end: selectedDate,
      ...personalData,
    };

    onAddEvent(newEvent);

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
      services: value.map(service => service.title),
    };

    axios
      .post(
        'http://169.254.62.204:8080/api2/appointmentsv2',
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
  };

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
       <TextField
          id="standard-multiline-flexible"
          label="Opis"
          
          multiline
          maxRows={4}
          variant="standard"
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