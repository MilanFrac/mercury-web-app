import React, { useState, useEffect, useCallback, useContext } from 'react';
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
import AppointmentEditPreviewForm from './AppointmentEditPreviewForm';

// Definicja enum dla widoków kalendarza
export const CalendarViews = Object.freeze({
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day'
});

// Customowy komponent do wyświetlania zdarzeń w kalendarzu
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
  const [selectedEvent, setSelectedEvent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditPreviewModalOpen, setIsEditPreviewModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isResponsive, setIsResponsive] = useState(false);
  const [events, setEvents] = useState([]);
  const language = useContext(LanguageContext);

  // Ustawienie lokalizacji dla dayjs
  dayjs.locale(i18n.language);

  // Pobranie zdarzeń z backendu
  const getAppointments = async () => {
    let appointments = [];

    await axios
      .get(process.env.REACT_APP_BACKEND_API_BASE_URL + '/api/v1/appointments')
      .then((response) => {
        try {
          appointments = response.data._embedded.appointmentList.map((appointment) => {
            let client = appointment.client;
            let event = appointment.event;
            let address = appointment.event.realizationPlace;
            let fullAddress = `${address.zipCode} ${address.cityName}, ${address.streetName} ${address.houseNumber}`;
            if (address.apartmentNumber !== '') {
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
        } catch (err) {
          appointments = [];
        }
        setEvents(appointments);
      });
    return appointments;
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const dayFormat = isResponsive ? 'ddd' : 'dddd';

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEditPreviewModalOpen(true);
  };

  const handleNoopClick = useCallback(
    (slot) => {
      setIsModalOpen(true);
      setSelectedStartDate(slot.start);
      let endDate = new Date(slot.start);
      endDate.setHours(endDate.getHours() + 1);
      setSelectedEndDate(endDate);
    },
    [setIsModalOpen, setSelectedStartDate, setSelectedEndDate]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleAddEventOutside = useCallback(
    (newEvent) => {
      const newEvents = [...events, newEvent];
      setEvents(newEvents);
    },
    [events, setEvents]
  );

  const handleEditPreviewModalClose = () => {
    setIsEditPreviewModalOpen(false);
  };

  const handleDelete = (event) => {
    console.log('TODO: implement event deleting:', event);
  };

  const handleEdit = (event) => {
    console.log('TODO: implement event editing:', event);
  };

  const onShowMore = useCallback((events, date) => window.alert(date), []);

  return (
    <>
      <Calendar
        components={{
          event: CustomEvent
        }}
        localizer={localizer}
        events={events}
        startAccessor="realizationStartDate"
        endAccessor="realizationEndDate"
        tooltipAccessor="description"
        style={{ height: 700, margin: '50px', width: '100%' }}
        onSelectEvent={handleEventClick}
        onSelectSlot={handleNoopClick}
        onShowMore={onShowMore}
        selectable={true}
        views={{
          [CalendarViews.MONTH]: true,
          [CalendarViews.WEEK]: true,
          [CalendarViews.DAY]: true
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
        <Modal show={isModalOpen} onHide={handleModalClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{t('createEvent')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AppointmentForm
              onAddEvent={handleAddEventOutside}
              onCloseModal={handleModalClose}
              onConfirm={handleModalClose}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
            />
          </Modal.Body>
        </Modal>
      )}

      {isEditPreviewModalOpen && (
        <Modal show={isEditPreviewModalOpen} onHide={handleEditPreviewModalClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{t('Edit')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AppointmentEditPreviewForm
              onCloseModal={handleEditPreviewModalClose}
              onConfirm={handleEditPreviewModalClose}
              selectedEvent={selectedEvent}
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
