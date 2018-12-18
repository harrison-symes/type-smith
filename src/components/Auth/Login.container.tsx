import * as React from "react";
import { connect } from "react-redux";

import Login from "./Login.component";
import { loginUser } from "../../actions/auth";

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({
	loginUser: (creds => dispatch(loginUser(creds)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
