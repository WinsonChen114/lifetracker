import * as React from "react"
import ApiClient from "../services/apiClient"

const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState()
    const [initialized, setInitialized] = React.useState()
    const [isProcessing, setIsProcessing] = React.useState()
    const [error, setError] = React.useState()
    const [testToken, setTestToken] = React.useState()

    const authValue = {
        user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError, testToken, setTestToken,
        loginUser, signupUser, fetchUserFromToken, logoutUser
    }

    // function loginUser(credentials) {
    //     return ApiClient.login(credentials)
        
    // }

    async function loginUser(credentials) {
        setIsProcessing(true)
    
        const { data, error } = await ApiClient.login(credentials)
        window.location.reload()
        if (error) {
          setError((e) => ({ ...e, form: error }))
        }
        if (data?.user) {
          console.log("login auth has data")
          setUser(data.user)
          ApiClient.setToken(data.token)
          console.log("login has token: ",localStorage.lifetracker_token)
        }
        setIsProcessing(false)
      }

    function signupUser(credentials) {
        return ApiClient.signup(credentials)
    }

    function fetchUserFromToken() {
        return ApiClient.fetchUserFromToken()
    }

    function logoutUser() {
        ApiClient.logout()
        console.log(localStorage.getItem("lifetraker_token"))
        window.location.reload()
    }


    React.useEffect(() => {
        console.log("auth start")
        console.log("auth user", user)
        console.log("auth token", localStorage.lifetracker_token)

        if (localStorage.lifetracker_token) {
            ApiClient.setToken(localStorage.lifetracker_token)
            setIsProcessing(true)
            setError(null)
            ApiClient.fetchUserFromToken()
                .then((response) => {
                    console.log("auth context response", response)
                    setUser(response.data.user)
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
        console.log("auth end")
    }, [localStorage.lifetracker_token])

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () =>
    React.useContext(AuthContext)
