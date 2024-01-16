import React, { useEffect, useState } from "react";
import { UserCard } from "../../components/UserCard";
import {
  NavLink,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Loader } from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAll } from "../../redux/thunks/authThunk";
import { CustomSelect } from "../../components/ui/CustomSelect";
import { roles } from "../../data/data";
import { Button } from "../../components/ui/Button";
import { ReactComponent as SearchIcon } from "../../assets/img/search.svg";

export const AllUsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();

  const [role, setRole] = useState(
    createSearchParams(search).get("role") || ""
  );
  const [title, setTitle] = useState(
    createSearchParams(search).get("title") || ""
  );

  useEffect(() => {
    setRole(createSearchParams(search).get("role") || "");
    console.log(search);

    dispatch(getAll(search));
  }, [dispatch, search]);

  useEffect(() => {
    if (role && role !== "all") {
      navigate({
        pathname: "/users",
        search: `?${role && createSearchParams({ role })}`,
      });
    } else if (role === "all") {
      navigate({
        pathname: "/users",
        search: ``,
      });
    }
  }, [role, navigate]);

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      pathname: "/users",
      search: `?${title && createSearchParams({ title })}`,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (users && !users.length) {
    return <h1>There is no users yet</h1>;
  }

  return (
    <div className="section">
      <div className="container">
        <h2 className="page-heading">Community users</h2>
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
            <div className="form-group">
              <CustomSelect
                options={roles.map((role) => ({ value: role, label: role }))}
                onChange={(value) => setRole(value.value)}
                value={role}
              />
            </div>
          </div>
        </div>
        <div className="row g-3">
          {users &&
            users.map((user) => (
              <div className="col-lg-3 col-sm-6" key={user._id}>
                <UserCard user={user} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
