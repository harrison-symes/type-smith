import * as decode from "jwt-decode";

import { get, set, remove } from "./localstorage"

export interface TokenInfo {
    exp?: number;
    iat?: number;
    id: number
    user_name: string;
}

export const removeUser = () : void => {
    set('token', null)
}

export const saveUserToken = token => {
    set('token', token)
    return decode(token)
}

export const clearUserToken = () => {
    remove("token")
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

        if (!exp || exp < new Date().getTime() / 1000 ) {
            removeUser()
            return false
        }
        return true
    }
    return false
}
