import * as decode from "jwt-decode";

import { get, set } from "./localstorage"

interface TokenInfo {
    exp: number;
}

export const removeUser = () : void => {
    set('token', null)
}

export const saveUserToken = token => {
    set('token', token)
    return decode(token)
}

export const getUserTokenInfo = () : TokenInfo | null => {
    const token = get('token')
    return token ? decode(token) : null
}

export const isAuthenticated = () : boolean => {
    const token = get("token")

    if (token) {
        const payload : TokenInfo = decode(token);
        const {exp} = payload

        if (exp < new Date().getTime() / 1000 ) {
            removeUser()
            return false
        }
        return true
    }
    return false
}
