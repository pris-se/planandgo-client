import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { useAppSelector } from '../redux/hooks';

export const ScrollTop = () => {

    const { pathname } = useLocation();
    const [show, setShow] = useState(false)
    const { isLoading } = useAppSelector(state => state.task)
    
    const scrollTopHandler = () => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    useEffect(() => {
        scrollTopHandler()
        
    }, [pathname]);

    useEffect(() => {
        if(!isLoading) {
            setShow(document.documentElement.clientHeight < document.documentElement.scrollHeight)
        }
    }, [isLoading, pathname]);

    if(!show) {
        return null
    }
    return null;
}