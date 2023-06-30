import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { labels } from "../../data/data";
import { formatTime, calcDuration } from "../../utils/time";
import { ITask } from "../../models/Task.model";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { tagsFilter } from "../../utils/tagsFilter";
import { Loader } from "../../components/Loader";
import { generateTaskImage } from "../../redux/features/task/thunks/taskThunks";
import { ErrorPage } from "../ErrorPage";
import { clearGanerated } from "../../redux/features/task/slices/taskSlice";

interface TaskFormProps {
  task?: ITask | null;
  submitHandler: (data: FormData) => any;
}

const getCurrentDate = (date: Date): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  date.setSeconds(0, 0);
  const isoString = date.toISOString().slice(0, -1);
  return isoString;
};

export const TaskForm = ({ task, submitHandler }: TaskFormProps) => {
  const { isLoading, error, generated } = useAppSelector((state) => state.task);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [label, setLabel] = useState(task?.label || "Other");
  const [newImage, setNewImage] = useState<File | string>("");
  const [startTime, setStartTime] = useState(getCurrentDate(new Date()));
  const [endTime, setEndTime] = useState(
    (task?.duration &&
      getCurrentDate(new Date(Date.now() + task.duration * 60000))) ||
      ""
  );

  const [prompt, setPrompt] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitTaskHandler = async () => {
    try {
      const filteredTags = tagsFilter(description);

      const data = new FormData();
      task?._id && data.append("id", task?._id);
      data.append("title", title);
      data.append("description", description);
      data.append("duration", calcDuration(startTime, endTime).toString());
      data.append("label", label);
      generated && data.append("image", generated);
      newImage && data.append("image", newImage);
      data.append("tags", JSON.stringify(filteredTags));

      const newtask = await dispatch(submitHandler(data));

      if (newtask && !isLoading) {
        navigate("/tasks/" + newtask?.payload.task._id ?? "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateHandler = () => {
    if(prompt.length > 3) {
      console.log(prompt);
      const data = new FormData();
      data.append("prompt", prompt);
      dispatch(generateTaskImage(data))
    }
  }
  useEffect(() => {
    console.log(generated);
    setNewImage("")
    return () => {
      dispatch(clearGanerated())
      
    }
  }, [generated]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage message={error}  />;
  }

  return (
    <form className="form-group" onSubmit={(e) => e.preventDefault()}>
      <div className="row">
        <div className="col-12">
          <label className="form-group w-full cursor-pointer text-center mb-4">
            <div className="upload-image mb-2">
              {!generated && !newImage && task?.img && (
                <img
                  src={
                    task.img
                      ? process.env.REACT_APP_BASE_IMAGE_URL! + task.img
                      : "../../img/placeholder.png"
                  }
                  alt={task.img ? task.img.toString() : "placeholder"}
                />
              )}
              {generated && (
                <img
                  src={(generated && typeof generated == "string") ? generated : ""}
                  alt={prompt}
                />
              )}
              {newImage && (
                <img
                  src={
                    newImage
                      ? URL.createObjectURL(newImage as Blob)
                      : "../../img/placeholder.png"
                  }
                  alt={newImage ? newImage.toString() : "placeholder"}
                />
              )}
            </div>
            <div className="text-primary font-semibold">
              {!task?.img ? "Upload a task’s photo" : "Change a photo"}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setNewImage(e.target?.files?.[0] || "")}
            />
          </label>
        </div>
        <div className="flex gap-2">
          <Input
            title="Type something to generate"
            value={prompt}
            handler={(e) => setPrompt(e.target.value)}
          />
          <Button classes="mb-3" onClick={generateHandler}>Generete</Button>
        </div>
        {/* title */}
        <div className="col-12">
          <Input
            handler={(e) => setTitle(e.target.value)}
            title="Task Name"
            value={title}
          />
        </div>
        {/* description */}
        <div className="col-12">
          <div className="flex flex-col mb-3">
            <textarea
              className="textarea"
              placeholder="Task Description & Hashtags"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        {/* Start Time */}
        <div className="col-6">
          <Input
            handler={(e) => setStartTime(e.target.value)}
            value={startTime.toString()}
            title="Start Time"
            type="datetime-local"
          />
        </div>
        {/* Ending time */}
        <div className="col-6">
          <Input
            handler={(e) => setEndTime(e.target.value)}
            value={endTime.toString()}
            title="Ending time"
            type="datetime-local"
          />
        </div>
        <div className="col-12">
          <p className="-mt-2 mb-3 text-info">
            Estimated Time:{" "}
            {(startTime &&
              endTime &&
              formatTime(calcDuration(startTime, endTime))) ||
              (task?.duration && formatTime(task?.duration))}
          </p>
        </div>
        <div className="col-12">
          <div className="mb-3">
            <h4 className="mb-2">Labels</h4>
            <div className="row">
              {labels &&
                labels.map((lbl) => (
                  <div className="col-4 mb-2" key={lbl}>
                    <label>
                      <input
                        type="radio"
                        name="label"
                        className="hidden"
                        onChange={() => setLabel(lbl)}
                        checked={lbl === label}
                      />
                      <div className="label">{lbl}</div>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={submitTaskHandler}>Save</Button>
      </div>
    </form>
  );
};
