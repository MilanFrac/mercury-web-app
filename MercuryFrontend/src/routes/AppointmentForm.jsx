import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'react-bootstrap/Button';
import plLocale from 'date-fns/locale/pl';
import axios from 'axios';
import services from '../data/services';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import parseDescription from '../handlers/longDescriptionHandler';
import dayjs from 'dayjs';

export default function AppointmentForm({
  onAddEvent,
  onCloseModal,
  selectedStartDate: initialDate,
  selectedEndDate: finalDate
}) {
  const { t } = useTranslation();
  const appointmentsEndpoint = '/api/v1/appointments';

  const [selectedStartDate, setSelectedStartDate] = useState(initialDate || new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(finalDate || new Date());
  const [personalData, setPersonalData] = useState({
    imie: '',
    nazwisko: '',
    numerTelefonu: '+48',
    adresMailowy: '',
    miasto: '',
    ulica: '',
    numerDomu: '',
    numerMieszkania: '',
    kodPocztowy: 'xx-xxx'
  });
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState(null);

  const [errors, setErrors] = useState({});

  const eightAM = dayjs().set('hour', 8).startOf('hour');
  const sixPM = dayjs().set('hour', 18).startOf('hour');

  // useEffect(() => {
  //   setSelectedStartDate(initialDate || new Date());
  //   setSelectedEndDate(finalDate || new Date());
  // }, [initialDate, finalDate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = {
      client: {
        phoneNumber: personalData.numerTelefonu,
        firstName: personalData.imie,
        lastName: personalData.nazwisko,
        email: personalData.adresMailowy
      },
      event: {
        title: serviceType.title,
        description: description,
        realizationStartDate: selectedStartDate,
        realizationEndDate: selectedEndDate,
        realizationPlace: {
          cityName: personalData.miasto,
          zipCode: personalData.kodPocztowy,
          streetName: personalData.ulica,
          houseNumber: personalData.numerDomu,
          apartmentNumber: personalData.numerMieszkania
        },
        serviceType: serviceType.title
      },
      createdAtDate: new Date(),
      updatedAtDate: new Date(),
      advisorId: 1
    };

    axios
      .post(process.env.REACT_APP_BACKEND_API_BASE_URL + appointmentsEndpoint, formData, {
        'Access-Control-Allow-Origin': '*'
      })
      .then((response) => {
        console.log(response.data);
        let data = [response.data];
        // Parse the response:
        const newEvent = data.map((appointment) => {
          let client = appointment.client;
          let event = appointment.event;
          let address = appointment.event.realizationPlace;
          let fullAddress = `${address.zipCode} ${address.cityName}, ${address.streetName} ${address.houseNumber}`;
          if (address.apartmentNumber !== '' || address.apartmentNumber !== null) {
            fullAddress += `/${address.apartmentNumber}`;
          }

          let desc = `${client.firstName};${client.lastName};${fullAddress};${client.phoneNumber};${event.serviceType};${new Date(event.realizationStartDate).toLocaleString('pl-PL')};${new Date(event.realizationEndDate).toLocaleString('pl-PL')};${event.description};`;

          return {
            ...appointment,
            allDay: false,
            title: `${appointment.event.title}#${appointment.id}`,
            description: parseDescription(desc),
            realizationStartDate: new Date(appointment.event.realizationStartDate),
            realizationEndDate: new Date(appointment.event.realizationEndDate)
          };
        });

        onAddEvent(newEvent[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });

    onCloseModal();
  };

  return (
    <Box
      id="addAppointmentForm"
      component="form"
      onSubmit={handleOnSubmit}

      sx={{
        background: '#',
        width: '100%', // 80% szerokości okna przeglądarki
        height: '70%', // 90% wysokości okna przeglądarki
        padding: '10px', // Margines wewnętrzny
        '& .MuiTextField-root': { margin: 1, width: '100%' }
      }}
      noValidate
      autoComplete="off">
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" columns={1}>
        <Grid container justifyContent="space-around">
          <Grid item>
            <TextField
              id="firstnameField"
              label={t('firstName')}
              variant="standard"
              fullWidth
              value={personalData.imie}
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
                  setPersonalData((prevData) => ({ ...prevData, imie: newValue }));
                  setErrors((prevErrors) => ({ ...prevErrors, imie: '' }));
                } else {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    imie: t('Name can contain only letters')
                  }));
                }
              }}
              error={Boolean(errors.imie)}
              helperText={errors.imie}
            />
          </Grid>
          <Grid item>
            <TextField
              id="lastnameField"
              label={t('lastName')}
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
                    nazwisko: t('Last name can contain only letters')
                  }));
                }
              }}
              error={Boolean(errors.nazwisko)}
              helperText={errors.nazwisko}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item>
            <TextField
              id="phoneNumberField"
              label={t('phoneNumber')}
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
                    numerTelefonu: t('Invalid phone number')
                  }));
                }
              }}
              error={Boolean(errors.numerTelefonu)}
              helperText={errors.numerTelefonu}
            />
          </Grid>
          <Grid item>
            <TextField
              id="emailField"
              label={t('email')}
              variant="standard"
              fullWidth
              value={personalData.adresMailowy}
              onChange={(e) =>
                setPersonalData((prevData) => ({ ...prevData, adresMailowy: e.target.value }))
              }
              error={Boolean(errors.adresMailowy)}
              helperText={errors.adresMailowy}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item>
            <TextField
              id="cityField"
              label={t('city')}
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
                    miasto: t('City name can contain only letters')
                  }));
                }
              }}
              error={Boolean(errors.miasto)}
              helperText={errors.miasto}
            />
          </Grid>
          <Grid item>
            <TextField
              id="postCodeField"
              label={t('postalCode')}
              variant="standard"
              fullWidth
              value={personalData.kodPocztowy}
              onChange={(e) =>
                setPersonalData((prevData) => ({ ...prevData, kodPocztowy: e.target.value }))
              }
              error={Boolean(errors.kodPocztowy)}
              helperText={errors.kodPocztowy}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around" columns={2}>
          <Grid item>
            <TextField
              id="streetField"
              label={t('street')}
              variant="standard"
              fullWidth
              value={personalData.ulica}
              onChange={(e) =>
                setPersonalData((prevData) => ({ ...prevData, ulica: e.target.value }))
              }
              error={Boolean(errors.ulica)}
              helperText={errors.ulica}
            />
          </Grid>
          <Grid item>
            <TextField
              id="houseNumberField"
              label={t('House number')}
              variant="standard"
              value={personalData.numerDomu}
              onChange={(e) =>
                setPersonalData((prevData) => ({ ...prevData, numerDomu: e.target.value }))
              }
              error={Boolean(errors.numerDomu)}
              helperText={errors.numerDomu}
            />
          </Grid>
          <Grid item width="50%">
            <TextField
              fullWidth
              id="apartmentNumberField"
              label={t('Apartment number')}
              variant="standard"
              value={personalData.numerMieszkania}
              onChange={(e) =>
                setPersonalData((prevData) => ({ ...prevData, numerMieszkania: e.target.value }))
              }
              error={Boolean(errors.numerMieszkania)}
              helperText={errors.numerMieszkania}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" columns={1}>
          <Grid item width="50%">
            <Autocomplete
              fullWidth
              multiple={false}
              id="serviceType"
              options={services}
              getOptionLabel={(option) => option.title}
              value={serviceType}
              onChange={(_, newValue) => setServiceType(newValue)}
              renderInput={(params) => (
                <TextField
                  id="serviceTypeField"
                  {...params}
                  label={t('Service')}
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.services)}
                  helperText={errors.services}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around" columns={1}>
          <Grid item width="90%">
            <TextField
              id="descriptionField"
              name="description"
              label={t('description')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline={true}
              maxRows={4}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" columns={2}>
          <LocalizationProvider
            id="localizationProvider"
            dateAdapter={AdapterDateFns}
            adapterLocale={plLocale}>
            <Grid item>
              <DateTimePicker
                id="startDateTimePicker"
                label={t('Start time')}
                firstDayOfWeek={1}
                minTime={eightAM}
                value={selectedStartDate}
                onChange={(date) => {
                  setSelectedStartDate(date);
                }}
                format="dd.MM.yyyy HH:mm"
              />
            </Grid>
            <Grid item>
              <DateTimePicker
                id="endDateTimePicker"
                label={t('End time')}
                firstDayOfWeek={1}
                maxTime={sixPM}
                value={selectedEndDate}
                onChange={(date) => {
                  setSelectedEndDate(date);
                }}
                format="dd.MM.yyyy HH:mm"
              />
            </Grid>
          </LocalizationProvider>
        </Grid>
        <Grid container>
          <Grid item>
            <Button
              id="submitButton"
              variant="success"
              type="submit"
              style={{ marginTop: '15px', marginRight: '10px' }}>
              {t('Add')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="cancelButton"
              variant="danger"
              onClick={() => {
                onCloseModal();
              }}
              style={{ marginTop: '15px' }}>
              {t('Cancel')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

AppointmentForm.propTypes = {
  onAddEvent: PropTypes.func,
  onCloseModal: PropTypes.func,
  setAllEvents: PropTypes.func,
  selectedStartDate: PropTypes.object,
  selectedEndDate: PropTypes.object
};
