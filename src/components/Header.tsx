import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "./ui/Button";
import { useOnClickOutside } from "../hooks/useClickOutside";

import { ReactComponent as LogoutIcon } from "../assets/img/logout.svg";
import { ReactComponent as Logo } from "../assets/img/logo.svg";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const isAuth = useAppSelector(checkIsAuth);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [dropdownisOpen, setDropdownisOpen] = useState(false);
  const navigate = useNavigate();

  const dropdown = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdown, () => setDropdownisOpen(false));

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/auth");

    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    if (open) {
      document.querySelector("body")?.classList.add("lock");
    } else {
      document.querySelector("body")?.classList.remove("lock");
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setDropdownisOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <Link to="/" className="header__logo">
            <Logo />
          </Link>
          {isAuth && (
            <nav className={open ? "header__menu active" : "header__menu"}>
              <ul className="header__list">
                <li>
                  <NavLink
                    to="/tasks/my"
                    className={({ isActive }) =>
                      isActive ? "header__link active" : "header__link"
                    }
                  >
                    My tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    to="/tasks"
                    className={({ isActive }) =>
                      isActive ? "header__link active" : "header__link"
                    }
                  >
                    Community tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    to="/calendar"
                    className={({ isActive }) =>
                      isActive ? "header__link active" : "header__link"
                    }
                  >
                    Calendar
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
          <div className="header__buttons">
            {user && isAuth && (
              <div className="dropdown">
                <div
                  className="header__avatar cursor-pointer"
                  onClick={() => setDropdownisOpen(!dropdownisOpen)}
                >
                  <img
                    src={
                      user.img
                        ? process.env.REACT_APP_BASE_IMAGE_URL + user.img
                        : "/img/placeholder.png"
                    }
                    alt={user.username}
                  />
                </div>
                {dropdownisOpen && (
                  <div className="dropdown-body w-60" ref={dropdown}>
                    <Link to={"/"} className="btn radius btn--md btn--outline-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height={16}
                        width={16}
                        viewBox="0 0 448 512"
                      >
                        <path
                          d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
                          fill="currentColor"
                        />
                      </svg>
                      Profile
                    </Link>
                    <Button
                      classes="btn--outline-danger btn--md"
                      onClick={logoutHandler}
                      title=""
                    >
                      <LogoutIcon />
                      <span>Logout</span>
                    </Button>
                  </div>
                )}
              </div>
            )}
            {!isAuth && (
              <Link to="/auth" className="btn btn--primary radius btn--md">
                Sign in / Sign up
              </Link>
            )}
            {isAuth && (
              <div
                className={open ? "header__burger active" : "header__burger"}
                onClick={() => setOpen(!open)}
              >
                <span></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
