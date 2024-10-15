import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import AppointmentEditPreviewForm from './AppointmentEditPreviewForm'; // Import komponentu

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Pobieranie danych z backendu
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_API_BASE_URL + '/api/v1/appointments');
        const appointments = response.data._embedded.appointmentList.map((appointment) => {
          const address = appointment.event.realizationPlace;
          let fullAddress = `${address.zipCode} ${address.cityName}, ${address.streetName} ${address.houseNumber}`;
          if (address.apartmentNumber) {
            fullAddress += `/${address.apartmentNumber}`;
          }

          return {
            id: appointment.id,
            title: appointment.event.title,
            description: appointment.event.description,
            realizationStartDate: new Date(appointment.event.realizationStartDate).toISOString().slice(0, 16),
            realizationEndDate: new Date(appointment.event.realizationEndDate).toISOString().slice(0, 16),
            address: fullAddress,
            client: appointment.client,
            event: appointment.event
          };
        });

        setEvents(appointments);
      } catch (error) {
        console.error('Error while fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Funkcja usuwająca wydarzenie
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/appointments/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));  // Usuwamy wydarzenie z listy
      console.log('Event deleted:', eventId);
    } catch (error) {
      console.error('Error while deleting event:', error);
    }
  };

  // Funkcja otwierająca modal do edycji
  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  // Zamknięcie modala
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  // Zapisanie zmian i zamknięcie modala
  const handleConfirmEdit = () => {
    // Tu możesz dodać logikę zapisu zmian na serwerze, np. wywołanie axios.put
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <h2>Calendar Events</h2>

      {events.length === 0 ? (
        <p>No scheduled events</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Start Date</th>
              <th style={tableHeaderStyle}>End Date</th>
              <th style={tableHeaderStyle}>Location</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td style={tableCellStyle}>{event.title}</td>
                <td style={tableCellStyle}>{event.description}</td>
                <td style={tableCellStyle}>{event.realizationStartDate}</td>
                <td style={tableCellStyle}>{event.realizationEndDate}</td>
                <td style={tableCellStyle}>{event.address}</td>
                <td style={tableCellStyle}>
                  {/* Ikona edycji */}
                  <FontAwesomeIcon 
                    icon={faEdit} 
                    style={iconStyle} 
                    onClick={() => handleEdit(event)} 
                  />
                  {/* Ikona usuwania */}
                  <FontAwesomeIcon 
                    icon={faTrashAlt} 
                    style={iconStyle} 
                    onClick={() => handleDelete(event.id)} 
                  />
                  {/* Ikona koperty */}
                  <FontAwesomeIcon 
                    icon={faEnvelope} 
                    style={iconStyle} 
                    onClick={() => console.log('Sending message to:', event.id)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal do edycji */}
      <Modal open={isEditModalOpen} onClose={handleCloseModal}>
        <div style={modalStyle}>
          <AppointmentEditPreviewForm
            selectedEvent={selectedEvent}
            onCloseModal={handleCloseModal}
            onConfirm={handleConfirmEdit}
          />
        </div>
      </Modal>
    </div>
  );
}

// Stylizacja tabeli
const tableHeaderStyle = {
  borderBottom: '2px solid #ccc',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f8f8f8'
};

const tableCellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left'
};

const iconStyle = {
  marginRight: '15px',
  cursor: 'pointer',
  color: 'black',
  fontSize: '24px'
};

// Stylizacja modala
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  width: '80%',
  maxHeight: '80%',
  overflowY: 'auto'
};
