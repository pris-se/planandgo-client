import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "../assets/css/components/calendar.css";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

// const events = [
//   {
//     title: "Meeting",
//     start: new Date(),
//     end: new Date("2023-08-16"),
//     url: "/task",
//   },
// ];

interface IEvent {
  title: string;
  start: Date;
  end: Date;
  url?: string
}


export const Calendar = () => {

  const tasks = useAppSelector(state => state.auth.user?.tasks) || []
  const events:IEvent[] = tasks
  
  const navigate = useNavigate()
  
  return (
    <section className="section">
      <div className="container">
        <h2 className="page-heading">Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          firstDay={1}
          eventContent={renderEventContent}
          dateClick={(arg) => console.log(arg)}
          eventClick={({event}) => navigate(`/tasks/${event.id}`)}
        />
      </div>
    </section>
  );
};

function renderEventContent(eventInfo: any) {
  return (
    <div className="flex gap-1 px-1 py-1">
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
