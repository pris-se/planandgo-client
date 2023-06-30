import React, { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { TaskCard } from "../../components/TaskCard";
import { getAll } from "../../redux/features/task/thunks/taskThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { labels } from "../../data/data";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { EmptyTaskPage } from "../EmptyTaskPage";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { ReactComponent as SearchIcon } from "../../assets/img/search.svg";
import { CustomSelect } from "../../components/ui/CustomSelect";

export const AllTasksPage = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.task);
  const navigate = useNavigate();
  const { search } = useLocation();

  const [label, setLabel] = useState(
    createSearchParams(search).get("label") || ""
  );
  const [title, setTitle] = useState(
    createSearchParams(search).get("title") || ""
  );

  useEffect(() => {
    setLabel(createSearchParams(search).get("label") || "");
    console.log(search);

    dispatch(getAll(search));
  }, [dispatch, search]);

  useEffect(() => {
    if (label && label != "all") {
      navigate({
        pathname: "/tasks",
        search: `?${label && createSearchParams({ label })}`,
      });
    } else if (label == "all") {
      navigate({
        pathname: "/tasks",
        search: ``,
      });
    }
  }, [label]);

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
    <div className="section">
      <div className="container">
        <div className="row gx-5 mb-4">
          <div className="col-md-6">
            <div className="form-group">
              <form className="flex gap-2" onSubmit={searchHandler}>
                <Input
                  value={title}
                  handler={(e) => setTitle(e.target.value)}
                  title="Search..."
                  type="text"
                />
                <Button classes="mb-3 max-w-[60px]" type="submit">
                  <SearchIcon />
                </Button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <CustomSelect
                options={labels.map((label) => ({ value: label, label }))}
                onChange={(value) => setLabel(value.value)}
              />
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
  );
};
