import * as jwt from "jsonwebtoken";
import * as verifyJwt from "express-jwt";
import { getUserByName } from "../db/users";
import { compare } from "./hash";

export const issue = async (req, res) => {
    const user = await getUserByName(req.body.user_name)
    try {
        const match = compare(req.body.password, user.hash)
        if (!match) {
            res.status(400).json({ message: "Username and password do not match"})
        } else {
            const token = createToken(user, process.env.JWT_SECRET)
            res.status(200).json({token})
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
} 

export const createToken = (user, secret) => (
    jwt.sign({
        id: user.id,
        user_name: user.user_name
    }, secret, {
        expiresIn: "14d"
    })
)

export const getSecret = (_req, _payload, done) => {
    done(null, process.env.JWT_SECRET)
}

export const decode = (req, res, next) => (
    verifyJwt({ secret: getSecret})(req, res, next)
)
