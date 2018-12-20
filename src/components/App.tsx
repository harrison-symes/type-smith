import * as React from "react";
import Login from "./Auth/Login.container";
import Register from "./Auth/Register.container";

const App : React.SFC<{}> = () => (
    <div>
        <Login />
        <Register />
    </div>
)

export default App
