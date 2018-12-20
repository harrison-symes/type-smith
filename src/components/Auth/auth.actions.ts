export enum AUTH_TYPES {
    LOGIN_ERROR = "LOGIN_ERROR",
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
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