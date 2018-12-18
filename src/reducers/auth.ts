import { isAuthenticated, getUserTokenInfo } from '../utils/auth'

const initialState = {
    isFetching: false,
    isAuthenticated: isAuthenticated(),
    user: getUserTokenInfo(),
    errorMessage: ''
} as AuthState

interface AuthUser {
    id: number;
    user_name: string;
}

interface AuthState {
    isFetching: boolean;
    isAuthenticated: boolean;
    user: AuthUser;
    errorMessage: string;
}

interface Action {
    type: string;
    user?: AuthUser;
    message?: string;
}


export default () => (state: AuthState = initialState, action: Action) : AuthState => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ''
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                user: action.user
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                user: null
            }
        case 'REGISTER_REQUEST':
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ''
            }
        case 'REGISTER_FAILURE':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            }
        default:
            return state
    }
}