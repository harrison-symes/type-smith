import {postRequest} from "../../utils/request"
import { loginError, requestLogin, receiveLogin, requestLogout } from "./auth.actions";
import { removeUser, saveUserToken } from "../../utils/auth";

export const loginUser = creds => 
	async dispatch => {
		dispatch(requestLogin())
		
		try {
			const res = await postRequest("auth/login", creds)
			const userInfo = saveUserToken(res.body.token)
			dispatch(receiveLogin(res.body))
		} 
		catch (e) {
			console.log({e})
			if (e.status == 500) {
				return dispatch(loginError("Something went wrong, refresh and try again"))
			}
			if (e.status == 401) {
				return dispatch(loginError("Username and password don't match"))
			}
		}
	}

// Logs the user out
export const logoutUser = () => 
	dispatch => {
		dispatch(requestLogout())
		removeUser()
	}

export const registerUserRequest = (creds) =>
	async dispatch => {
		try {
			const res = await postRequest(
				'auth/register',
				creds 
			)
			console.log({res})
			const userInfo = saveUserToken(res.body.token)
			console.log({userInfo})
			dispatch(receiveLogin(userInfo))
		} catch(e) {
			console.log(e);
			
			dispatch(loginError(e.response.body.message))
		}
	}