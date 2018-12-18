import * as express from "express"
import * as path from "path"

const server = express()

server.use(
  express.static(path.join(__dirname, "../dist"))
)

export default server
