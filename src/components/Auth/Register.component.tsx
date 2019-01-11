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
                <form onSubmit={this.submit} className="form">
                    {auth.errorMessage && 
                        <span>{auth.errorMessage}</span>
                    }

                    <label className="mt3" htmlFor="user_name">Username</label>
                    <input className="mt2" required placeholder="User Name" type="text" name="user_name" onChange={this.updateDetails} />

                    <label className="mt3">Password</label>
                    <input className="mt2" required placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
                    
                    <label className="mt3">Confirm Password</label>
                    <input className="mt2" required placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.updateDetails} />

                    <input className="btn" value="Register" type="submit" />

                    <span className="info-text">
                        Already have an account?
                        {" "}
                        <Link to="/">
                            Sign in
                        </Link>
                    </span>

                </form>
            </div>
        )
    }
}


export default Register