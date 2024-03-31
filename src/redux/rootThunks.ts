import { getUsers } from './features/users'; 
import { getTasks } from './features/tasks';
import { AppDispatch } from './store';

export const loadInitialData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            await dispatch(getTasks(""));
            await dispatch(getUsers(""));
        } catch (error) {
        }
    };
};
