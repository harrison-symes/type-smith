import {postRequest} from "../../utils/request"
import { loginError, requestLogin, receiveLogin } from "./auth.actions";

export const loginUser = creds => 
	async dispatch => {
		// dispatch(requestLogin())
		console.log({creds});
		
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

// export const registerUser = dispatch =>
// 	(creds) => {
// 		try {

// 		}
// 		catch(e) {

// 		}
// 	}