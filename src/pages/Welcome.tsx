import * as React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Register from "../components/Auth/Register.container"
import Login from "../components/Auth/Login.container"

const Welcome : React.SFC<{}> = () => (
    <Router>
        <div className="welcome-page">
            <span className="mb4 center">
                <h1 className="game-title">Atlas arena</h1>
            </span>
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Login} />
        </div>
    </Router>
)

export default Welcome