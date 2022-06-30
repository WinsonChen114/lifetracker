import * as React from "react"
import ApiClient from "../services/apiClient"

const AuthContext = React.createContext()

export default function AuthContextProvider() {
    const [user, setUser] = React.useState()
    const [initialized, setInitialized] = React.useState()
    const [isProcessing, setIsProcessing] = React.useState()
    const [error, setError] = React.useState()

    
    React.useEffect(() => {
        if (localStorage.lifetracker_token) {
            ApiClient.setToken(localStorage.lifetracker_token)
            setIsProcessing(true)
            setError(null)
            ApiClient.getUserFromToken()
                .then((response) => {
                    setUser(response)
                    setError(null)
                    setIsProcessing(false)
                    setInitialized(true)
                })
                .catch((err) => {
                    setError(err)
                    setIsProcessing(false)
                    setInitialized(true)
                })
        }
    }, [])

    return
}