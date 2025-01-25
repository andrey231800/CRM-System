import { AxiosResponse } from "axios";
import { AuthData, Token, UserProfile, UserRegistration } from "../types/IAuth";
import api from './../http/index';

export const login = async (data: AuthData): Promise<AxiosResponse<Token>> => {
    return api.post<Token>('/auth/signin', data);
}

export const signup = async (data: UserRegistration): Promise<AxiosResponse<UserProfile>> => {
    return api.post<UserProfile>('/auth/signup', data);
}