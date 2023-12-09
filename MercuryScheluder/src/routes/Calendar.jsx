import React, { Component, useCallback } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import EventModal from "../Components/CalendarComponents/EventModal";

dayjs.locale("pl");

const localizer = dayjsLocalizer(dayjs);

class CalendarComponent extends Component {
  state = {
    allEvents: [],
    selectedEvent: null,
    isModalOpen: false,
    isResponsive: false
  };

  handleNoopClick = (slot) => {
    alert('You managed it!!! Bravissimo! <3 ' + slot.start);
    //this.setState({ isModalOpen: true });
  }

  handleEventClick = (event) => {
    this.setState({ selectedEvent: event });
    alert('You clicked on event!');
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <Calendar
          localizer={localizer}
          events={allEvents}
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
        {/* {isModalOpen && (
          <AddEventModal
            closeModal={this.closeModal}
            onSave={this.handleAddEvent}
          />
        )} */}
      </div>
    );
  }
}

export default CalendarComponent;
