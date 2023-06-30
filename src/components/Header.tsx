import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Button } from './ui/Button'
import { useOnClickOutside } from "../hooks/useClickOutside"

import { ReactComponent as LogoutIcon } from '../assets/img/logout.svg'
import { ReactComponent as Logo } from "../assets/img/logo.svg"

export const Header = () => {
  const [open, setOpen] = useState(false)

  const isAuth = useAppSelector(checkIsAuth)
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const {pathname} = useLocation();
  const [dropdownisOpen, setDropdownisOpen] = useState(false)

  const dropdown = useRef<HTMLDivElement>(null);
    useOnClickOutside(dropdown, () => setDropdownisOpen(false))

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
  }

  useEffect(()=>{
    if(open){
        document.querySelector('body')?.classList.add('lock');
    } else {
        document.querySelector('body')?.classList.remove('lock');
    }
}, [open]);


useEffect(() => {
  setOpen(false);
}, [ pathname ]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <Link to='/' className="header__logo">
            <Logo />
          </Link>
          {
            isAuth &&
            <nav className={open ? 'header__menu active' : 'header__menu'}>
              <ul className="header__list">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? 'header__link active' : 'header__link'
                    }
                  >
                    Home page
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    to="/tasks"
                    className={({ isActive }) =>
                      isActive ? 'header__link active' : 'header__link'
                    }
                  >
                    All tasks
                  </NavLink>
                </li>
                {
                  user?.role && user?.role === 'admin' &&
                  <li>
                    <NavLink
                      to="/tasks/create"
                      className={({ isActive }) =>
                        isActive ? 'header__link active' : 'header__link'
                      }
                    >
                      Create task
                    </NavLink>
                  </li>
                }
              </ul>
            </nav>
          }
          <div className="header__buttons">
            {
              user && isAuth &&
              <div className='dropdown'>
                <div className='rounded-full overflow-hidden w-12 h-12 flex-shrink-0 cursor-pointer' onClick={() => setDropdownisOpen(!dropdownisOpen)}>
                  <img className='w-full h-full' src={user.img ? process.env.REACT_APP_BASE_IMAGE_URL + user.img : '/img/placeholder.png'} alt={user.username} />
                </div>
              { dropdownisOpen &&
                    <div className="dropdown-body" ref={dropdown}>
                      <Link to={"/"} className='btn btn--primary radius'>Profile</Link>
                      <Button onClick={logoutHandler} >
                        <LogoutIcon/>
                      </Button>
                    </div>
                 }
              </div>
            }
            {
              !isAuth &&
                  <Link to='/auth' className='btn btn--primary radius'>
                    Sign in / Sign up
                  </Link>                
              }
            {   isAuth &&
                <div className={open ? 'header__burger active' : 'header__burger'} onClick={() => setOpen(!open)}>
                    <span></span>
                </div>
            }
          </div>
        </div>
      </div>
    </header>
  )
}
