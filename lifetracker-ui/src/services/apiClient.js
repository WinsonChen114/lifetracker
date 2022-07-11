import axios from "axios"
import { API_BASE_URL } from "../../constants"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "lifetracker_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)

    }

    //Helper function to make a call to API
    async request({endpoint, method = "GET", data = {}}) {
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

    async login(credentials) {
        let response = await this.request({endpoint: "auth/login", method: "POST", data: credentials})
        console.log("api client login response", response)
        return response
    }

    async signup(credentials) {
        let response = await this.request({endpoint: "auth/register", method: "POST", data: credentials})
        return response
    }

    async fetchUserFromToken() {
        let response = await this.request({endpoint: "auth/me", method: "GET"})
        return response
    }

    async logout() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }

    async getActivitiesStats() {
        let response = await this.request({endpoint: "activity", method: "GET"})
        return response
    }

    async getNutritions() {
        let response = await this.request({endpoint: "nutrition", method: "GET"})
        return response
    }

    async createNutrition(nutritionInfo) {
        let response = await this.request({endpoint: "nutrition", method: "POST", data: nutritionInfo})
        return response
    }

    async getNutritionDetail(nutritionId) {
        let response = await this.request ({endpoint: "nutrition/" + nutritionId, method: "GET"})
        return response

    }
}

export default new ApiClient(API_BASE_URL || "http://localhost:3001")