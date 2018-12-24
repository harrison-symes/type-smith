import { TokenInfo } from "src/utils/auth";
import { History } from "history";
// LOGIN
export interface LoginOwnProps {

}
export interface LoginProps extends LoginOwnProps {
    auth: AuthState
    loginUser(creds): any;
    history: History;
}
export interface LoginState {
    user_name: string;
    password: string;
}

// REGISTER
export interface RegisterOwnProps {

}
export interface RegisterProps extends RegisterOwnProps {
    auth: AuthState;
    loginError(err: string): void;
    register(creds: RegisterState): void;
    history: History;
}
export interface RegisterState {
    user_name: string;
    email_address: string;
    password: string;
    confirm_password: string;
}

// TYPES
export enum AUTH_TYPES {
    LOGIN_ERROR = "LOGIN_ERROR",
    LOGIN_REQUEST = "LOGIN_REQUEST",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILURE = "LOGIN_FAILURE",
    LOUGOUT_REQUEST = "LOGOUT_REQUEST",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    REGISTER_REQUEST = "REGISTER_REQUEST",
    REGISTER_FAILURE = "REGISTER_FAILURE"
}

export interface AuthUser {
    id: number;
    user_name: string;
}

export interface AuthState {
    isFetching: boolean;
    isAuthenticated: boolean;
    user: TokenInfo;
    errorMessage: string;
}

export interface AuthAction {
    type: string;
    user?: AuthUser;
    message?: string;
}
