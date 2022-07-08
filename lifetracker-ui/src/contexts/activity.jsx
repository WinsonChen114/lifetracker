import * as React from "react"

const ActivityContext = React.createContext()

export const ActivityContextProvider = ({ children }) => {
    const [activity, setActivity] = React.useState()
    const [initialized, setInitialized] = React.useState()
    const [isLoading, setIsLoading] = React.useState()
    const [error, setError] = React.useState()

    const activityValue = { activity, setActivity, initialized, setInitialized, isLoading, setIsLoading, error, setError, 
                        loginUser, signupUser, fetchUserFromToken, logoutUser }

    React.useEffect(() => {
        if (localStorage.lifetracker_token) {
            setIsLoading(true)
            setError(null)
            ApiClient.getActivitiesStats()
                .then((response) => {
                    setActivity(response)
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
        <ActivityContext.Provider value={activityValue}>
            <>{children}</>
        </ActivityContext.Provider>
    )
}

export const useActivityContext = () =>
    React.useContext(ActivityContext)