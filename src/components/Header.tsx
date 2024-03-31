import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { links } from "../data/data";
import { useOnClickOutside } from "../hooks/useClickOutside";
import { checkIsAuth, logout } from "../redux/features/profile";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "./ui/Button";
import { ThemeSwitch } from "./ThemeSwitch";

import { ReactComponent as Logo } from "../assets/img/logo.svg";
import { ReactComponent as LogoutIcon } from "../assets/img/logout.svg";

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dropdown = useRef<HTMLDivElement>(null);
    const { pathname } = useLocation()
    const me = useAppSelector((state) => state.profile.me);
    const isAuth = useAppSelector(checkIsAuth);
    const [open, setOpen] = useState(false);
    const [dropdownisOpen, setDropdownisOpen] = useState(false);

    useOnClickOutside(dropdown, () => setDropdownisOpen(false));


    const logoutHandler = () => {
        dispatch(logout());
        navigate("/auth");

    };
    useEffect(() => {
        setOpen(false);
        setDropdownisOpen(false);

    }, [pathname]);


    useEffect(() => {
        if (open) {
            document.querySelector("body")?.classList.add("lock");
        } else {
            document.querySelector("body")?.classList.remove("lock");
        }
    }, [open]);


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
                                {links.map((link, idx) => (
                                    <li key={idx}>
                                        <NavLink
                                            end
                                            to={link.route}
                                            className={({ isActive }) =>
                                                isActive ? "header__link active" : "header__link"
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                    <div className="header__buttons">
                        <ThemeSwitch />
                        {(me && isAuth) && (
                            <div className="dropdown" ref={dropdown}>
                                <Button
                                    onClick={() => setDropdownisOpen(!dropdownisOpen)}
                                    className="btn btn--square btn--md"
                                >
                                    <div
                                        className="header__avatar"
                                    >
                                        <img
                                            src={
                                                me?.avatar
                                                    ? process.env.REACT_APP_BASE_IMAGE_URL + me?.avatar
                                                    : "/img/placeholder.png"
                                            }
                                            alt={me?.username}
                                        />
                                    </div>
                                </Button>
                                {dropdownisOpen && (
                                    <div className="dropdown-body w-72">
                                        <div className="row-group gap--sm">
                                            <div className="ico ico--lg image-wrapper rounded">
                                                <img
                                                    src={
                                                        me?.avatar
                                                            ? process.env.REACT_APP_BASE_IMAGE_URL + me?.avatar
                                                            : "/img/placeholder.png"
                                                    }
                                                    alt={me?.username}
                                                />
                                            </div>
                                            <div className="col-group gap--xs">
                                                <h5>{me.username}</h5>
                                                <p className="fs--xs">{me.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <Link
                                            to={`/users/${me._id}`}
                                            className="btn rounded btn--sm btn--primary"
                                        >
                                            <span className="ico">
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
                                            </span>
                                            <span className="info">Profile</span>
                                        </Link>
                                        <Button
                                            classes="btn--danger btn--sm"
                                            onClick={logoutHandler}
                                            title=""
                                        >
                                            <span className="ico">
                                                <LogoutIcon />
                                            </span>
                                            <span className="info">Logout</span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isAuth && (
                            <Link to="/auth" className="btn btn--primary rounded btn--md">
                                Sign in / Sign up
                            </Link>
                        )}
                        {isAuth && (
                            <div
                                onClick={() => setOpen(!open)}
                                className="header__burger-wrapper btn btn--square btn--md"
                            >
                                <div
                                    className={open ? "header__burger active" : "header__burger"}
                                >
                                    <span></span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
