import * as React from "react"
import ApiClient from "../services/apiClient"

const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState()
    const [initialized, setInitialized] = React.useState()
    const [isProcessing, setIsProcessing] = React.useState()
    const [error, setError] = React.useState()

    const authValue = { user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError }

    function loginUser(credentials) {
        ApiClient.login(credentials)
    }

    function signupUser(credentials) {
        ApiClient.signup(credentials)
    }

    function fetchUserFromToken(token) {
        ApiClient.fetchUserFromToken(token)
    }

    function logoutUser() {
        ApiClient.logout()
    }


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

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () =>
    React.useContext(AuthContext)
