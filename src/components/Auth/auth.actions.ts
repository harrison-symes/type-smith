import { removeUser } from "../../utils/auth";
import { AUTH_TYPES } from "./auth.interface";

export interface LoginAction {
    type: string;
    isFetching: boolean;
    isAuthenticated: boolean;
    message?: string;
} 

export const requestLogin = () => ({
    type: AUTH_TYPES.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
})

export const receiveLogin = user => ({
    type: AUTH_TYPES.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
})

export const loginError = message => ({
    type: AUTH_TYPES.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
})

export const requestLogout = () => ({
    type: AUTH_TYPES.LOUGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
})

export const logout = () => ({
    type: AUTH_TYPES.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
})