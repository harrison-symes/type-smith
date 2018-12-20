import* as React from "react"
import { AuthState, RegisterProps, RegisterState } from "./auth.interface";

class Register extends React.Component<
    RegisterProps, RegisterState
> {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            email_address: '',
            password: '',
            confirm_password: ''
        }
    }
    componentDidMount = () => {
        this.props.loginError('')
    }
    updateDetails = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value } as any)
    }
    submit = (e) => {
        e.preventDefault()
        let { password, confirm_password } = this.state

        if (confirm_password != password) return this.props.loginError("Passwords don't match")

        this.props.register(this.state)
    }
    render() {
        const { auth } = this.props
        return (
            <form className="Register form box" onSubmit={this.submit}>
                <h1 className="title is-2">Register</h1>
                <hr />
                {auth.errorMessage && 
                    <span className="has-text-danger is-large">{auth.errorMessage}</span>
                }
                <label className="column is-6 is-offset-one-quarter label is-large has-text-centered">Username
                <input required className="input is-large has-text-centered is-fullwidth" placeholder="User Name" type="text" name="user_name" onChange={this.updateDetails} />
                </label>
                <div className="columns">
                    <label className="column is-6 label is-large has-text-centered">Password
            <input required className="input is-large has-text-centered is-fullwidth" placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
                    </label>
                    <label className="column is-6 label is-large has-text-centered">Confirm Password
            <input required className="input is-large has-text-centered is-fullwidth" placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.updateDetails} />
                    </label>
                </div>
                <input className="button is-success is-large is-fullwidth" value="Register" type="submit" />
            </form>
        )
    }
}


export default Register