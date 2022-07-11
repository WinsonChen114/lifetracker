import * as React from "react"
import ApiClient from "../services/apiClient"
import { useAuthContext } from "./auth"

const ActivityContext = React.createContext()

export const ActivityContextProvider = ({ children }) => {
    const [activity, setActivity] = React.useState()
    const [initialized, setInitialized] = React.useState()
    const [isLoading, setIsLoading] = React.useState()
    const [error, setError] = React.useState()
    const { user } = useAuthContext()


    const activityValue = { activity, setActivity, initialized, setInitialized, isLoading, setIsLoading, error, setError }


    React.useEffect(() => {
        console.log("activity start")
        console.log("activity user", user)
        console.log("activity token", localStorage.lifetracker_token)


        if (localStorage.lifetracker_token) {
            console.log("In activity context")
            ApiClient.setToken(localStorage.lifetracker_token)
            setIsLoading(true)
            setError(null)
            ApiClient.getActivitiesStats()
                .then((response) => {
                    console.log("activity context response: ", response)
                    setActivity(response)
                    setError(null)
                    setIsLoading(false)
                    setInitialized(true)
                })
                .catch((err) => {
                    setError(err)
                    setIsLoading(false)
                    setInitialized(true)
                })
        }
        console.log("activity end")
    }, [localStorage.lifetracker_token])

    return (
        <ActivityContext.Provider value={activityValue}>
            <>{children}</>
        </ActivityContext.Provider>
    )
}

export const useActivityContext = () =>
    React.useContext(ActivityContext)