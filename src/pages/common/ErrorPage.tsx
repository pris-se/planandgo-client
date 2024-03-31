import React from 'react'
import { Button } from '../../components/ui/Button'

interface IProps {
    message: string
}

export const ErrorPage = ({ message } : IProps) => {
    
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <p className='text-4xl mb-6'>{message}</p>
        <Button 
            onClick={() => window.location.reload()}
        >
          Try again
          </Button>
    </div>
  )
}
