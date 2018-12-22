import * as React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Register from "../components/Auth/Register.container"
import Login from "../components/Auth/Login.container"
import AuthNav from "../components/Auth/AuthNav"
import NavBar from "../components/NavBar/NavBar.component";

const Welcome : React.SFC<{}> = () => (
    <Router>
        <React.Fragment>
            <NavBar />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </React.Fragment>
    </Router>
)

export default Welcome