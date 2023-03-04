import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
    // baseURL: 'http://localhost:3002/'
})

instance.interceptors.request.use((config:InternalAxiosRequestConfig): InternalAxiosRequestConfig => {

    config.headers.Authorization = window.localStorage.getItem('token')
    
    return config;

})



export default instance