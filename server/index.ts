import * as dotenv from "dotenv";
import server from "./server";
import { createSocket } from "./sockets"

dotenv.config()
const port = process.env.PORT || 3000
const http = server.listen(port, () => console.log("hello, I am listening"))

const socket = createSocket(http)
server.set("socket", socket)
socket.listen(http)