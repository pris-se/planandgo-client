import React from 'react'
import { User } from '../models/User.model'
import { Link } from 'react-router-dom'

interface Props {
    user: User
  }

export const UserCard = ({ user } : Props) => {

  return (
          <Link to={`/user/${user._id}`} className="card">
          <div className="card-top">
            <div className="card-image">
              <img
                className="w-full h-full"
                src={ user?.img ? process.env.REACT_APP_BASE_IMAGE_URL +  user.img : '/img/placeholder.png' }
                      alt={ user?.username }
              />
              <span className="label">{user.role}</span>
            </div>
          </div>
          <div className="card-body">
            <h3 className="card-title">{user.username}</h3>
          </div>
        </Link>
  )
}
