import {connect} from "react-redux";
import Register from "./Register.component"
import { loginError } from "./auth.actions";
import { registerUserRequest } from "./auth.api";

const mapStateToProps = ({ 
    auth,
}) => ({ 
    auth 
})

const mapDispatchToProps = dispatch => ({
    loginError: msg => dispatch(loginError(msg)),
    register: async (creds) => await dispatch(registerUserRequest(creds))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)