import React from 'react'
import { useAppSelector } from '../redux/hooks'

interface IProps {
    message: string
}

export const ErrorPage = ({ message } : IProps) => {
    
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <p className='text-4xl'>{message}</p>
    </div>
  )
}
