import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const AuthPage = () => {

    const [isRegister, setIsRegister] = useState(false)
    const navigate = useNavigate()
    useEffect(()=> {
        if(isRegister) {
            navigate('/auth/register')
        } else {
            navigate('/auth')
        }
    }, [isRegister])

    return (
        <div className='container'>
            <div className='flex justify-center mb-14'>
                <img src="./img/logo.svg" alt="" />
            </div>
            <div className='max-w-[360px] mx-auto'>
                <label className="switch" >
                    <input type="checkbox" checked={isRegister} onChange={() => setIsRegister(!isRegister)} />
                    <div className="slider">
                        <span className='switch-value'>Log in</span>
                        <span className='switch-value'>Sign Up</span>
                    </div>
                </label>
                <Outlet />
            </div>
        </div>
    )
}
