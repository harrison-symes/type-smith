import * as React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Login from "../components/Auth/Login.container"

const Welcome : React.SFC<{}> = () => (
    <Router>
        <div className="welcome-page">
            <span className="mb4 center">
                <h1 className="game-title">ATLAS <span className="ra ra-lg ra-atlas" /> arena</h1>
            </span>
            <Route exact path="/register" component={(props) => {
                const Register = React.lazy(() => import("../components/Auth/Register.container"))
                return <React.Suspense fallback={"loading"}>
                    <Register {...props} />
                </React.Suspense>
            }} />
            <Route exact path="/" component={(props) => {
                const Login = React.lazy(() => import("../components/Auth/Login.container"))
                return <React.Suspense fallback={"loading"}>
                    <Login {...props} />
                </React.Suspense>
            }} />
        </div>
    </Router>
)

export default Welcome