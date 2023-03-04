import React from 'react'
import { UserCard } from '../components/UserCard'
import { useAppSelector } from '../redux/hooks'
import { Navigate } from 'react-router-dom'
import { Loader } from '../components/Loader'


export const HomePage = () => {

  const {user, isLoading} = useAppSelector(state => state.auth)
  
  if(isLoading) {
    return <Loader />
  }

  if(!user && !isLoading) {
    return <Navigate to="/auth" />
  }

  if(!user) {
    return <p>User not exist</p>
  }

  return (
    <>
      <UserCard user={user} />
    </>
  )
}
