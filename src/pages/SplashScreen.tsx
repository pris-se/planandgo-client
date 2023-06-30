import React from 'react'
import { ReactComponent as Logo }   from '../assets/img/logo-big.svg'


export const SplashScreen = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-[#0F0F0F]'>
            <Logo />
        </div>
    )
}
