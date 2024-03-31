import { formatDate } from '@fullcalendar/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { Button } from '../../components/ui/Button'
import { InputDate } from '../../components/ui/InputDate'
import { getEvents } from '../../redux/features/events'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getImageUrl } from '../../utils/helpers'

import placeholderImage from "../../assets/img/placeholder.png"

export const EventsPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const { events, isLoading } = useAppSelector(state => state.events)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getEvents(`?start=${currentDate.toISOString()}`))
    }, [currentDate])

    useEffect(() => {
        console.log(currentDate);

    }, [currentDate])


    return (
        <div className='section full-screen events-page'>
            <div className="container h-full">
                <div className="flex gap--md h-full overflow-auto">
                    <div className='w-[360px] min-w-[360px] mb-auto sticky top-0 pr-3 border-r border-border-color border-solid h-full'>
                        <InputDate
                            title={''}
                            inline
                            onChange={date => date && setCurrentDate(date)}
                        />
                    </div>
                    {
                        !isLoading ?
                            <div className="col-group gap--md flex-auto">
                                {
                                    events.length ?
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
                                        <p className='py-10 m-auto'>Empty feed</p>
                                }
                            </div>
                            :
                            <Loader />
                    }
                </div>
            </div>
        </div>
    )
}
