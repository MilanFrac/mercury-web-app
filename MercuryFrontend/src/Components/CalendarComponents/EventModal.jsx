import { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

export default function EventModal({ event, onCloseModal, onDelete, onEdit }) {
  const [modalPosition, setModalPosition] = useState(null);

  // TODO: Move to separate CSS file
  const buttonStyle = {
    marginRight: '10px',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  // TODO: Move to separate CSS file??
  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999
    },
    content: {
      top: modalPosition ? modalPosition.top : '50%',
      left: modalPosition ? modalPosition.left : '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      border: '1px solid #ccc',
      background: 'white',
      opacity: 1,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      maxWidth: '300px',
      minWidth: '200px',
      zIndex: 10000
    }
  };

  return (
    <Modal
      isOpen={!!event}
      onRequestClose={onCloseModal}
      contentLabel="Event Details"
      style={modalStyle}
      appElement={document.getElementById('root') || undefined}>
      {event && (
        <div>
          <h2>{event.title}</h2>
          <p>Start: {event.start.toString()}</p>
          <p>End: {event.end.toString()}</p>
          <p>Phone number: {event.phone.toString() || ''}</p>
          <p>
            Fullname: {event.firstName} {event.lastName}
          </p>
          <p>
            Address: {event.street} {event.zipCode} {event.city}
          </p>
          <button onClick={onCloseModal} style={{ ...buttonStyle, backgroundColor: 'green' }}>
            Close
          </button>
          <button
            onClick={() => onDelete(event)}
            style={{ ...buttonStyle, backgroundColor: 'red' }}>
            Delete
          </button>
          <button
            onClick={() => onEdit(event)}
            style={{ ...buttonStyle, backgroundColor: 'yellow' }}>
            Edit
          </button>
        </div>
      )}
    </Modal>
  );
}

// class EventModal extends React.Component {

//   componentDidUpdate(prevProps) {
//     if (!prevProps.event && this.props.event) {
//       // Oblicz pozycję modalu na podstawie pozycji wybranej daty
//       const selectedDatePosition = this.props.selectedDatePosition;
//       if (selectedDatePosition) {
//         const modalPosition = {
//           top: selectedDatePosition.top,
//           left: selectedDatePosition.left + selectedDatePosition.width + 10, // Dodałem odstęp od lewej strony daty
//         };
//         this.setModalPosition(modalPosition);
//       }
//     }
//   }

//   render() {
//     const { event, closeModal, onDelete, onEdit } = this.props;
//   }
// }

EventModal.propTypes = {
  event: PropTypes.object,
  onCloseModal: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};
