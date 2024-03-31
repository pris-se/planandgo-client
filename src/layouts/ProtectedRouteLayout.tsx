import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMe, checkIsAuth } from '../redux/features/profile';

export const ProtectedRouteLayout = () => {
    const isAuth = useAppSelector(checkIsAuth);
    const me = useAppSelector(state => state.profile.me);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuth && !me) {
            dispatch(getMe())
        }
    }, [isAuth])

    if (!isAuth) {
        return <Navigate to="/auth" />
    }
    return (
        <Outlet />
    )
};

