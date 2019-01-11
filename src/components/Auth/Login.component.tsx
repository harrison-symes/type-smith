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
	test = async (user_name) => {
		await this.props.loginUser({ user_name, password: "test" })
		this.props.history.push("/")
	}
	render() {

		return (
			<div className="center">
				<div className="flex justify-center">
					<button className="btn btn--green" onClick={()=>this.test("test")}>Test</button>
					<h2 className="page-title">Login</h2>
					<button className="btn btn--purple" onClick={()=>this.test("test2")}>Test2</button>
				</div>
				<form className="form" onSubmit={this.submit}>

					<label className="mt3" htmlFor="user_name">Username:</label>
					<input className="mt2" type="text" name="user_name" onChange={this.updateUsername} />

					<label className="mt3" htmlFor="password">Password:</label>
					<input className="mt2" type="password" name="password" onChange={this.updatePassword} />
					
					<div className="content-bottom">
						<input className="btn" type="submit" />
					
						<span className="info-text">
							New to Type Smith?
							{" "}
							<Link to="/register">
								Register
							</Link>
						</span>

					</div>

				</form>
			</div>
		)
	}
}

export default Login
