import { useState, useEffect, useCallback, useContext } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import axios from 'axios';
import i18n from '../data/i18n';
import { LanguageContext } from '../data/LanguageContext';
import AppointmentForm from './AppointmentForm';
import parseDescription from '../handlers/longDescriptionHandler';

dayjs.locale(i18n);

export function CustomEvent(event) {
  return (
    <>
      <span>
        <strong>{event.title}</strong>
      </span>
      <br />
      <span>{event.description}</span>
    </>
  );
}

export default function AppointmentScheduler({ localizer = dayjsLocalizer(dayjs) }) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isResponsive, setIsResponsive] = useState(false);
  const [events, setEvents] = useState([]);
  const language = useContext(LanguageContext);

  dayjs.locale(i18n.language);

  const getAppointments = async () => {
    let appointments = [];

    await axios
      .get(process.env.REACT_APP_BACKEND_API_BASE_URL + '/api/v1/appointments')
      .then((response) => {
        appointments = response.data._embedded.appointmentList.map((appointment) => {
          let client = appointment.client;
          let event = appointment.event;
          let address = appointment.event.realizationPlace;
          let fullAddress = `${address.zipCode} ${address.cityName}, ${address.streetName} ${address.houseNumber}`;
          if (address.apartmentNumber !== '') {
            fullAddress += `/${address.apartmentNumber}`;
          }

          let desc = `${client.firstName};${client.lastName};${fullAddress};${client.phoneNumber};${event.serviceType};${event.realizationDate};${event.description};`;

          return {
            ...appointment,
            allDay: false,
            title: `${appointment.event.title}#${appointment.id}`,
            description: parseDescription(desc),
            realizationDate: appointment.event.realizationDate,
            end: appointment.event.realizationDate
          };
        });
        setEvents(appointments);
      });
    return appointments;
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const dayFormat = isResponsive ? 'ddd' : 'dddd';

  const handleEventClick = (event) => {
    setIsEventModalOpen(true);
    setSelectedEvent(event);
  };

  const handleNoopClick = (slot) => {
    setIsModalOpen(true);
    setSelectedDate(slot.start);
  };

  const handleResize = () => {
    setIsResponsive(this.state);
    const isWindowSmall = window.innerWidth <= 600;

    if (isWindowSmall && !{ isResponsive }) {
      setIsResponsive(true);
    } else if (!isWindowSmall && { isResponsive }) {
      setIsResponsive(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddEventOutside = (newEvent) => {
    console.log('New event:', newEvent);
  };

  const handleDelete = (event) => {
    console.log('TODO: implement event deleting:', event);
  };

  const handleEdit = (event) => {
    console.log('TODO: implement event editing:', event);
  };

  const onShowMore = useCallback((events, date) => window.alert(date), []);

  const sampleEvents = [
    {
      allDay: false,
      title: t('Instal-230'),
      description: parseDescription(
        'Jan;Brzoza;03-432 Gdańsk, ul. Akacjowa 21A/2;+48508273556;Montaż;2023-07-29;Opis przykładowy;'
      ),
      realizationDate: new Date(2024, 6, 27, 10, 30),
      end: new Date(2024, 6, 27, 11, 30)
    },
    {
      allDay: false,
      title: t('Combo-231'),
      description: parseDescription(
        'Jan;Brzoza;03-432 Gdańsk, ul. Akacjowa 21A/2;+48508273556;Montaż;2023-07-29;Opis przykładowy;'
      ),
      realizationDate: new Date(2024, 6, 28, 12, 30),
      end: new Date(2024, 6, 28, 13, 30)
    }
  ];

  return (
    <>
      <Calendar
        components={{
          event: CustomEvent
        }}
        localizer={localizer}
        events={events}
        startAccessor="realizationDate"
        endAccessor="realizationDate"
        tooltipAccessor="description"
        style={{ height: 700, margin: '50px', width: '100%' }}
        onSelectEvent={handleEventClick}
        onSelectSlot={handleNoopClick}
        onShowMore={onShowMore}
        selectable={true}
        views={{
          month: true,
          week: true,
          day: true
        }}
        formats={{
          dayFormat: dayFormat
        }}
        messages={{
          month: t('month'),
          week: t('week'),
          day: t('day'),
          previous: '<',
          today: t('today'),
          next: '>'
        }}
      />

      {isModalOpen && (
        <Modal show={isModalOpen} onHide={handleModalClose} dialogClassName={{ maxWidth: '80vw' }}>
          <Modal.Header closeButton>
            <Modal.Title>{t('createEvent')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AppointmentForm
              onAddEvent={handleAddEventOutside}
              onCloseModal={handleModalClose}
              onConfirm={handleModalClose}
              selectedDate={selectedDate}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

AppointmentScheduler.propTypes = {
  localizer: PropTypes.object
};

dayjs.locale();
