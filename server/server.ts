import * as express from "express"
import * as path from "path"

import auth from "./routes/auth"

const server = express()


server.use(express.json())
server.use(
  express.static(path.join(__dirname, "../dist"))
)

server.use("/v1/auth", auth)

export default server
