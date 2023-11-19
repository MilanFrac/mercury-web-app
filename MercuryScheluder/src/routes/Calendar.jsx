// CalendarComponent.js
import React, { Component } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import EventModal from "../Components/CalendarComponents/EventModal";
import AddEventModal from "./Modals/AddEventModal";

dayjs.locale("pl");

const localizer = dayjsLocalizer(dayjs);

class CalendarComponent extends Component {
  state = {
    newEvent: { title: "", start: new Date(), end: new Date() },
    allEvents: [],
    selectedEvent: null,
    isModalOpen: false,
    isResponsive: false
  };

  handleAddEvent = () => {
    const { newEvent, allEvents } = this.state;
    if (newEvent.title.trim() === "") {
      alert("Tytuł jest wymagany.");
      return;
    }
    this.setState({
      allEvents: [...allEvents, newEvent],
      newEvent: { title: "", start: new Date(), end: new Date() },
      isModalOpen: false
    });
  };

  handleEventClick = (event) => {
    this.setState({ selectedEvent: event });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleDoubleClickEvent = (event) => {
    this.setState({ selectedEvent: null });
    this.setState({ isModalOpen: true });
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

  render() {
    const { allEvents, selectedEvent, isModalOpen, isResponsive } = this.state;

    const dayFormat = isResponsive ? 'ddd' : 'dddd';

    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, margin: "50px", width: "100%" }}
          onSelectEvent={this.handleEventClick}
          onDoubleClickEvent={this.handleDoubleClickEvent}
          views={{
            month: true,
            week: true,
            day: true
          }}
          formats={{
            dayFormat: dayFormat,
          }}
          messages={{
            month: 'Miesiąc',
            week: 'Tydzień',
            day: 'Dzień',
            previous: '<',
            today: 'Dziś',
            next: '>'
          }}
        />
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            closeModal={this.closeEventDetails}
          />
        )}
        {isModalOpen && (
          <AddEventModal
            closeModal={this.closeModal}
            onSave={this.handleAddEvent}
          />
        )}
      </div>
    );
  }
}

export default CalendarComponent;
