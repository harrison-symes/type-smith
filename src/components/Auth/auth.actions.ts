import { removeUser } from "../../utils/auth";

export enum AUTH_TYPES {
    LOGIN_ERROR = "LOGIN_ERROR",
    LOGIN_REQUEST = "LOGIN_REQUEST",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILURE = "LOGIN_FAILURE",
    LOUGOUT_REQUEST = "LOGOUT_REQUEST",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
}

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

export const receiveLogout = () => ({
    type: AUTH_TYPES.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
})