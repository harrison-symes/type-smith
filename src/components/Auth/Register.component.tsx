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
            <form onSubmit={this.submit}>
                <h1>Register</h1>
                <hr />
                {auth.errorMessage && 
                    <span>{auth.errorMessage}</span>
                }

                <label htmlFor="user_name">Username</label>
                <input required placeholder="User Name" type="text" name="user_name" onChange={this.updateDetails} />

                <label>Password</label>
                <input required placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
                
                <label>Confirm Password</label>
                <input required placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.updateDetails} />

                <input className="button is-success is-large is-fullwidth" value="Register" type="submit" />

            </form>
        )
    }
}


export default Register