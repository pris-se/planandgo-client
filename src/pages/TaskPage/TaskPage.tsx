import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAll,
  getById,
  removeTask,
} from "../../redux/features/task/thunks/taskThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loader } from "../../components/Loader";
import { addTagLink } from "../../utils/tagsFilter";
import { Modal } from "../../components/modals/Modal";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/Button";
import placeholderImage from "../../assets/img/placeholder.png";
import { ReactComponent as BinIcon } from "../../assets/img/bin.svg";
import { CardsSwiper } from "../../components/CardsSwiper";
import { Input } from "../../components/ui/Input";
import { assignTask, getMe } from "../../redux/features/auth/authSlice";

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  const { task, isLoading, tasks } = useAppSelector((state) => state.task);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const role = useAppSelector((state) => state.auth.user?.role);
  const [modalShow, setModalShow] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const removeHandler = async () => {
    try {
      if (id) {
        const task = await dispatch(removeTask(id));
        if (task) {
          toast(task.payload.message);
          navigate("/tasks");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const assignTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    task?._id && data.append("id", task?._id);
    task?.title && data.append("title", task?.title);
    console.log(data.get("id"));
    console.log(data.get("title"));
    console.log(data.get("start"));
    console.log(data.get("end"));

    const assignedTask = await dispatch(assignTask(data));
    console.log(assignedTask);

    // if(assignedTask) {

    // }

    dispatch(getMe());
    setModalShow("");
  };

  useEffect(() => {
    if (id) {
      dispatch(getById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (task?.label && !isLoading) {
      dispatch(getAll(`?label=${task.label}`));
    } else if (!task?.label && !isLoading) {
      dispatch(getAll(""));
    }
  }, [task]);

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
                  <span className="label label--left label--success">Creator</span>
                )}
                <div className="image-big__bottom">
                  <span>
                    <span className="font-semibold">Average Duration: </span>
                    {task.duration} hours
                  </span>

                  <span>
                    <span className="font-semibold">Views: </span>
                    {task.views}
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
                <div className="flex items-center justify-between mt-auto pt-5">
                  <div className="row gutters w-full">
                    <div className="col-6">
                      <Button onClick={() => setModalShow("assign-to-me")}>
                        Assign to me
                      </Button>
                    </div>
                    <div className="col-6">
                    {(role === "admin" || userId === task.creator) && 
                      <Link
                        to={"/tasks/edit/" + task?._id ?? "error"}
                        className="btn btn--outline-primary radius w-full btn--md"
                      >
                        Edit
                      </Link>
                    } 
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

          <Modal
            id="assign-to-me"
            show={modalShow === "assign-to-me"}
            title={task.title}
            onClose={() => setModalShow("")}
          >
            <form onSubmit={assignTaskHandler}>
              <div className="popup-body">
                <p className="mb-3">When you whant to {task.title}</p>
                <div className="row">
                  {/* Start Time */}
                  <div className="col-6">
                    <Input
                      handler={(e) => console.log()}
                      value={Date.now().toString()}
                      title="Start Time"
                      type="datetime-local"
                      name="start"
                    />
                  </div>
                  {/* Ending time */}
                  <div className="col-6">
                    <Input
                      handler={(e) => console.log()}
                      value={""}
                      title="Ending time"
                      type="datetime-local"
                      name="end"
                    />
                  </div>
                </div>
              </div>
              <div className="popup-footer">
                <Button type="submit">Confirm</Button>
                <Button onClick={() => setModalShow("")}>Cancel</Button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};
