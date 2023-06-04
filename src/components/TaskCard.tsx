import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Task } from "../models/Task.model";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import { removeTask } from "../redux/features/task/thunks/taskThunks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "./ui/Button";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatTime } from "../utils/time";

import { ReactComponent as BinIcon } from "../assets/img/bin.svg";
import { ReactComponent as PenIcon } from "../assets/img/pen.svg";
import { addTagLink } from "../utils/tagsFilter";
import { Modal } from "./modals/Modal";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const state = useAppSelector((state) => state);
  const user = useAppSelector((state) => state.auth.user);
  const isAuth = checkIsAuth(state);
  const [modalShow, setModalShow] = useState(false)

  const dispatch = useAppDispatch();
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

  return (
    <>
      <div className="card">
        <div className="card-top">
          <div className="card-image">
              <img
                className="w-full h-full"
                src={
                  task?.img
                    ? process.env.REACT_APP_BASE_IMAGE_URL + task.img
                    : "/img/placeholder.png"
                }
                alt={task?.title}
              />
              <span className="label">{task.label}</span>
          </div>
        </div>
        <div className="card-body">
          <h3 className="card-title">{task.title}</h3>
          <p className="card-desc">{addTagLink(task.description).map((str, idx) => {
            if(str?.link) {
              return <Link className="tag" to={{
                search: `tags=${str.link}`
              }} key={idx}>{str.string} </Link> 
            } else {
              return str.string + " "
            }
          })}</p>
          <div className="flex justify-between mt-auto pt-3">
            <span>Duration: {formatTime(task.duration)}</span>
            <span>Views: {task.views}</span>
          </div>
        </div>
        <div className="card-footer">
          {!id && 
            <Link to={"/tasks/" + task._id ?? "error"} className="btn btn--primary radius w-full" key={task._id}>View Task</Link>
          }
          {isAuth && id && user?.role && user?.role === "admin" && (
          <>
            <Button onClick={() => setModalShow(true)}>
              <BinIcon />
            </Button>
            <Link
              to={"/tasks/edit/" + task?._id ?? "error"}
              className="btn btn--primary radius w-full"
            >
              <PenIcon />
            </Link>
          </>
        )}
        </div>
      </div>
      {
        modalShow && <Modal title="Delete Task" show={modalShow} onClose={() => setModalShow(false)}>
          <div>
            <p>
              Are you sure you want to delete {task.title} task
            </p>
            <div className="popup-footer">
                <Button onClick={removeHandler}>
                  Delete
                </Button>
                  <Button onClick={() => setModalShow(false)}>
                    Cancel
                  </Button>
            </div>
          </div>
        </Modal>
      }
    </>
  );
};
