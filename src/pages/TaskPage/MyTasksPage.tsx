import React, { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { TaskCard } from "../../components/TaskCard";
import { getMy } from "../../redux/thunks/taskThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { labels } from "../../data/data";
import {
  NavLink,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { EmptyTaskPage } from "../EmptyTaskPage";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { ReactComponent as PlusIcon } from "../../assets/img/plus.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search.svg";
import { CustomSelect } from "../../components/ui/CustomSelect";

export const MyTasksPage = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.task);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isActiveTasks, setIsActiveTasks] = useState(false)

  const [label, setLabel] = useState(
    createSearchParams(search).get("label") || ""
  );
  const [title, setTitle] = useState(
    createSearchParams(search).get("title") || ""
  );

  useEffect(() => {
    setLabel(createSearchParams(search).get("label") || "");
    console.log(search);

    dispatch(getMy(search));
  }, [dispatch, search]);

  useEffect(() => {
    if (label && label !== "all") {
      navigate({
        pathname: "/tasks",
        search: `?${label && createSearchParams({ label })}`,
      });
    } else if (label === "all") {
      navigate({
        pathname: "/tasks",
        search: ``,
      });
    }
  }, [label, navigate]);

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      pathname: "/tasks",
      search: `?${title && createSearchParams({ title })}`,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (tasks && !tasks.length) {
    return <EmptyTaskPage />;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <h2 className="page-heading">My tasks</h2>
          <div className="row gutters-cards">
            <div className="col-md-6">
              <div className="form-group">
                <form className="search-form" onSubmit={searchHandler}>
                  <Input
                    value={title}
                    handler={(e) => setTitle(e.target.value)}
                    title="Search..."
                    type="text"
                  >
                    <Button classes="btn btn--outline-gray-30 btn--square radius" type="submit">
                      <SearchIcon />
                    </Button>
                  </Input>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row gutters-cards">
                <div className="col-sm-6">
                  <div className="form-group">
                    <CustomSelect
                      options={labels.map((label) => ({ value: label, label }))}
                      onChange={(value) => setLabel(value.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <label className="switch mb-3">
                    <input
                      type="checkbox"
                      checked={isActiveTasks}
                      onChange={() => setIsActiveTasks(!isActiveTasks)}
                    />
                    <div className="slider">
                      <span className="switch-value">Active</span>
                      <span className="switch-value">All</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3">
            {tasks &&
              tasks.map((task) => (
                <div className="col-lg-3 col-sm-6" key={task._id}>
                  <TaskCard task={task} />
                </div>
              ))}


          </div>
        </div>
      </div>
      <NavLink
        to="/tasks/create"
        className={({ isActive }) =>
          isActive ? "hidden" : "btn btn--create"
        }
      >
        <PlusIcon />
      </NavLink>
    </>
  );
};
