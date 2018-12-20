import {postRequest} from "../../utils/request"
import { loginError, requestLogin, receiveLogin, requestLogout } from "./auth.actions";
import { removeUser } from "../../utils/auth";

export const loginUser = creds => 
	async dispatch => {
		dispatch(requestLogin())
		
		try {
			const res = await postRequest("auth/login", creds)
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

// export const registerUser = dispatch =>
// 	(creds) => {
// 		try {

// 		}
// 		catch(e) {

// 		}
// 	}