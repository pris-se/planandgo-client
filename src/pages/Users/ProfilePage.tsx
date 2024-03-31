import { formatDate } from "@fullcalendar/core";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Task, User } from "../../interfaces";
import { getUser } from "../../redux/features/users";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { LoaderPage } from "../common/LoaderPage";
import { UserTasksPage } from "./UserTasksPage";

import { ReactComponent as SettingsIcon } from "../../assets/img/gear.svg";
import placeholderImage from "../../assets/img/placeholder.png";


export const ProfilePage = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { me, isLoading } = useAppSelector((state) => state.profile);
    const { users } = useAppSelector((state) => state.users);
    const { tasks, isLoading: isTasksLoading } = useAppSelector(
        (state) => state.tasks
    );
    const [currentUser, setCurrentUser] = useState<null | User>(null);
    const [currentUserTasks, setCurrentUserTasks] = useState<Task[] | []>(id ? [] : tasks);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (currentUser) {
    //         const ids = events.map(event => event?.task).join("+") || []
    //         if (ids?.length) {
    //             dispatch(getByIds(ids)).unwrap().then(data => setCurrentUserTasks(data.tasks));
    //         } else {
    //             setCurrentUserTasks([])
    //         }
    //     }
    // }, [currentUser, id]);

    useEffect(() => {
        const cahedUser = users?.length ? users.find(user => user._id === id) : null;

        if (cahedUser) {
            setCurrentUser(cahedUser)
        }

        if (id !== me?._id && id && !cahedUser && !currentUser && !isLoading) {
            dispatch(getUser(id)).unwrap().then((data) => { setCurrentUser(data.user) })
        }
        if (me && id === me?._id) {
            setCurrentUser(me)
        }
        if (!id && !me) {
            navigate("/auth")
        }

    }, [id, me])

    if (isLoading) {
        return <LoaderPage />;
    }

    if (!currentUser && !isLoading) {
        return <p>User not exist</p>;
    }


    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="page-heading">
                        <h2 className="page-title">User Page</h2>
                    </div>
                    <div className="row row--md">
                        <div className="col-lg-4">
                            <div className="image-big">
                                <img
                                    className="w-full h-full"
                                    src={
                                        currentUser?.avatar
                                            ? process.env.REACT_APP_BASE_IMAGE_URL + currentUser?.avatar
                                            : placeholderImage
                                    }
                                    alt={currentUser?.username}
                                />
                                <span className="label">{currentUser?.role}</span>
                                <div className="image-big__bottom">
                                    {
                                        currentUser?.createdAt &&
                                        <span>
                                            <span className="font-semibold">Memger since: </span>
                                            {formatDate(
                                                new Date(currentUser?.createdAt),
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: 'numeric'
                                                }
                                            )}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="col-group h-full">
                                <div className="row-group justify-between mb-8">
                                    <h2>{currentUser?.username}</h2>
                                    {currentUser?._id === me?._id && (
                                        <Link to={"/settings"} className="btn btn--outline-danger btn--square btn--sm rounded">
                                            <SettingsIcon />
                                        </Link>
                                    )}
                                </div>
                                <p className="text-pretty">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                    qui officia deserunt mollit anim id est laborum,
                                </p>
                                {/* <div className="row-group justify-between mt-auto pt-5">
                                    <div className="row-group gap--xs w-full">
                                        <Button>Button</Button>
                                        <Button>Button</Button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            {/* <section className="section relative">
                <div className="container">
                    <h2 className="page-heading">Recently completed tasks</h2>
                    {
                        currentUserTasks?.length ?
                            <>
                                {!currentUserTasks : isTasksLoading ?
                                    <CardsSwiper
                                        tasks={currentUserTasks}
                                    /> : <Loader />}
                            </>
                            : <p>There is no tasks</p>
                    }
                </div>
            </section> */}
            {
                !isLoading && currentUser && currentUser._id ?
                    <UserTasksPage userId={currentUser._id} />
                    :
                    null
            }
        </>
    );
};


