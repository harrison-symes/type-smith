import * as React from "react";
import { connect } from "react-redux";

import Login from "./Login.component";
import { loginUser } from "./auth.api";
import { Dispatch } from "redux";

const mapStateToProps = (state) => ({
	auth: state.auth
})

const mapDispatchToProps = (dispatch : Dispatch<any>) => ({
	loginUser: (creds) => dispatch(loginUser(creds))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
