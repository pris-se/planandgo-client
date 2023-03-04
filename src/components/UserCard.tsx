import React from 'react'
import { User } from '../models/User.model'

interface Props {
    user: User
  }




export const UserCard = ({ user } : Props) => {

  return (
    <div className="container">
      <div className='flex gap-5'>
        <div className='w-52 h-52 overflow-hidden relative rounded-lg'>
        <span className='bg-green-600 p-2 absolute right-0 top-0 rounded-lg text-white'>{ user.role }</span>
          <img 
            className="w-full h-full"
            src={ user?.img ? process.env.REACT_APP_BASE_IMAGE_URL +  user.img : '/img/placeholder.png' }
            alt={ user?.username }/>
        </div>
        <div className='flex flex-col justify-center gap-3'>
          <h4>{ user.email }</h4>
        </div>
      </div>
    </div>
  )
}
