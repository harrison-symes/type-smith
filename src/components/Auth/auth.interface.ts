//LOGIN
export interface LoginProps {
    loginUser?(creds: LoginState): void;
}
export interface LoginState {
    user_name: string;
    password: string;
}

//REGISTER
export interface RegisterProps {
    loginError?(err: string): void;
    register?(creds: RegisterState): void;
    auth: AuthState;
}
export interface RegisterState {
    user_name: string;
    email_address: string;
    password: string;
    confirm_password: string;
}

//TYPES
export enum AUTH_TYPES {
    LOGIN_ERROR = "LOGIN_ERROR",
    LOGIN_REQUEST = "LOGIN_REQUEST",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILURE = "LOGIN_FAILURE",
    LOUGOUT_REQUEST = "LOGOUT_REQUEST",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
}

export interface AuthUser {
    id: number;
    user_name: string;
}

export interface AuthState {
    isFetching: boolean;
    isAuthenticated: boolean;
    user: any;
    errorMessage: string;
}

export interface AuthAction {
    type: string;
    user?: AuthUser;
    message?: string;
}