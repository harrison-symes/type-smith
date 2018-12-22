import * as express from "express"
import * as path from "path"

import auth from "./routes/auth"
import lobby from "./routes/lobby"

const server = express()

server.use(express.json())
server.use(
  express.static(path.join(__dirname, "../dist"))
)

server.use("/api/v1/auth", auth)
server.use("/api/v1/lobby", lobby)

export default server
