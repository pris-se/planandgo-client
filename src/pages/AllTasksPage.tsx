import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { TaskCard } from "../components/TaskCard";
import { getAll } from "../redux/features/task/thunks/taskThunks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { labels } from "../data/data";
import {
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { EmptyTaskPage } from "./EmptyTaskPage";

export const AllTasksPage = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.task);
  const navigate = useNavigate();
  const { search } = useLocation();

  const [label, setLabel] = useState(
    createSearchParams(search).get("label") || ""
  );

  useEffect(() => {
    setLabel(createSearchParams(search).get("label") || "")

    dispatch(getAll(search));
  }, [dispatch, search]);

  useEffect(() => {
    navigate({
      pathname: "/tasks",
      search: `?${label ? createSearchParams({ label }) : ""}`,
    });
  }, [label]);

  if (isLoading) {
    return <Loader />;
  }

  if (tasks && !tasks.length) {
    return <EmptyTaskPage />;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="flex justify-end mb-4 w-full">
          <div className="form-group">
            <h4 className="mb-2">By Label</h4>
            <select
              className="input max-w-xs"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            >
              <option value="">All</option>
              {labels.map((label, key) => (
                <option value={label} key={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row g-3">
          {tasks &&
            tasks.map((task) => (
              <div className="col-md-3" key={task._id}>
                <TaskCard task={task} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
