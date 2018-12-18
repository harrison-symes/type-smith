import * as dotenv from "dotenv";
import server from "./server";

dotenv.config()

server.listen(3000, () => console.log("hello, I am listening"))
