import * as React from "react"
import ApiClient from "../services/apiClient"

const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState()
    const [initialized, setInitialized] = React.useState()
    const [isProcessing, setIsProcessing] = React.useState()
    const [error, setError] = React.useState()

    const authValue = { user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError, 
                        loginUser, signupUser, fetchUserFromToken, logoutUser }

    function loginUser(credentials) {
        ApiClient.login(credentials)
    }

    function signupUser(credentials) {
        ApiClient.signup(credentials)
    }

    function fetchUserFromToken() {
        ApiClient.fetchUserFromToken()
    }

    function logoutUser() {
        ApiClient.logout()
        console.log(localStorage.getItem("lifetraker_token"))
        window.location.reload()
    }


    React.useEffect(() => {
        if (localStorage.lifetracker_token) {
            ApiClient.setToken(localStorage.lifetracker_token)
            setIsProcessing(true)
            setError(null)
            ApiClient.fetchUserFromToken()
                .then((response) => {
                    console.log("auth response", response)
                    setUser(response.data.user)
                    console.log("auth user", user)
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
    }, [localStorage.lifetracker_token])

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () =>
    React.useContext(AuthContext)
