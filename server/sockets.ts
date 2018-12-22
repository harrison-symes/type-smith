import * as socket from "socket.io"
import { connection, disconnection } from "./socket";

export let io = null

export const createSocket = http => {
    io = socket(http)
    io.on("connection", connection.bind(null, io))

    return io
}
