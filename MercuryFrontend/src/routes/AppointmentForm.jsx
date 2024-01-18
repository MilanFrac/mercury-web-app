import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'react-bootstrap/Button';
import plLocale from 'date-fns/locale/pl';
import axios from 'axios';
import services from '../data/services';
import PropTypes from 'prop-types';

export default function AppointmentForm({
  onAddEvent,
  onCloseModal,
  setAllEvents,
  selectedDate: initialDate
}) {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [personalData, setPersonalData] = useState({
    imie: '',
    nazwisko: '',
    numerTelefonu: '+48',
    adresMailowy: '',
    miasto: '',
    ulica: '',
    kodPocztowy: 'xx-xxx'
  });

  const [value, setValue] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setSelectedDate(initialDate || new Date());
  }, [initialDate]);

  const handleAddEvent = () => {
    const newEvent = {
      title: value.map((service) => service.title).join(', '),
      start: selectedDate,
      end: selectedDate,
      ...personalData
    };

    onAddEvent(newEvent);

    setAllEvents?.((prevEvents) => [...prevEvents, newEvent]);

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
      services: value.map((service) => service.title)
    };

    axios
      // eslint-disable-next-line no-undef
      .post(process.env.REACT_APP_BACKEND_API_BASE_URL + '/api2/appointmentsv2', appointmentData, {
        'Access-Control-Allow-Origin': '*'
      })
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
        margin: 'auto'
      }}
      noValidate
      autoComplete="off">
      <TextField
        id="firstnameField"
        label="First name"
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
        id="lastnameField"
        label="Last name"
        variant="standard"
        fullWidth
        value={personalData.nazwisko}
        onChange={(e) => {
          const newValue = e.target.value;
          if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
            setPersonalData((prevData) => ({ ...prevData, nazwisko: newValue }));
            setErrors((prevErrors) => ({ ...prevErrors, nazwisko: '' }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              nazwisko: 'Nazwisko może zawierać tylko litery'
            }));
          }
        }}
        error={Boolean(errors.nazwisko)}
        helperText={errors.nazwisko}
      />
      <TextField
        id="phoneNumberField"
        label="Phone number"
        variant="standard"
        fullWidth
        value={personalData.numerTelefonu}
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue.startsWith('+48') && newValue.length <= 12) {
            setPersonalData((prevData) => ({ ...prevData, numerTelefonu: newValue }));
            setErrors((prevErrors) => ({ ...prevErrors, numerTelefonu: '' }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              numerTelefonu: 'Invalid phone number'
            }));
          }
        }}
        error={Boolean(errors.numerTelefonu)}
        helperText={errors.numerTelefonu}
      />
      <TextField
        id="emailField"
        label="Email"
        variant="standard"
        fullWidth
        value={personalData.adresMailowy}
        onChange={(e) =>
          setPersonalData((prevData) => ({ ...prevData, adresMailowy: e.target.value }))
        }
        error={Boolean(errors.adresMailowy)}
        helperText={errors.adresMailowy}
      />
      <TextField
        id="cityField"
        label="City"
        variant="standard"
        fullWidth
        value={personalData.miasto}
        onChange={(e) => {
          const newValue = e.target.value;
          if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
            setPersonalData((prevData) => ({ ...prevData, miasto: newValue }));
            setErrors((prevErrors) => ({ ...prevErrors, miasto: '' }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              miasto: 'City name can contain only letters'
            }));
          }
        }}
        error={Boolean(errors.miasto)}
        helperText={errors.miasto}
      />
      <TextField
        id="streetField"
        label="Street"
        variant="standard"
        fullWidth
        value={personalData.ulica}
        onChange={(e) => setPersonalData((prevData) => ({ ...prevData, ulica: e.target.value }))}
        error={Boolean(errors.ulica)}
        helperText={errors.ulica}
      />
      <TextField
        id="postCodeField"
        label="Post code"
        variant="standard"
        fullWidth
        value={personalData.kodPocztowy}
        onChange={(e) =>
          setPersonalData((prevData) => ({ ...prevData, kodPocztowy: e.target.value }))
        }
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
          <TextField
            id="servicesField"
            {...params}
            label="Services"
            variant="standard"
            fullWidth
            error={Boolean(errors.services)}
            helperText={errors.services}
          />
        )}
      />
      <TextField
        id="descriptionField"
        label="Description"
        multiline={true}
        maxRows={4}
        variant="outlined"
      />
      <LocalizationProvider
        id="localizationProvider"
        dateAdapter={AdapterDateFns}
        adapterLocale={plLocale}>
        <DatePicker
          id="datePicker"
          label="Day"
          firstDayOfWeek={1}
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          format="dd.MM.yyyy"
        />
        <TimePicker
          id="timePicker"
          label="Time"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          format="HH:mm"
        />
      </LocalizationProvider>
      <Button
        id="submitButton"
        variant="success"
        type="submit"
        style={{ marginTop: '15px', marginRight: '10px' }}>
        Add
      </Button>
      <Button
        id="cancelButton"
        variant="danger"
        onClick={onCloseModal}
        style={{ marginTop: '15px' }}>
        Cancel
      </Button>
    </Box>
  );
}

AppointmentForm.propTypes = {
  onAddEvent: PropTypes.func,
  onCloseModal: PropTypes.func,
  setAllEvents: PropTypes.func,
  selectedDate: PropTypes.object
};