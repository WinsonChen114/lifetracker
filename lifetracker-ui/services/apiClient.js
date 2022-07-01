import axios from "axios"
import { API_BASE_URL } from "../constants"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "lifetraker_token"
    }

    static setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)

    }

    //Helper function to make a call to API
    static async request(endpoint, method = "GET", data = {}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }
        try {
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        } catch (error) {
            console.error({errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return {data: null, error: message || String(error)}

        }

    }

    static async login(credentials) {
        let response = await request({endpoint: "auth/login", method: "POST", data: credentials})
        return response
    }

    static async signup(credentials) {
        let response = await request({endpoint: "auth/register", method: "POST", data: credentials})
        return response
    }

    static async fetchUserFromToken(token) {
        let response = await request({endpoint: "auth/register", method: "GET"})
        return response
    }

    static async logout() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")