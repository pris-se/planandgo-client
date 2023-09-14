import React, { FormEvent, useEffect, useState } from "react";
import { Modal } from "../../components/modals/Modal";
import { Button } from "../../components/ui/Button";
import { InputDate } from "../../components/ui/InputDate";
import { ITask } from "../../models/Task.model";
import { calcDuration, formatTime } from "../../utils/time";
import { assignTask, getMe } from "../../redux/thunks/authThunk";
import { toast } from "react-toastify";
import { IEvent } from "../../models/User.model";
import { useAppDispatch } from "../../redux/hooks";
import { Duration } from "../../components/Duration";
import { useNavigate } from "react-router-dom";

interface IProps {
  task: ITask;
  modalShow: string;
}

export const AssignTaskModal = ({ task, modalShow }: IProps) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(modalShow);
  const [duration, setDuration] = useState<number>(task.duration);
  const [date, setDate] = useState({ start: new Date(), end: new Date(new Date().getTime() + task.duration / task.usage) });

  const navigate = useNavigate()
  useEffect(() => {
    const duration = calcDuration(date.start, date.end);
    console.log(date);
    if (duration) {
      setDuration(duration);
      console.log("duration", duration);
      
    }
  }, [date]);

  const assignTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    task?._id && formData.append("id", task?._id);
    task?.title && formData.append("title", task?.title);
    const duration = calcDuration(date.start, date.end);
    duration && formData.append("duration", duration.toString());

    if (duration && duration > 0) {
      const assignedTask = await dispatch(assignTask(formData));
      console.log(assignedTask);
      dispatch(getMe());
      navigate("/calendar")
    } else {
      toast("Durration must be > 0");
    }
  };

  return (
    <Modal
      id="assign-to-me"
      show={isVisible === "assign-to-me"}
      title={task.title}
      onClose={() => setIsVisible("")}
    >
      <form onSubmit={assignTaskHandler}>
        <div className="popup-body">
          <p className="mb-3">When you whant to {task.title}</p>
          <div className="row">
            {/* Start Time */}
            <div className="col-6">
              <InputDate
                title="Select start date"
                value={date.start}
                name="start"
                handler={(date) =>
                  setDate((prev) => ({ ...prev, start: date }))
                }
              />
            </div>
            {/* Ending time */}
            <div className="col-6">
              <InputDate
                title="Select end date"
                name="end"
                value={date.end}
                handler={(date) => setDate((prev) => ({ ...prev, end: date }))}
                minDate={date.start}
                minTime={date.start}
                maxTime={new Date(new Date().setHours(23, 59))}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="-mt-2 mb-3 text-info">
                Estimated Time: {" "}
                <Duration time={formatTime(duration)} />
              </p>
            </div>
          </div>
        </div>
        <div className="popup-footer">
          <Button type="submit">Confirm</Button>
          <Button onClick={() => setIsVisible("")}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
};
