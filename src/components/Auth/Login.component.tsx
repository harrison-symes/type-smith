import * as React from "react";
import { LoginState, LoginProps } from "./auth.interface";

class Login extends React.Component<LoginProps, LoginState> {
	constructor(props) {
		super(props)
		this.state = {
			user_name: "",
			password: ""
		}
	}
	updateUsername = (e : React.ChangeEvent<HTMLInputElement>) => this.setState({
		user_name: e.target.value
	})
	updatePassword = (e : React.ChangeEvent<HTMLInputElement>) => this.setState({
		password: e.target.value
	})
	submit = (e : React.FormEvent) => {
		e.preventDefault();

		const {user_name, password} = this.state

		this.props.loginUser({user_name, password})
	}
	render() {

		return (
			<form className="Login container" onSubmit={this.submit}>

				<label htmlFor="user_name">Username:</label>
          		<input className="input" type="text" name="user_name" onChange={this.updateUsername} />

				<label htmlFor="password">Password:</label>
         		<input className="input" type="password" name="password" onChange={this.updatePassword} />

				<input className="button is-success" type="submit" />

			</form>
		)
	}
}

export default Login
