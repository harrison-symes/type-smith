import * as request from "superagent"

import { get } from "./localstorage"
import { isAuthenticated } from "./auth"

const baseURL = "/api/v1/"

export const getRequest = (endpoint: string, data = {}) => 
    requestMain("get", endpoint, data)

export const postRequest = (endpoint: string, data = {}) => 
    requestMain("post", endpoint, data)

export const putRequest = (endpoint: string, data = {}) => 
    requestMain("put", endpoint, data)

export const deleteRequest = (endpoint: string, data = {}) => 
    requestMain("delete", endpoint, data)

const requestMain = async (
    method: string = "get",
    endpoint: string,
    data = {}
) => {
    const dataMethod = method.toLowerCase() == "get" && "query" || "send"
    const token = get("token")
    const headers = {
        Accept: "application/json"
    }
    if (isAuthenticated()) {
        headers["Authorizatio"] = `Bearer ${token}`
    }
    try {
        const res = await request
            [method](baseURL + endpoint)
            [dataMethod](data)
        return res
    } catch (e) {
        throw(e)
    }
}

export default requestMain