import axios from "axios";
import { Token } from "../types/IAuth";

export const API_URL = 'https://easydev.club/api/v2';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    console.log('request')
    return config;
})

$api.interceptors.response.use(
    config => {
        return config
    },
    async error => {

        const originalRequest = error.config;

        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {

                const response = await $api.post<Token>(`${API_URL}/auth/refresh`, {withCredentials: true})
                localStorage.setItem('token', response.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return $api.request(originalRequest);

            } catch (e) {

                console.log('User is not autorized')

            }
        }
        throw error;
    }
)

export default $api;