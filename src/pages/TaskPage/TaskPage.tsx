import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAll, getById, removeTask } from "../../redux/thunks/taskThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loader } from "../../components/Loader";
import { addTagLink } from "../../utils/tagsFilter";
import { Modal } from "../../components/modals/Modal";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/Button";
import placeholderImage from "../../assets/img/placeholder.png";
import { ReactComponent as BinIcon } from "../../assets/img/bin.svg";
import { CardsSwiper } from "../../components/CardsSwiper";
import { calcDuration, formatTime } from "../../utils/time";
import { AssignTaskModal } from "./AssignTaskModal";
import { Duration } from "../../components/Duration";

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  const { task, isLoading, tasks } = useAppSelector((state) => state.task);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const role = useAppSelector((state) => state.auth.user?.role);
  const events = useAppSelector((state) => state.auth.user?.tasks);
  const [modalShow, setModalShow] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const event = events?.filter((event) => event.id === task?._id);

  const removeHandler = async () => {
    try {
      if (id) {
        const task = await dispatch(removeTask(id));
        if (task) {
          toast(task.payload.message);
          navigate(-1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getById(id))
        .unwrap()
        .then((res) => dispatch(getAll(`?label=${res.task.label}`)));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }
  if (!task) {
    return <p>There is no tasks</p>;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <h2 className="page-heading">Task Page</h2>
          <div className="row gutters">
            <div className="col-lg-6">
              <div className="image-big">
                <img
                  className="w-full h-full"
                  src={
                    task?.img
                      ? process.env.REACT_APP_BASE_IMAGE_URL + task.img
                      : placeholderImage
                  }
                  alt={task?.title}
                />
                <span className="label">{task.label}</span>
                {userId === task.creator && (
                  <span className="label label--left label--success">
                    Creator
                  </span>
                )}
                <div className="image-big__bottom">
                  <span>
                    <span className="font-semibold">Average Duration: </span>
                    {task.usage && (
                      <Duration time={formatTime(task.duration / task.usage)} />
                    )}
                  </span>

                  <span>
                    <span className="font-semibold">Usage: </span>
                    {task.usage} times
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <h2>{task.title}</h2>
                  {(role === "admin" || userId === task.creator) && (
                    <Button
                      onClick={() => setModalShow("delete")}
                      classes="btn--outline-danger btn-icon--sm "
                    >
                      <BinIcon />
                    </Button>
                  )}
                </div>
                <p>
                  {addTagLink(task.description).map((str, idx) => {
                    if (str?.link) {
                      return (
                        <Link
                          className="tag"
                          to={{
                            pathname: "/tasks",
                            search: `tags=${str.link}`,
                          }}
                          key={idx}
                        >
                          {str.string}{" "}
                        </Link>
                      );
                    } else {
                      return str.string + " ";
                    }
                  })}
                </p>
                <ul className="pl-8">
                  {event?.map((event) => {
                    if (new Date(event.start) > new Date()) {
                      return (
                        <li className="list-disc" key={event._id}>
                          <p>
                            Time to task:{" "}
                            <Duration
                              time={formatTime(
                                calcDuration(new Date(), new Date(event.start))!
                              )}
                            />
                          </p>
                        </li>
                      );
                    } else return null;
                  })}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-5">
                  <div className="row gutters w-full">
                    <div className="col-6">
                      <Button onClick={() => setModalShow("assign-to-me")}>
                        Assign to me
                      </Button>
                    </div>
                    <div className="col-6">
                      {(role === "admin" || userId === task.creator) && (
                        <Link
                          to={"/tasks/edit/" + task?._id ?? "error"}
                          className="btn btn--outline-primary radius w-full btn--md"
                        >
                          Edit
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="section">
        <div className="container">
          <h2 className="page-heading">You may also like...</h2>
          <CardsSwiper tasks={tasks} />
        </div>
      </div>

      {modalShow && (
        <>
          <Modal
            id="delete"
            show={modalShow === "delete"}
            title="Delete Task"
            // show={modalShow}
            onClose={() => setModalShow("")}
          >
            <div>
              <p>Are you sure you want to delete {task.title} task</p>
              <div className="popup-footer">
                <Button onClick={removeHandler}>Delete</Button>
                <Button onClick={() => setModalShow("")}>Cancel</Button>
              </div>
            </div>
          </Modal>
          <AssignTaskModal modalShow="assign-to-me" task={task} />
        </>
      )}
    </>
  );
};
