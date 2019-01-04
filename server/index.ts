import * as dotenv from "dotenv";
import server from "./server";
import { createSocket } from "./sockets"

dotenv.config()

const http = server.listen(3000, () => console.log("hello, I am listening"))

const socket = createSocket(http)
server.set("socket", socket)
socket.listen(http)