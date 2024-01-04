// CalendarComponent.jsx
import React, { Component } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import EventModal from "../Components/CalendarComponents/EventModal";
import Form from "./Form";
import { Modal } from 'react-bootstrap';

dayjs.locale("pl");

const localizer = dayjsLocalizer(dayjs);

class CalendarComponent extends Component {
  state = {
    selectedEvent: null,
    isModalOpen: false,
    selectedDate: null,
    isResponsive: false,
  };

  handleEventClick = (event) => {
    this.setState({ selectedEvent: event });
  };

  handleNoopClick = (slot) => {
    this.setState({ isModalOpen: true, selectedDate: slot.start });
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
    console.log("Nowe wydarzenie:", newEvent);
  };

  handleConfirm = () => {
    this.closeModal();
  };

  render() {
    const { selectedEvent, isModalOpen, isResponsive, selectedDate } = this.state;

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
          events={[]} // Uwaga: tutaj powinny być przekazane wydarzenia, jeśli są dostępne
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
                selectedDate={selectedDate}
              />
            </Modal.Body>
          </Modal>
        )}
      </div>
    );
  }
}

export default CalendarComponent;
