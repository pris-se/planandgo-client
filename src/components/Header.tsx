import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { checkIsAuth, logout } from "../redux/slices/authSlice";
import { Button } from "./ui/Button";

import { ReactComponent as Logo } from "../assets/img/logo.svg";
import { ReactComponent as LogoutIcon } from "../assets/img/logout.svg";
import { ThemeSwitch } from "./ui/ThemeSwitch";


const links = [
    {
        route: "/users",
        name: "Users"
    },
    {
        route: "/tasks/my",
        name: "My tasks"
    },
    {
        route: "/tasks",
        name: "Community tasks"
    },
    {
        route: "/calendar",
        name: "Calendar"
    },
]

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dropdown = useRef<HTMLDivElement>(null);
    const { pathname } = useLocation()
    const me = useAppSelector((state) => state.auth.me);
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
                                <div
                                    className="header__avatar cursor-pointer"
                                    onClick={() => setDropdownisOpen(!dropdownisOpen)}
                                >
                                    <img
                                        src={
                                            me?.img
                                                ? process.env.REACT_APP_BASE_IMAGE_URL + me?.img
                                                : "/img/placeholder.png"
                                        }
                                        alt={me?.username}
                                    />
                                </div>
                                {dropdownisOpen && (
                                    <div className="dropdown-body w-60" >
                                        <div>
                                            <h4>{me.username}</h4>
                                            <p className="text-info">{me.email}</p>
                                        </div>
                                        <Link
                                            to={"/"}
                                            className="btn radius btn--md btn--outline-primary"
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
                                            <span>Profile</span>
                                        </Link>
                                        <Button
                                            classes="btn--outline-danger btn--md"
                                            onClick={logoutHandler}
                                            title=""
                                        >
                                            <span className="ico">
                                                <LogoutIcon />
                                            </span>
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
