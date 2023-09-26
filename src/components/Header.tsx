import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "./ui/Button";
import { useOnClickOutside } from "../hooks/useClickOutside";

import { ReactComponent as LogoutIcon } from "../assets/img/logout.svg";
import { ReactComponent as Logo } from "../assets/img/logo.svg";
import { isDarkMode, setDarkMode } from "../redux/slices/mainSlice";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const isAuth = useAppSelector(checkIsAuth);
  const isDark = useAppSelector(isDarkMode);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [dropdownisOpen, setDropdownisOpen] = useState(false);
  const navigate = useNavigate();

  const dropdown = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdown, () => setDropdownisOpen(false));

  const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDarkMode(e.target.checked));
  };

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
                    to="/users"
                    className={({ isActive }) =>
                      isActive ? "header__link active" : "header__link"
                    }
                  >
                    Users
                  </NavLink>
                </li>
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
                    <div className="flex items-center gap-2 justify-between">
                      <span>Theme</span>
                      <label className="switch switch--theme">
                        <input
                          type="checkbox"
                          checked={isDark}
                          onChange={(e) => changeTheme(e)}
                        />
                        <div className="slider">
                          <span className="switch-value ico">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask id="path-1-inside-1_85_13875" fill="white">
                                <path d="M7.99652 11.5271C8.47688 11.5271 8.9307 11.435 9.35799 11.2508C9.78523 11.0665 10.1605 10.8121 10.4838 10.4873C10.8072 10.1626 11.0612 9.78832 11.246 9.36457C11.4307 8.94082 11.5231 8.48712 11.5231 8.00347C11.5231 7.5198 11.4307 7.06494 11.246 6.63887C11.0612 6.2128 10.8072 5.8374 10.4838 5.51266C10.1605 5.18792 9.78523 4.93343 9.35799 4.74919C8.9307 4.56494 8.47688 4.47282 7.99652 4.47282C7.51154 4.47282 7.05658 4.56494 6.63163 4.74919C6.20669 4.93343 5.8314 5.18792 5.50577 5.51266C5.18013 5.8374 4.92494 6.2128 4.74018 6.63887C4.55542 7.06494 4.46305 7.5198 4.46305 8.00347C4.46305 8.48712 4.55542 8.94082 4.74018 9.36457C4.92494 9.78832 5.18013 10.1626 5.50577 10.4873C5.8314 10.8121 6.20669 11.0665 6.63163 11.2508C7.05658 11.435 7.51154 11.5271 7.99652 11.5271ZM7.99652 10.47C7.54387 10.47 7.13048 10.3584 6.75635 10.135C6.38221 9.91154 6.08198 9.61328 5.85565 9.24019C5.62932 8.8671 5.51616 8.45486 5.51616 8.00347C5.51616 7.55205 5.62932 7.13979 5.85565 6.76669C6.08198 6.39359 6.38221 6.09419 6.75635 5.86849C7.13048 5.64279 7.54387 5.52994 7.99652 5.52994C8.44916 5.52994 8.86257 5.64279 9.23674 5.86849C9.61087 6.09419 9.90993 6.39359 10.1339 6.76669C10.3579 7.13979 10.4699 7.55205 10.4699 8.00347C10.4699 8.45486 10.3579 8.8671 10.1339 9.24019C9.90993 9.61328 9.61087 9.91154 9.23674 10.135C8.86257 10.3584 8.44916 10.47 7.99652 10.47ZM8.60624 1.10801C8.60624 0.942192 8.5462 0.799401 8.42611 0.67964C8.30602 0.55988 8.16282 0.5 7.99652 0.5C7.83486 0.5 7.69398 0.55988 7.57389 0.67964C7.4538 0.799401 7.39376 0.942192 7.39376 1.10801V2.55896C7.39376 2.72017 7.4538 2.86066 7.57389 2.98042C7.69398 3.10018 7.83486 3.16006 7.99652 3.16006C8.16282 3.16006 8.30602 3.10018 8.42611 2.98042C8.5462 2.86066 8.60624 2.72017 8.60624 2.55896V1.10801ZM11.4191 3.74044C11.3037 3.85559 11.246 3.99723 11.246 4.16535C11.246 4.33348 11.3037 4.47512 11.4191 4.59028C11.5346 4.70543 11.6767 4.76416 11.8452 4.76646C12.0139 4.76876 12.1582 4.71004 12.2783 4.59028L13.3106 3.5608C13.4261 3.44564 13.4838 3.30285 13.4838 3.13242C13.4838 2.962 13.4261 2.81921 13.3106 2.70405C13.1951 2.58889 13.0543 2.53132 12.888 2.53132C12.7217 2.53132 12.5808 2.58889 12.4653 2.70405L11.4191 3.74044ZM14.8903 8.60456C15.0566 8.60456 15.1998 8.54469 15.3199 8.42493C15.44 8.30517 15.5 8.16468 15.5 8.00347C15.5 7.83763 15.44 7.69598 15.3199 7.57854C15.1998 7.46107 15.0566 7.40234 14.8903 7.40234H13.4423C13.2806 7.40234 13.1397 7.46107 13.0196 7.57854C12.8995 7.69598 12.8395 7.83763 12.8395 8.00347C12.8395 8.16468 12.8995 8.30517 13.0196 8.42493C13.1397 8.54469 13.2806 8.60456 13.4423 8.60456H14.8903ZM12.2714 11.4236C12.1559 11.3084 12.0139 11.2508 11.8452 11.2508C11.6767 11.2508 11.5346 11.3084 11.4191 11.4236C11.3037 11.5387 11.246 11.6792 11.246 11.845C11.246 12.0108 11.3037 12.1536 11.4191 12.2733L12.4653 13.3098C12.5808 13.4249 12.7217 13.4813 12.888 13.479C13.0543 13.4767 13.1951 13.418 13.3106 13.3028C13.4261 13.1877 13.4838 13.0461 13.4838 12.8779C13.4838 12.7098 13.4261 12.5682 13.3106 12.453L12.2714 11.4236ZM8.60624 13.4479C8.60624 13.2821 8.5462 13.1393 8.42611 13.0195C8.30602 12.8998 8.16282 12.8399 7.99652 12.8399C7.83486 12.8399 7.69398 12.8998 7.57389 13.0195C7.4538 13.1393 7.39376 13.2821 7.39376 13.4479V14.8989C7.39376 15.0601 7.4538 15.2006 7.57389 15.3204C7.69398 15.4401 7.83486 15.5 7.99652 15.5C8.16282 15.5 8.30602 15.4401 8.42611 15.3204C8.5462 15.2006 8.60624 15.0601 8.60624 14.8989V13.4479ZM2.68244 12.4461C2.56697 12.5612 2.50923 12.7029 2.50923 12.871C2.50923 13.0391 2.56466 13.1808 2.67552 13.2959C2.79099 13.4111 2.93418 13.4698 3.10508 13.4721C3.27598 13.4744 3.41916 13.418 3.53464 13.3028L4.56697 12.2733C4.68244 12.1582 4.74133 12.0166 4.74365 11.8484C4.74596 11.6803 4.68937 11.5387 4.5739 11.4236C4.45843 11.3084 4.31524 11.2508 4.14434 11.2508C3.97344 11.2508 3.83025 11.3084 3.71478 11.4236L2.68244 12.4461ZM1.10277 7.40234C0.941108 7.40234 0.80023 7.46107 0.680138 7.57854C0.560046 7.69598 0.5 7.83763 0.5 8.00347C0.5 8.16468 0.560046 8.30517 0.680138 8.42493C0.80023 8.54469 0.941108 8.60456 1.10277 8.60456H2.5508C2.71709 8.60456 2.86028 8.54469 2.98036 8.42493C3.10046 8.30517 3.16051 8.16468 3.16051 8.00347C3.16051 7.83763 3.10046 7.69598 2.98036 7.57854C2.86028 7.46107 2.71709 7.40234 2.5508 7.40234H1.10277ZM3.71478 4.59028C3.83025 4.70543 3.97228 4.76301 4.14088 4.76301C4.30947 4.76301 4.4515 4.70543 4.56697 4.59028C4.68244 4.47973 4.74133 4.33809 4.74365 4.16535C4.74596 3.99262 4.68937 3.85098 4.5739 3.74044L3.54157 2.70405C3.43071 2.5935 3.29099 2.53708 3.1224 2.53478C2.95381 2.53247 2.80947 2.58889 2.68938 2.70405C2.5739 2.81921 2.51617 2.96085 2.51617 3.12897C2.51617 3.2971 2.57159 3.43874 2.68244 3.55389L3.71478 4.59028Z" />
                              </mask>
                              <path
                                d="M7.99652 11.5271C8.47688 11.5271 8.9307 11.435 9.35799 11.2508C9.78523 11.0665 10.1605 10.8121 10.4838 10.4873C10.8072 10.1626 11.0612 9.78832 11.246 9.36457C11.4307 8.94082 11.5231 8.48712 11.5231 8.00347C11.5231 7.5198 11.4307 7.06494 11.246 6.63887C11.0612 6.2128 10.8072 5.8374 10.4838 5.51266C10.1605 5.18792 9.78523 4.93343 9.35799 4.74919C8.9307 4.56494 8.47688 4.47282 7.99652 4.47282C7.51154 4.47282 7.05658 4.56494 6.63163 4.74919C6.20669 4.93343 5.8314 5.18792 5.50577 5.51266C5.18013 5.8374 4.92494 6.2128 4.74018 6.63887C4.55542 7.06494 4.46305 7.5198 4.46305 8.00347C4.46305 8.48712 4.55542 8.94082 4.74018 9.36457C4.92494 9.78832 5.18013 10.1626 5.50577 10.4873C5.8314 10.8121 6.20669 11.0665 6.63163 11.2508C7.05658 11.435 7.51154 11.5271 7.99652 11.5271ZM7.99652 10.47C7.54387 10.47 7.13048 10.3584 6.75635 10.135C6.38221 9.91154 6.08198 9.61328 5.85565 9.24019C5.62932 8.8671 5.51616 8.45486 5.51616 8.00347C5.51616 7.55205 5.62932 7.13979 5.85565 6.76669C6.08198 6.39359 6.38221 6.09419 6.75635 5.86849C7.13048 5.64279 7.54387 5.52994 7.99652 5.52994C8.44916 5.52994 8.86257 5.64279 9.23674 5.86849C9.61087 6.09419 9.90993 6.39359 10.1339 6.76669C10.3579 7.13979 10.4699 7.55205 10.4699 8.00347C10.4699 8.45486 10.3579 8.8671 10.1339 9.24019C9.90993 9.61328 9.61087 9.91154 9.23674 10.135C8.86257 10.3584 8.44916 10.47 7.99652 10.47ZM8.60624 1.10801C8.60624 0.942192 8.5462 0.799401 8.42611 0.67964C8.30602 0.55988 8.16282 0.5 7.99652 0.5C7.83486 0.5 7.69398 0.55988 7.57389 0.67964C7.4538 0.799401 7.39376 0.942192 7.39376 1.10801V2.55896C7.39376 2.72017 7.4538 2.86066 7.57389 2.98042C7.69398 3.10018 7.83486 3.16006 7.99652 3.16006C8.16282 3.16006 8.30602 3.10018 8.42611 2.98042C8.5462 2.86066 8.60624 2.72017 8.60624 2.55896V1.10801ZM11.4191 3.74044C11.3037 3.85559 11.246 3.99723 11.246 4.16535C11.246 4.33348 11.3037 4.47512 11.4191 4.59028C11.5346 4.70543 11.6767 4.76416 11.8452 4.76646C12.0139 4.76876 12.1582 4.71004 12.2783 4.59028L13.3106 3.5608C13.4261 3.44564 13.4838 3.30285 13.4838 3.13242C13.4838 2.962 13.4261 2.81921 13.3106 2.70405C13.1951 2.58889 13.0543 2.53132 12.888 2.53132C12.7217 2.53132 12.5808 2.58889 12.4653 2.70405L11.4191 3.74044ZM14.8903 8.60456C15.0566 8.60456 15.1998 8.54469 15.3199 8.42493C15.44 8.30517 15.5 8.16468 15.5 8.00347C15.5 7.83763 15.44 7.69598 15.3199 7.57854C15.1998 7.46107 15.0566 7.40234 14.8903 7.40234H13.4423C13.2806 7.40234 13.1397 7.46107 13.0196 7.57854C12.8995 7.69598 12.8395 7.83763 12.8395 8.00347C12.8395 8.16468 12.8995 8.30517 13.0196 8.42493C13.1397 8.54469 13.2806 8.60456 13.4423 8.60456H14.8903ZM12.2714 11.4236C12.1559 11.3084 12.0139 11.2508 11.8452 11.2508C11.6767 11.2508 11.5346 11.3084 11.4191 11.4236C11.3037 11.5387 11.246 11.6792 11.246 11.845C11.246 12.0108 11.3037 12.1536 11.4191 12.2733L12.4653 13.3098C12.5808 13.4249 12.7217 13.4813 12.888 13.479C13.0543 13.4767 13.1951 13.418 13.3106 13.3028C13.4261 13.1877 13.4838 13.0461 13.4838 12.8779C13.4838 12.7098 13.4261 12.5682 13.3106 12.453L12.2714 11.4236ZM8.60624 13.4479C8.60624 13.2821 8.5462 13.1393 8.42611 13.0195C8.30602 12.8998 8.16282 12.8399 7.99652 12.8399C7.83486 12.8399 7.69398 12.8998 7.57389 13.0195C7.4538 13.1393 7.39376 13.2821 7.39376 13.4479V14.8989C7.39376 15.0601 7.4538 15.2006 7.57389 15.3204C7.69398 15.4401 7.83486 15.5 7.99652 15.5C8.16282 15.5 8.30602 15.4401 8.42611 15.3204C8.5462 15.2006 8.60624 15.0601 8.60624 14.8989V13.4479ZM2.68244 12.4461C2.56697 12.5612 2.50923 12.7029 2.50923 12.871C2.50923 13.0391 2.56466 13.1808 2.67552 13.2959C2.79099 13.4111 2.93418 13.4698 3.10508 13.4721C3.27598 13.4744 3.41916 13.418 3.53464 13.3028L4.56697 12.2733C4.68244 12.1582 4.74133 12.0166 4.74365 11.8484C4.74596 11.6803 4.68937 11.5387 4.5739 11.4236C4.45843 11.3084 4.31524 11.2508 4.14434 11.2508C3.97344 11.2508 3.83025 11.3084 3.71478 11.4236L2.68244 12.4461ZM1.10277 7.40234C0.941108 7.40234 0.80023 7.46107 0.680138 7.57854C0.560046 7.69598 0.5 7.83763 0.5 8.00347C0.5 8.16468 0.560046 8.30517 0.680138 8.42493C0.80023 8.54469 0.941108 8.60456 1.10277 8.60456H2.5508C2.71709 8.60456 2.86028 8.54469 2.98036 8.42493C3.10046 8.30517 3.16051 8.16468 3.16051 8.00347C3.16051 7.83763 3.10046 7.69598 2.98036 7.57854C2.86028 7.46107 2.71709 7.40234 2.5508 7.40234H1.10277ZM3.71478 4.59028C3.83025 4.70543 3.97228 4.76301 4.14088 4.76301C4.30947 4.76301 4.4515 4.70543 4.56697 4.59028C4.68244 4.47973 4.74133 4.33809 4.74365 4.16535C4.74596 3.99262 4.68937 3.85098 4.5739 3.74044L3.54157 2.70405C3.43071 2.5935 3.29099 2.53708 3.1224 2.53478C2.95381 2.53247 2.80947 2.58889 2.68938 2.70405C2.5739 2.81921 2.51617 2.96085 2.51617 3.12897C2.51617 3.2971 2.57159 3.43874 2.68244 3.55389L3.71478 4.59028Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                mask="url(#path-1-inside-1_85_13875)"
                              />
                            </svg>
                          </span>
                          <span className="switch-value ico">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.29183 15.5C9.3795 15.5 10.3869 15.3255 11.3141 14.9766C12.2412 14.6277 13.054 14.125 13.7524 13.4685C14.4507 12.8121 14.999 12.0196 15.3972 11.0911C15.4804 10.9018 15.5131 10.7348 15.4953 10.5898C15.4774 10.445 15.424 10.3282 15.3348 10.2395C15.2575 10.1626 15.1535 10.1167 15.0228 10.1019C14.892 10.0872 14.7494 10.1123 14.5949 10.1773C14.2561 10.3075 13.8801 10.4095 13.4671 10.4834C13.054 10.5573 12.5919 10.5943 12.0807 10.5943C10.7494 10.5943 9.59341 10.3341 8.61278 9.81361C7.63211 9.29322 6.87284 8.55693 6.33496 7.60475C5.79708 6.65257 5.52814 5.52594 5.52814 4.22486C5.52814 3.68669 5.5742 3.17217 5.66632 2.6813C5.75845 2.19044 5.87286 1.80306 6.00956 1.51919C6.18786 1.17026 6.18786 0.892301 6.00956 0.685307C5.92635 0.590683 5.81045 0.531543 5.66187 0.507888C5.51328 0.484227 5.33498 0.513796 5.12696 0.596593C4.21167 0.963265 3.40782 1.50736 2.71541 2.22888C2.023 2.95039 1.48066 3.79314 1.0884 4.75713C0.696133 5.7211 0.5 6.7531 0.5 7.8531C0.5 8.93537 0.688704 9.94075 1.06611 10.8693C1.44352 11.7978 1.97991 12.6081 2.67529 13.3C3.37067 13.9919 4.19384 14.5316 5.14479 14.919C6.09573 15.3063 7.14475 15.5 8.29183 15.5ZM8.30966 14.1516C7.35872 14.1516 6.48949 13.9904 5.70198 13.6681C4.91448 13.3458 4.23396 12.8949 3.66041 12.3152C3.08687 11.7357 2.64409 11.0571 2.33206 10.2793C2.02003 9.5017 1.86402 8.65746 1.86402 7.74664C1.86402 7.00739 1.97397 6.30067 2.19388 5.62649C2.41379 4.95229 2.72581 4.3328 3.12997 3.768C3.53412 3.20321 4.01256 2.71087 4.5653 2.29097C4.45238 2.58076 4.3662 2.93265 4.30676 3.34663C4.24733 3.76061 4.21762 4.18051 4.21762 4.60633C4.21762 6.0612 4.53262 7.33568 5.16262 8.42976C5.79262 9.52383 6.67225 10.3755 7.8015 10.9846C8.93075 11.5938 10.2443 11.8984 11.742 11.8984C12.1402 11.8984 12.5102 11.8762 12.8519 11.8318C13.1937 11.7875 13.4596 11.7328 13.6498 11.6677C13.2813 12.1823 12.8222 12.6243 12.2724 12.9939C11.7227 13.3636 11.1105 13.6489 10.4359 13.85C9.76134 14.051 9.05259 14.1516 8.30966 14.1516Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </div>
                      </label>
                    </div>
                    <Link
                      to={"/"}
                      className="btn radius btn--md btn--outline-primary"
                    >
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
                      <span>Profile</span>
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
