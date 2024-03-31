import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { EventContentArg, EventInput } from "@fullcalendar/core";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/components/calendar.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getEvents } from "../../redux/features/events/eventsThunk";

export const Calendar = () => {
	const { me, isLoading } = useAppSelector(state => state.profile)
	const { events, isLoading: isEventsLoading } = useAppSelector(state => state.events)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLoading && me?._id) {
			dispatch(getEvents(`?userId=${me._id}`))
		}
	}, [isLoading, me?._id])

	const calendarEvents: EventInput[] = useMemo(() => {
		return events.map(event => ({
			title: event.task.title,
			end: event.end,
			start: event.start,
			id: event.task._id,
			className: event.priority,
		}))
	}, [events])

	return (
		<section className="section calendar-page">
			<div className="container">
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					weekends={true}
					events={calendarEvents}
					firstDay={1}
					eventContent={renderEventContent}
					dateClick={(arg) => console.log(arg)}
					eventClick={({ event }) => navigate(`/tasks/${event.id}`)}

				/>
			</div>
		</section>
	);
};

function renderEventContent(eventInfo: EventContentArg) {
	return (
		<div className="flex gap-1 px-1 py-1 truncate">
			<b>{eventInfo.timeText}</b>
			<i className="flex-auto truncate">{eventInfo.event.title}</i>
		</div>
	);
}
