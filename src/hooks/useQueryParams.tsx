import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getQueryParam = (key: string) => searchParams.get(key) || '';

    const setQueryParam = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    const deleteQueryParam = (key: string) => {
        searchParams.delete(key);
        setSearchParams(searchParams);
    };

    const query = searchParams.toString();


    return { query, getQueryParam, setQueryParam, deleteQueryParam };
};

