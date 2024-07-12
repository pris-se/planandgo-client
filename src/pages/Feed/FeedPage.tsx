import { useEffect } from 'react';
import { getEvents } from '../../redux/features/events';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LoaderPage } from '../common/LoaderPage';

import EventCard from '../../components/EventCard';
import { Event } from '../../interfaces';
import moment, { duration } from 'moment';

interface GroupedEvents {
	[date: string]: Event[];
}

const EventList = ({ events }: { events: Event[] }) => {
	const sortedEvents = [...events].sort((a, b) => +new Date(b.end) - +new Date(a.end));

	const today = moment().format("DD MMM, yyyy");
	const yesterday = moment().subtract(1, 'days').format("DD MMM, yyyy")


	const groupedEvents: GroupedEvents = {};
	sortedEvents.forEach((event) => {
		const date = moment(event.end).format("DD MMM, yyyy");

		if (!groupedEvents[date]) {
			groupedEvents[date] = [];
		}
		if (+event.end > +moment()) {
			groupedEvents[today].push(event);
		} else {
			groupedEvents[date].push(event);
		}
	});


	return (
		<div>
			{Object.entries(groupedEvents).map(([date, events]) => (
				<div key={date}>
					<h3 className='mb-4 color-gray-30'>{date === today ? 'Today' : date === yesterday ? "Yesterday" : date}</h3>
					<div className='row row--lg mb-5'>
						{events.map((event, idx) => (
							<div className='col-xl-3 col-lg-4 col-sm-6' key={idx}>
								<EventCard event={event} />
							</div>

						))}
					</div>
				</div>
			))}
		</div>
	);
};

export const FeedPage = () => {
	const { events, isLoading } = useAppSelector(state => state.events)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getEvents())
	}, [dispatch])

	if (isLoading) {
		return <LoaderPage />
	}
	return (
		<section className='section'>
			<div className="container container-sm">
				<div className="page-heading">
					<h2 className='page-title'>Feed Page</h2>
				</div>

				<div className="row row--lg">
					{
						events ?
							<EventList events={events} />
							:
							<p>Empty feed</p>

					}
				</div>
			</div>
		</section>
	);
};

