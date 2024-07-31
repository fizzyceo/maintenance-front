import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

import { useRef } from "react";
import { useEffect } from "react";
import { Card, CardBody } from "reactstrap";

export default function CalendarBaseComponent(props) {
  const events = [
    {
      title: "event 1",
      // date: "2023-03-10",
      start: "2023-03-09",
      end: "2023-03-11",
      isMine: true,
      backgroundColor: "red",
    },
    { title: "event 2", date: "2023-03-11", isMine: false },
    {
      title: "Test",
      start: "2023-03-12T10:00:00",
      end: "2023-03-12T13:30:00",
      isMine: false,
    },
  ];

  const handleDateClick = (info) => {
    // console.log(info);
  };
  const handleEventClick = (info) => {
    // console.log(info);
  };

  const calendarRef = useRef();
  let calendarApi;
  useEffect(() => {
    calendarApi = calendarRef.current.getApi(); // Full Calendar Api ( Have Many Methods )
  }, []);
  return (
    <Card>
      <CardBody>
        <FullCalendar
          height={"auto"}
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          handleWindowResize={true}
          initialView="timeGrid"
          duration={{ days: 7 }}
          // Data Source
          events={events}
          // Custom Rendering event
          eventContent={renderEventContent}
          // Events
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          // editable={true}
          // droppable={true}
          // drop={onDrop}
          // selectable={true}
          // Customize HeadToolbar
          headerToolbar={{
            right: "prev,next today",
            center: "title",
            left: "",
          }}
          // customButtons={{}}
        />
      </CardBody>
    </Card>
  );
}

// Custom Rendering event
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.event.extendedProps?.isMine ? "My - " : "Others - "}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
