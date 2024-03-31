import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export const ScrollTop = () => {

    const { pathname } = useLocation();
    const [show, setShow] = useState(false)
    const isTasksLoading = useAppSelector(state => state.tasks.isLoading)
    const isUsersLoading = useAppSelector(state => state.users.isLoading)

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
        if (!isTasksLoading && !isUsersLoading) {
            setShow(document.documentElement.clientHeight < document.documentElement.scrollHeight)
        }
    }, [isUsersLoading, isTasksLoading, pathname]);

    if (!show) {
        return null
    }
    return null;
}