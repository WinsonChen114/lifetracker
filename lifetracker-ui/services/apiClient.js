import axios from "axios"
import { API_BASE_URL } from "../constants"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    static setToken(token) {
        this.token = token
    }

    //Helper function to make a call to API
    static async request(endpoint) {
        axios.get(API_BASE_URL+"/auth/"+endpoint)
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log(err)
        })

    }

    static async login() {
        let response = request("login")
        return response
    }

    static async signup() {
        let response = request("register")
        return response
    }

    static async fetchUserFromToken() {
        let response = request("me")
        return response
    }
}

module.exports = ApiClient