import * as React from "react";
import { LoginState, LoginProps } from "./auth.interface";
import { Link } from "react-router-dom";

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
	submit = async (e : React.FormEvent) => {
		e.preventDefault();

		const {user_name, password} = this.state

		try {
			await this.props.loginUser({user_name, password})
			this.props.history.push("/")
		} catch(e) {
			console.log(e)
		}
	}
	render() {

		return (
			<div className="center w-50">
				<h2 className="page-title">Login</h2>
				<form className="form" onSubmit={this.submit}>

					<label htmlFor="user_name">Username:</label>
					<input type="text" name="user_name" onChange={this.updateUsername} />

					<label htmlFor="password">Password:</label>
					<input type="password" name="password" onChange={this.updatePassword} />

					<input className="btn btn--green" type="submit" />

				</form>
				<span className="info-text">
					Already have an account?
                    {" "}
					<Link to="/register">
						Sign in
                    </Link>
				</span>
			</div>
		)
	}
}

export default Login
