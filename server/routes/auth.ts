import * as express from "express";
import * as token from "../auth/token"
import { userExists, createUser } from "../db/users";

const router = express.Router()

const register = async (req, res, next) => {
    const { user_name, password} = req.body
    
    const exists = await userExists(user_name)
    if (exists) {
        res.status(400).send("Username already taken")
    } else {
        await createUser(user_name, password)
        next()
    }
}

router.post('/register', register, token.issue)

router.post('/login', token.issue)

export default router
