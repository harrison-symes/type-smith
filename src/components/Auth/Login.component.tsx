import * as React from "react";

interface LoginProps {
	loginUser?(creds : LoginState) : void;
}

interface LoginState {
	user_name: string;
	password: string;
}

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
				<label>Username:
          <input className="input" type="text" name="user_name" onChange={this.updateUsername} />
				</label><br />
				<label>Password:
          <input className="input" type="password" name="password" onChange={this.updatePassword} />
				</label><br />
				<input className="button is-success" type="submit" />
			</form>
		)
	}
}

export default Login
