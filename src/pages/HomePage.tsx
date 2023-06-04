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
<<<<<<< HEAD
    <section className='section'>
      <div className="container">
        <div className='max-w-[360px] mx-auto'>
          <UserCard user={user} />
        </div>
      </div>
    </section>
=======
    <>
      <UserCard user={user} />
    </>
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
  )
}
