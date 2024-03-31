import { formatDate } from '@fullcalendar/core';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { getEvents } from '../../redux/features/events';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getImageUrl } from '../../utils/helpers';
import { LoaderPage } from '../common/LoaderPage';

import placeholderImage from "../../assets/img/placeholder.png";

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
				<h2 className="page-heading">Feed Page</h2>
				<div className="col-group gap--md">
					{
						events ?
							events.map((event) => (
								<div className="feed-items" key={event._id}>
									<div className="feed-item col-group gap--sm">
										<div className="row-group gap--sm">
											<img src={event.task.img ? getImageUrl(event.task.img) : placeholderImage} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
											<span className="font-semibold text-lg">{event.task.title}</span>
										</div>
										<h4>{event.status}</h4>
										<div className="post-content col-group gap--xs">
											{formatDate(event.start, { hour: "numeric", minute: "numeric" })}
											{/* {formatDate(event.end)} */}
										</div>
										<div className="row-group gap--sm">
											<Link
												to={"/tasks/" + event.task._id ?? "error"}
												className="btn btn--xs btn--primary rounded"
												key={event.task._id}
											>
												View
											</Link>
											<Button classes='btn--xs btn--primary rounded'>Assign</Button>
											<Button classes='btn--xs btn--primary rounded'>Share</Button>
										</div>
									</div>
								</div>
							))
							:
							<p>Empty feed</p>
					}
				</div>
			</div>
		</section>
	);
};

