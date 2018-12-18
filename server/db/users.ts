import * as hash from "../auth/hash";
import db from "./connection";

export const createUser = async (user_name, password) => {
    try {
        const blob = await hash.generate(password)
        const id = db("users")
            .insert({ user_name, hash: blob })
        return id
    }
    catch (err) {
        throw(err)
    }
}

export const userExists = async user_name => {
    const user = await getUserByName(user_name)
    return !!user
}

export const getUserByName = async user_name => {
    const user = db("users")
        .where({user_name})
        .first()
    return user
}