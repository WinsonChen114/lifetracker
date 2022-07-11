import * as React from "react"
import ApiClient from "../services/apiClient"

const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState()
    const [initialized, setInitialized] = React.useState()
    const [isProcessing, setIsProcessing] = React.useState()
    const [error, setError] = React.useState()
    const [testToken, setTestToken] = React.useState()
    const [loginInfo, setLoginInfo] = React.useState({
        email: "",
        password: ""
    })
    const [registrationInfo, setRegistrationInfo] = React.useState({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirm: ""
    }

    )

    const authValue = {
        user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError, testToken, setTestToken,
        loginInfo, setLoginInfo, registrationInfo, setRegistrationInfo,
        loginUser, signupUser, fetchUserFromToken, logoutUser, handleLoginInfoOnChange, handleRegistrationInfoOnChange
    }

    // function loginUser(credentials) {
    //     return ApiClient.login(credentials)

    // }

    async function loginUser() {
        setIsProcessing(true)

        const { data, error } = await ApiClient.login(loginInfo)
        window.location.reload()
        if (error) {
            setError((e) => ({ ...e, form: error }))
        }
        if (data?.user) {
            console.log("login auth has data")
            setUser(data.user)
            ApiClient.setToken(data.token)
            console.log("login has token: ", localStorage.lifetracker_token)
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

    function handleLoginInfoOnChange(field, value) {
        setLoginInfo({
            ...loginInfo,
            [field]: value,
        })
    }

    function handleRegistrationInfoOnChange(field, value) {
        setRegistrationInfo({
            ...registrationInfo,
            [field]: value,
        })
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
