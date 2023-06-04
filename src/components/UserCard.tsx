import React from 'react'
import { User } from '../models/User.model'

interface Props {
    user: User
  }




export const UserCard = ({ user } : Props) => {

  return (
<<<<<<< HEAD
      <div className='flex flex-col gap-5'>
        <div className='w-full h-80 overflow-hidden relative rounded-lg'>
        <span className='bg-success p-2 absolute right-0 top-0 rounded-lg text-white cursor-default'>{ user.role }</span>
=======
    <div className="container">
      <div className='flex gap-5'>
        <div className='w-52 h-52 overflow-hidden relative rounded-lg'>
        <span className='bg-green-600 p-2 absolute right-0 top-0 rounded-lg text-white'>{ user.role }</span>
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
          <img 
            className="w-full h-full"
            src={ user?.img ? process.env.REACT_APP_BASE_IMAGE_URL +  user.img : '/img/placeholder.png' }
            alt={ user?.username }/>
        </div>
<<<<<<< HEAD
        <div className='flex flex-col text-center justify-center gap-3'>
          <h4>{ user.username }</h4>
          <p>{ user.email }</p>
        </div>
      </div>
=======
        <div className='flex flex-col justify-center gap-3'>
          <h4>{ user.email }</h4>
        </div>
      </div>
    </div>
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
  )
}
