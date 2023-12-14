import React, { Component } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import EventModal from "../Components/CalendarComponents/EventModal";
import Form from "./Form";
import { Modal } from 'react-bootstrap';  // Importuj Modal z react-bootstrap

dayjs.locale("pl");

const localizer = dayjsLocalizer(dayjs);

class CalendarComponent extends Component {
  state = {
    allEvents: [],
    selectedEvent: null,
    isModalOpen: false,
    isResponsive: false,
  };

  handleNoopClick = (slot) => {
    this.setState({ isModalOpen: true, selectedDate: slot.start });
  };
  

  handleEventClick = (event) => {
    this.setState({ selectedEvent: event });
  };

  handleResize = () => {
    const { isResponsive } = this.state;
    const isWindowSmall = window.innerWidth <= 600;
    if (isWindowSmall && !isResponsive) {
      this.setState({ isResponsive: true });
    } else if (!isWindowSmall && isResponsive) {
      this.setState({ isResponsive: false });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleModalClose = () => {
    this.closeModal();
  };

  handleAddEventOutside = (newEvent) => {
    // Implementacja dodawania nowego wydarzenia
    console.log("Nowe wydarzenie:", newEvent);
  };

  handleConfirm = () => {
    // Implementacja potwierdzenia
    this.closeModal();
  };

  render() {
    const { selectedEvent, isModalOpen, isResponsive } = this.state;

    const dayFormat = isResponsive ? "ddd" : "dddd";

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, margin: "50px", width: "100%" }}
          onSelectEvent={this.handleEventClick}
          onDoubleClickEvent={this.handleDoubleClickEvent}
          onSelectSlot={this.handleNoopClick}
          selectable={true}
          views={{
            month: true,
            week: true,
            day: true,
          }}
          formats={{
            dayFormat: dayFormat,
          }}
          messages={{
            month: "Miesiąc",
            week: "Tydzień",
            day: "Dzień",
            previous: "<",
            today: "Dziś",
            next: ">",
          }}
        />
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            closeModal={this.closeModal}
          />
        )}
{isModalOpen && (
  <Modal show={isModalOpen} onHide={this.handleModalClose} dialogClassName={{ maxWidth: '70vw' }}>
    <Modal.Header closeButton>
      <Modal.Title>Utwórz zdarzenie</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form
        onAddEvent={this.handleAddEventOutside}
        onCloseModal={this.handleModalClose}
        onConfirm={this.handleConfirm}
        selectedDate={this.state.selectedDate} // Przekazanie wybranej daty do Form
      />
    </Modal.Body>
  </Modal>
)}

      </div>
    );
  }
}

export default CalendarComponent;
