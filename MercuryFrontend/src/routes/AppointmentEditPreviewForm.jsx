import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import plLocale from 'date-fns/locale/pl';
import services from '../data/services';
// import parseDescription from '../handlers/longDescriptionHandler';
import dayjs from 'dayjs';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { StyledTextField } from '../Components/CustomStyledMUIComponents/StyledTextField';
import { StyledDateTimePicker } from '../Components/CustomStyledMUIComponents/StyledDateTimePicker';

export default function AppointmentEditPreviewForm({ onCloseModal, onConfirm, selectedEvent }) {
  const { t } = useTranslation();
  const appointmentsEndpoint = '/api/v1/appointments';

  const eightAM = dayjs().set('hour', 8).startOf('hour');
  const sixPM = dayjs().set('hour', 18).startOf('hour');

  const [errors, setErrors] = useState({});
  const [isLocked, setIsLocked] = useState(true); // Stan kłódki

  const [appointment, setAppointment] = useState({
    id: selectedEvent.id,
    email: selectedEvent.client.email,
    firstName: selectedEvent.client.firstName,
    lastName: selectedEvent.client.lastName,
    phoneNumber: selectedEvent.client.phoneNumber,
    event: selectedEvent.event,
    title: selectedEvent.event.title,
    description: selectedEvent.event.description,
    serviceType: selectedEvent.event.serviceType,
    realizationStartDate: selectedEvent.event.realizationStartDate,
    realizationEndDate: selectedEvent.event.realizationEndDate,
    streetName: selectedEvent.event.realizationPlace.streetName,
    houseNumber: selectedEvent.event.realizationPlace.houseNumber,
    apartmentNumber: selectedEvent.event.realizationPlace.apartmentNumber,
    cityName: selectedEvent.event.realizationPlace.cityName,
    zipCode: selectedEvent.event.realizationPlace.zipCode,
    allDay: selectedEvent.allDay,
    createdAtDate: selectedEvent.createdAtDate,
    createdBy: selectedEvent.createdBy,
    updatedAtDate: selectedEvent.updatedAtDate,
    lastUpdatedBy: selectedEvent.lastUpdatedBy
  });

  const handleChange = (e) => {
    console.log(e);
    if (e.target.name !== '' && e.target.name !== undefined) {
      setAppointment((prevState) => ({
        ...prevState,
        [e.target.getAttribute('name')]: e.target.value
      }));
    } else {
      console.log('setting service type');
      let valueToSet;
      if (e.target.lastChild.data === null) {
        valueToSet = '';
      } else {
        valueToSet = e.target.lastChild.data;
      }
      setAppointment((prevState) => ({ ...prevState, serviceType: valueToSet }));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = {
      client: {
        phoneNumber: appointment.client.phoneNumber,
        firstName: appointment.client.firstName,
        lastName: appointment.client.lastName,
        email: appointment.client.email
      },
      event: {
        title: appointment.event.title,
        description: appointment.event.description,
        realizationStartDate: appointment.event.realizationStartDate,
        realizationEndDate: appointment.event.realizationEndDate,
        realizationPlace: {
          cityName: appointment.event.realizationPlace.cityName,
          zipCode: appointment.event.realizationPlace.zipCode,
          streetName: appointment.event.realizationPlace.streetName,
          houseNumber: appointment.event.realizationPlace.houseNumber,
          apartmentNumber: appointment.event.realizationPlace.apartmentNumber
        },
        serviceType: appointment.event.serviceType
      },
      createdAtDate: appointment.createdAtDate,
      updatedAtDate: appointment.updatedAtDate,
      advisorId: appointment.lastUpdatedBy
    };

    axios
      // eslint-disable-next-line no-undef
      .post(process.env.REACT_APP_BACKEND_API_BASE_URL + appointmentsEndpoint, formData, {
        'Access-Control-Allow-Origin': '*'
      })
      .then((response) => {
        console.log(response);
        onConfirm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const toggleLock = () => {
    setIsLocked((prevIsLocked) => !prevIsLocked);
  };

  return (
    <Box
      id="editPreviewAppointmentForm"
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
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        columns={1}
        sx={{
          background: '#',
          width: '100%', // 80% szerokości okna przeglądarki
          height: '70%', // 90% wysokości okna przeglądarki
          padding: '10px', // Margines wewnętrzny

          '& .MuiTextField-root': { margin: 1, width: '100%' }
        }}>
        <Grid container justifyContent="space-around">
          <Grid item>
            <StyledTextField
              id="firstName"
              name="firstName"
              label={t('firstName')}
              variant="standard"
              fullWidth
              value={appointment.firstName}
              onChange={handleChange}
              disabled={isLocked} // Zablokowane pole
              error={Boolean(errors.imie)}
              helperText={errors.imie}
            />
          </Grid>
          <Grid item>
            <StyledTextField
              id="lastName"
              name="lastName"
              label={t('lastName')}
              variant="standard"
              fullWidth
              value={appointment.lastName}
              onChange={handleChange}
              disabled={isLocked} // Zablokowane pole
              error={Boolean(errors.nazwisko)}
              helperText={errors.nazwisko}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item>
            <StyledTextField
              id="phoneNumber"
              name="phoneNumber"
              label={t('phoneNumber')}
              variant="standard"
              fullWidth
              value={appointment.phoneNumber}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue.startsWith('+48') && newValue.length <= 12) {
                  handleChange(e); // setPersonalData((prevData) => ({ ...prevData, numerTelefonu: newValue }));
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
              disabled={isLocked} // Zablokowany przycisk
            />
          </Grid>
          <Grid item>
            <StyledTextField
              id="email"
              name="email"
              label={t('email')}
              variant="standard"
              fullWidth
              value={appointment.email}
              onChange={(e) => {
                handleChange(e); // setPersonalData((prevData) => ({ ...prevData, adresMailowy: e.target.value }))
              }}
              error={Boolean(errors.adresMailowy)}
              helperText={errors.adresMailowy}
              disabled={isLocked} // Zablokowany przycisk
            />
            <Grid item></Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item>
            <StyledTextField
              id="cityName"
              name="cityName"
              label={t('city')}
              variant="standard"
              fullWidth
              value={appointment.cityName}
              disabled={isLocked} // Zablokowany przycisk
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
                  handleChange(e); // setPersonalData((prevData) => ({ ...prevData, miasto: newValue }));
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
            <StyledTextField
              id="zipCode"
              name="zipCode"
              label={t('postalCode')}
              variant="standard"
              fullWidth
              value={appointment.zipCode}
              onChange={handleChange}
              error={Boolean(errors.kodPocztowy)}
              helperText={errors.kodPocztowy}
              disabled={isLocked} // Zablokowany przycisk
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="space-around">
          <Grid item>
            <StyledTextField
              id="streetName"
              name="streetName"
              label={t('Street name')}
              variant="standard"
              fullWidth
              value={appointment.streetName}
              onChange={handleChange}
              disabled={isLocked} // Zablokowane pole
              error={Boolean(errors.streetName)}
              helperText={errors.streetName}
            />
          </Grid>
          <Grid item>
            <StyledTextField
              id="houseNumber"
              name="houseNumber"
              label={t('House number')}
              variant="standard"
              fullWidth
              value={appointment.houseNumber}
              onChange={handleChange}
              disabled={isLocked} // Zablokowane pole
              error={Boolean(errors.houseNumber)}
              helperText={errors.houseNumber}
            />
          </Grid>
        </Grid>
        {/* Autocomplete - typ usługi */}
        <Grid container justifyContent="space-around">
          <Grid item width="50%">
            <Autocomplete
              disablePortal
              id="serviceType"
              name="serviceType"
              options={services}
              getOptionLabel={(option) => option.title || ''}
              value={services.find((option) => option.title === appointment.serviceType) || null}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              onChange={(e, newValue) => {
                setAppointment((prevState) => ({
                  ...prevState,
                  serviceType: newValue ? newValue.title : ''
                }));
              }}
              disabled={isLocked} // Zablokowane pole
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label={t('Service Type')}
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.serviceType)}
                  helperText={errors.serviceType}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around" columns={1}>
          <Grid item width="90%">
            <StyledTextField
              id="description"
              name="description"
              label={t('description')}
              value={appointment.description}
              onChange={handleChange}
              multiline={true}
              maxRows={4}
              variant="outlined"
              disabled={isLocked} // Zablokowany przycisk
            />
          </Grid>
        </Grid>

        {/* Data i czas */}
        <Grid container justifyContent="space-around" columns={2}>
          <LocalizationProvider
            id="localizationProvider"
            dateAdapter={AdapterDateFns}
            adapterLocale={plLocale}>
            <Grid item width="40%">
              <StyledDateTimePicker
                id="startDateTimePicker"
                name="realizationStartDate"
                label={t('Start time')}
                firstDayOfWeek={1}
                minTime={eightAM}
                value={new Date(appointment.realizationStartDate)}
                onChange={handleChange}
                disabled={isLocked} // Zablokowane pole
                format="dd.MM.yyyy HH:mm"
              />
            </Grid>
            <Grid item width="40%">
              <StyledDateTimePicker
                id="endDateTimePicker"
                name="realizationEndDate"
                label={t('End time')}
                firstDayOfWeek={1}
                maxTime={sixPM}
                value={new Date(appointment.realizationEndDate)}
                onChange={handleChange}
                disabled={isLocked} // Zablokowane pole
                format="dd.MM.yyyy HH:mm"
              />
            </Grid>
          </LocalizationProvider>
        </Grid>

        {/* Przycisk Zapisz */}
        <Grid container>
          <Grid item>
            <Button
              id="submitButton"
              variant="success"
              type="submit"
              style={{ marginTop: '10px', marginRight: '10px' }} // Tutaj jest 10px marginesu
              disabled={isLocked}>
              {t('Edit')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="cancelButton"
              variant="danger"
              onClick={onCloseModal}
              style={{ marginTop: '10px' }} // Zmieniono na 10px, aby zrównać z Edit
              disabled={false}>
              {t('Cancel')}
            </Button>
          </Grid>
        </Grid>

        {/* Ikona kłódki */}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              id="lockButton"
              onClick={toggleLock}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px'
              }}>
              {isLocked ? <LockIcon /> : <LockOpenIcon />}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

AppointmentEditPreviewForm.propTypes = {
  onCloseModal: PropTypes.func,
  onConfirm: PropTypes.func,
  selectedEvent: PropTypes.any
};
