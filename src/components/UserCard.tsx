import React from 'react'
import { User } from '../models/User.model'

interface Props {
    user: User
  }




export const UserCard = ({ user } : Props) => {

  return (
      <div className='flex flex-col gap-5'>
        <div className='w-full h-80 overflow-hidden relative rounded-lg'>
        <span className='bg-success p-2 absolute right-0 top-0 rounded-lg text-white cursor-default'>{ user.role }</span>
          <img 
            className="w-full h-full"
            src={ user?.img ? process.env.REACT_APP_BASE_IMAGE_URL +  user.img : '/img/placeholder.png' }
            alt={ user?.username }/>
        </div>
        <div className='flex flex-col text-center justify-center gap-3'>
          <h4>{ user.username }</h4>
          <p>{ user.email }</p>
        </div>
      </div>
  )
}
