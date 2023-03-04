import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Button } from './ui/Button'

export const Header = () => {
  const isAuth = useAppSelector(checkIsAuth)
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <div className="header__burger">
            <span></span>
          </div>
          <nav className="header__menu">
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
          <div className="header__buttons">
            {
              !isAuth ?
                <>
                  <Link to='/auth' className='btn btn--primary radius'>
                    Sign in / Sign up
                  </Link>
                </>
                :
                <Button onClick={logoutHandler} title='Log out' />
            }
          </div>
        </div>
      </div>
    </header>
  )
}
