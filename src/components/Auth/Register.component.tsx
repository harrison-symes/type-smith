import* as React from "react"
import { AuthState, RegisterProps, RegisterState } from "./auth.interface";
import { Link } from "react-router-dom";

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
    submit = async (e) => {
        e.preventDefault()
        let { password, confirm_password } = this.state

        if (confirm_password != password) return this.props.loginError("Passwords don't match")

        await this.props.register(this.state)
        this.props.history.push("/")
    }
    render() {
        const { auth } = this.props
        return (
            <div className="center">
                <h2 className="page-title">Register</h2>
                <form onSubmit={this.submit} className="form">
                    {auth.errorMessage && 
                        <span>{auth.errorMessage}</span>
                    }

                    <label htmlFor="user_name">Username</label>
                    <input required placeholder="User Name" type="text" name="user_name" onChange={this.updateDetails} />

                    <label>Password</label>
                    <input required placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
                    
                    <label>Confirm Password</label>
                    <input required placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.updateDetails} />

                    <input className="btn btn--green" value="Register" type="submit" />

                </form>
                <span className="info-text">
                    Already have an account?
                    {" "}
                    <Link to="/">
                        Sign in
                    </Link>
                </span>
            </div>
        )
    }
}


export default Register