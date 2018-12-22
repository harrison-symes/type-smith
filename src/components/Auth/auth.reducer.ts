import { isAuthenticated, getUserTokenInfo } from '../../utils/auth'
import { AuthState, AuthAction, AUTH_TYPES } from './auth.interface';

const initialState = {
    isFetching: false,
    isAuthenticated: isAuthenticated(),
    user: getUserTokenInfo(),
    errorMessage: ''
} as AuthState


export default () => (state: AuthState = initialState, action: AuthAction) : AuthState => {
    switch (action.type) {
        case AUTH_TYPES.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ''
            }
        case AUTH_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                user: action.user
            }
        case AUTH_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            }
        case AUTH_TYPES.LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                user: null
            }
        case AUTH_TYPES.REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ''
            }
        case AUTH_TYPES.REGISTER_FAILURE:
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