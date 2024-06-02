import { useEffect, useState } from 'react'
import { Loader } from '../../components/Loader'
import { Button } from '../../components/ui/Button'
import { InputDate } from '../../components/ui/InputDate'
import { getEvents } from '../../redux/features/events'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import moment from 'moment'
import EventCard from '../../components/EventCard'
import { Event } from '../../interfaces'
import { compareDatesByDay } from '../../utils/time'



interface GroupedEvents {
    [date: string]: Event[];
}
const EventList = ({ events }: { events: Event[] }) => {
    const sortedEvents = [...events].sort((a, b) => +new Date(b.start).getTime() - +new Date(a.start).getTime());

    const groupedEvents: GroupedEvents = {};

    sortedEvents.forEach((event) => {
        const date = moment(event.start).format("h:mm a");
        if (!groupedEvents[date]) {
            groupedEvents[date] = [];
        }
        groupedEvents[date].push(event);
    });

    const today = new Date().toLocaleDateString();

    return (
        <>
            {Object.entries(groupedEvents).map(([date, events]) => (
                <div key={date}>
                    <h3 className='mb-4 color-gray-30'>{date === today ? 'Now' : date}</h3>
                    <div className='row row--lg w-full mb-5'>
                        {events.map((event, idx) => (
                            <div className='col-lg-6' key={idx}>
                                <EventCard event={event} />
                            </div>

                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export const EventsPage = () => {
    const dispatch = useAppDispatch()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const { events, isLoading } = useAppSelector(state => state.events)
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [nearestEventDate, setNearestEventDate] = useState<Date | null>(null);

    useEffect(() => {
        if (!events || !events.length || isLoading) return;
        const nearestDate = (events as Event[]).reduce((nearestDate: Date | null, event: Event) => {

            const eventDate = new Date(event.start);
            const timeToEvent = Math.abs(eventDate.getTime() - selectedDate.getTime())
            const timeToPreviosEvent = nearestDate ? Math.abs(nearestDate.getTime() - selectedDate.getTime()) : null


            if ((!timeToPreviosEvent || timeToEvent < timeToPreviosEvent) && selectedDate.getTime() < eventDate.getTime()) {
                return eventDate;
            }
            return nearestDate;
        }, null as Date | null);


        setNearestEventDate(nearestDate);

    }, [selectedDate, events, isLoading]);

    useEffect(() => {
        if (events) {
            const updatedEvents = events.filter(event => compareDatesByDay(new Date(event.start), selectedDate));
            setCurrentEvents(updatedEvents);
        }
    }, [selectedDate, events]);


    useEffect(() => {
        dispatch(getEvents())
        // dispatch(getEvents(`?start=${selectedDate.toISOString()}`))
    }, [])


    const renderDayContents = (dayOfMonth: number, date?: Date) => {
        const events = getEventsForDate(date);
        return (
            <>
                <div>{dayOfMonth}</div>
                {events.length > 0 && <div className='event-marker'></div>}
            </>
        );
    };

    const getEventsForDate = (date?: Date) => {
        if (!date) return []
        else return events.filter(event => compareDatesByDay(new Date(event.start), date))
    };

    return (
        <div className='section full-screen events-page'>
            <div className="container h-full">
                <div className="flex max-md:flex-col gap--md h-full">
                    <div className='w-[360px] min-w-[360px] mb-auto sticky top-0 pr-3 md:border-r border-border-color border-solid h-full mx-auto'>
                        <InputDate
                            inline
                            value={selectedDate}
                            onChange={date => date && setSelectedDate(date)}
                            renderDayContents={renderDayContents}
                            key={selectedDate.toString()}
                        />
                        <Button onClick={() => setSelectedDate(new Date())}>Today</Button>
                    </div>
                    <div className='flex-auto'>
                        <div className='md:overflow-auto w-full h-full'>
                            {
                                !isLoading ?
                                    <>
                                        {
                                            currentEvents.length ?
                                                // currentEvents.map((event) => (
                                                //     <div className="col-lg-6" key={event._id}>
                                                //         <EventCard event={event} />
                                                //     </div>
                                                // ))
                                                <EventList events={currentEvents} />
                                                :
                                                <div className='w-full full-center'>
                                                    <h2 className='mt-10 mx-auto'>There is no events</h2>
                                                    {
                                                        nearestEventDate ?
                                                            <>
                                                                <p className='mt-5 text-info'>Nearest event in {moment(nearestEventDate).format("DD MMM, YYYY")}</p>
                                                                <div className='mt-5 max-w-60'>
                                                                    <Button onClick={() => setSelectedDate(nearestEventDate)}>Go to {moment(nearestEventDate).format("DD MMM, YYYY")}</Button>
                                                                </div>
                                                            </>
                                                            : null
                                                    }
                                                </div>
                                        }
                                    </>
                                    :
                                    <Loader />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
