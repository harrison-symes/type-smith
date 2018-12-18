import * as React from "react";
import { render } from "react-dom";

const Test : React.SFC<{}> = () => (
  <div>
    Hello
  </div>
)

render(
  <Test />,
  document.getElementById("app")
)
