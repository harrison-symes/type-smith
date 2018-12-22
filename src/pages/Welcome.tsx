import * as React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Register from "../components/Auth/Register.container"
import Login from "../components/Auth/Login.container"
import AuthNav from "../components/Auth/AuthNav"

const Welcome : React.SFC<{}> = () => (
    <Router>
        <React.Fragment>
            <h1>Welcome!</h1>
            <Route path="/" component={AuthNav} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </React.Fragment>
    </Router>
)

export default Welcome