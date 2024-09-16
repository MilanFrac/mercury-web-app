import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import plLocale from 'date-fns/locale/pl';
import services from '../data/services';
import parseDescription from '../handlers/longDescriptionHandler';
import dayjs from 'dayjs';

export default function AppointmentEditPreviewForm({ onCloseModal, onConfirm, selectedEvent }) {
  const { t } = useTranslation();
  const appointmentsEndpoint = '/api/v1/appointments';

  const eightAM = dayjs().set('hour', 8).startOf('hour');
  const sixPM = dayjs().set('hour', 18).startOf('hour');

  const [errors, setErrors] = useState({});

  // const [tempEvent, setTempEvent] = useState(selectedEvent);
  //DEBUG: console.log(selectedEvent);

  const [appointment, setAppointment] = useState({
    id: selectedEvent.id,
    // client:
    email: selectedEvent.client.email,
    firstName: selectedEvent.client.firstName,
    lastName: selectedEvent.client.lastName,
    phoneNumber: selectedEvent.client.phoneNumber,
    // event:
    event: selectedEvent.event,
    title: selectedEvent.event.title,
    description: selectedEvent.event.description,
    serviceType: selectedEvent.event.serviceType,
    realizationStartDate: selectedEvent.event.realizationStartDate,
    realizationEndDate: selectedEvent.event.realizationEndDate,
    // event.realizationPlace:
    streetName: selectedEvent.event.realizationPlace.streetName,
    houseNumber: selectedEvent.event.realizationPlace.houseNumber,
    apartmentNumber: selectedEvent.event.realizationPlace.apartmentNumber,
    cityName: selectedEvent.event.realizationPlace.cityName,
    zipCode: selectedEvent.event.realizationPlace.zipCode,
    // rest info...
    allDay: selectedEvent.allDay,
    createdAtDate: selectedEvent.createdAtDate,
    createdBy: selectedEvent.createdBy,
    updatedAtDate: selectedEvent.updatedAtDate,
    lastUpdatedBy: selectedEvent.lastUpdatedBy // FEATURE TO BE UPGRADED
    // title: selectedEvent.title,
    // description: selectedEvent.description,
    // realizationStartDate: selectedEvent.realizationStartDate,
    // realizationEndDate: selectedEvent.realizationEndDate
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

  /*
  const [personalData, setPersonalData] = useState({
    imie: tempEvent?.client?.firstName,
    nazwisko: tempEvent?.client?.lastName,
    numerTelefonu: tempEvent?.client?.phoneNumber,
    adresMailowy: tempEvent?.client?.email,
    miasto: tempEvent?.event?.realizationPlace?.cityName,
    ulica: tempEvent?.event?.realizationPlace?.streetName,
    numerDomu: tempEvent?.event?.realizationPlace?.houseNumber,
    numerMieszkania: tempEvent?.event?.realizationPlace?.apartmentNumber,
    kodPocztowy: tempEvent?.event?.realizationPlace?.zipCode
  });

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [description, setDescription] = useState(tempEvent?.event?.description);
  const [serviceType, setServiceType] = useState({ title: `${tempEvent?.event?.serviceType}` });
  */

  const onEditEvent = (e) => {
    console.log(`Event edited: ${e}`);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement edition of appointment on submit

    const formData = {
      client: {
        phoneNumber: appointment.client.phoneNumber, // personalData.numerTelefonu,
        firstName: appointment.client.firstName, // personalData.imie,
        lastName: appointment.client.lastName, // personalData.nazwisko,
        email: appointment.client.email // personalData.adresMailowy
      },
      event: {
        title: appointment.event.title, // selectedEvent.serviceType.title,
        description: appointment.event.description, // selectedEvent.description,
        realizationStartDate: appointment.event.realizationStartDate, // selectedEvent.selectedStartDate,
        realizationEndDate: appointment.event.realizationEndDate, // selectedEvent.selectedEndDate,
        realizationPlace: {
          cityName: appointment.event.realizationPlace.cityName, // personalData.miasto,
          zipCode: appointment.event.realizationPlace.zipCode, // personalData.kodPocztowy,
          streetName: appointment.event.realizationPlace.streetName, // personalData.ulica,
          houseNumber: appointment.event.realizationPlace.houseNumber, // personalData.numerDomu,
          apartmentNumber: appointment.event.realizationPlace.apartmentNumber // personalData.numerMieszkania
        },
        serviceType: appointment.event.serviceType // selectedEvent.serviceType.title
      },
      createdAtDate: appointment.createdAtDate,
      updatedAtDate: appointment.updatedAtDate,
      advisorId: appointment.lastUpdatedBy
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

        onEditEvent(newEvent[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });

    onConfirm();
  };

  return (
    <Box
      id="editPreviewAppointmentForm"
      component="form"
      onSubmit={handleOnSubmit}
      sx={{
        background: '#',
        '& .MuiTextField-root': { margin: 1, marginRight: 0, width: '100%' }
      }}
      noValidate
      autoComplete="off">
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" columns={1}>
        <Grid container justifyContent="space-around">
          <Grid item>
            <TextField
              id="firstName"
              name="firstName"
              label={t('firstName')}
              variant="standard"
              fullWidth
              value={appointment.firstName}
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
                  handleChange(e); // setPersonalData((prevData) => ({ ...prevData, imie: newValue }));
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
              id="lastName"
              name="lastName"
              label={t('lastName')}
              variant="standard"
              fullWidth
              value={appointment.lastName}
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/.test(newValue)) {
                  handleChange(e); // setPersonalData((prevData) => ({ ...prevData, nazwisko: newValue }));
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
            />
          </Grid>
          <Grid item>
            <TextField
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
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item>
            <TextField
              id="cityName"
              name="cityName"
              label={t('city')}
              variant="standard"
              fullWidth
              value={appointment.cityName}
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
            <TextField
              id="zipCode"
              name="zipCode"
              label={t('postalCode')}
              variant="standard"
              fullWidth
              value={appointment.zipCode}
              onChange={handleChange}
              error={Boolean(errors.kodPocztowy)}
              helperText={errors.kodPocztowy}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around" columns={2}>
          <Grid item>
            <TextField
              id="streetName"
              name="streetName"
              label={t('street')}
              variant="standard"
              fullWidth
              value={appointment.streetName}
              onChange={(e) => {
                handleChange(e); // setPersonalData((prevData) => ({ ...prevData, ulica: e.target.value }))
              }}
              error={Boolean(errors.ulica)}
              helperText={errors.ulica}
            />
          </Grid>
          <Grid item>
            <TextField
              id="houseNumber"
              name="houseNumber"
              label={t('House number')}
              variant="standard"
              value={appointment.houseNumber}
              onChange={(e) => {
                handleChange(e); // setPersonalData((prevData) => ({ ...prevData, numerDomu: e.target.value }))
              }}
              error={Boolean(errors.numerDomu)}
              helperText={errors.numerDomu}
            />
          </Grid>
          <Grid item width="50%">
            <TextField
              fullWidth
              id="apartmentNumber"
              name="apartmentNumber"
              label={t('Apartment number')}
              variant="standard"
              value={appointment.apartmentNumber}
              onChange={handleChange}
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
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={{ title: appointment.serviceType }}
              onChange={(_) => handleChange(_)}
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
              id="description"
              name="description"
              label={t('description')}
              value={appointment.description}
              onChange={handleChange}
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
                name="realizationStartDate"
                label={t('Start time')}
                firstDayOfWeek={1}
                minTime={eightAM}
                value={new Date(appointment.realizationStartDate)}
                onChange={handleChange}
                format="dd.MM.yyyy HH:mm"
              />
            </Grid>
            <Grid item>
              <DateTimePicker
                id="endDateTimePicker"
                name="realizationEndDate"
                label={t('End time')}
                firstDayOfWeek={1}
                maxTime={sixPM}
                value={new Date(appointment.realizationEndDate)}
                onChange={handleChange}
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
              {t('Edit')}
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

AppointmentEditPreviewForm.propTypes = {
  onCloseModal: PropTypes.func,
  onConfirm: PropTypes.func,
  selectedEvent: PropTypes.any
};
