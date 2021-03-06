import { isAuthenticated, getUserTokenInfo, TokenInfo, clearUserToken } from '../../utils/auth'
import { AuthState, AuthAction, AUTH_TYPES, AuthUser } from './auth.interface';

const initialState = {
    isFetching: false,
    isAuthenticated: isAuthenticated(),
    user: getUserTokenInfo(),
    errorMessage: ''
} as AuthState


export default (state: AuthState = initialState, action: AuthAction) : AuthState => {
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
                user: action.user || state.user
            }
        case AUTH_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message || state.errorMessage
            }
        case AUTH_TYPES.LOGOUT_SUCCESS:
            clearUserToken()
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                user: null,
                errorMessage: ""
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
                errorMessage: action.message || state.errorMessage
            }
        default:
            return state
    }
}