import { useCallback, useState, useEffect, useContext } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import EventModal from '../Components/CalendarComponents/EventModal';
import { Modal } from 'react-bootstrap';
import AppointmentForm from './AppointmentForm';
import PropTypes from 'prop-types';
import axios from 'axios';
import i18n from '../data/i18n';
import { LanguageContext } from '../data/LanguageContext';

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isResponsive, setIsResponsive] = useState(false);
  const [events, setEvents] = useState([]);

  const language = useContext(LanguageContext);

  dayjs.locale(language);

  // const localizer = dayjsLocalizer(dayjs);

  const getAppointments = async () => {
    await axios
      // eslint-disable-next-line no-undef
      .get(process.env.REACT_APP_BACKEND_API_BASE_URL + '/api2/appointmentsv2')
      .then((response) => {
        const appointments = response.data._embedded.appointmentV2List.map((appointment) => {
          return {
            ...appointment,
            allDay: false,
            title: `${appointment.services}#${appointment.id}`,
            start: appointment.startDate,
            end: appointment.endDate
          };
        });
        setEvents(appointments);
        console.log(appointments);
        console.log(events[0]);
      });
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

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
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
      title: 'Majonez',
      description:
        'Niesamowity majonez umówiony na wizytę we wtorek na Kasprzaka 10/22 w Warszawie. Montaż',
      start: new Date(2024, 0, 17, 10, 30),
      end: new Date(2024, 0, 17, 12, 30)
    },
    {
      allDay: true,
      title: 'Musztarda',
      description:
        'Nie tak fajna musztarda chce zgłosić reklamację i umówiona na wizytę we wtorek na Sarniej 12/4 w Sopocie. Reklamacja',
      start: new Date(2024, 0, 18, 12, 30),
      end: new Date(2024, 0, 19, 12, 30)
    }
  ];

  return (
    <>
      <Calendar
        components={{
          event: CustomEvent
        }}
        localizer={localizer}
        events={sampleEvents}
        startAccessor="start"
        endAccessor="end"
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
          month: i18n.t('Month'),
          week: i18n.t('Week'),
          day: i18n.t('Day'),
          previous: '<',
          today: i18n.t('Today'),
          next: '>'
        }}
      />

      {isEventModalOpen && (
        <EventModal
          event={selectedEvent}
          onCloseModal={handleEventModalClose}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {isModalOpen && (
        <Modal show={isModalOpen} onHide={handleModalClose} dialogClassName={{ maxWidth: '70vw' }}>
          <Modal.Header closeButton>
            <Modal.Title>Create Event</Modal.Title>
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
