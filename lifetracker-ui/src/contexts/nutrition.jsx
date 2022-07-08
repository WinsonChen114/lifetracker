import * as React from "react"
import ApiClient from "../services/apiClient"
import { useAuthContext } from "./auth"

const NutritionContext = React.createContext()

export const NutritionContextProvider = ({ children }) => {
    const [nutrition, setNutrition] = React.useState()
    const [initialized, setInitialized] = React.useState()
    const [isLoading, setIsLoading] = React.useState()
    const [error, setError] = React.useState()
    const { user } = useAuthContext()

    const nutritionValue = { nutrition, setNutrition, initialized, setInitialized, isLoading, setIsLoading, error, setError }
    

    React.useEffect(() => {
        if (localStorage.lifetracker_token) {
            ApiClient.setToken(localStorage.lifetracker_token)
            setIsLoading(true)
            setError(null)
            ApiClient.getNutritions()
                .then((response) => {
                    console.log("nutrition context response: ",response)
                    setNutrition(response)
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
    }, [localStorage.lifetracker_token])

    return (
        <NutritionContext.Provider value={nutritionValue}>
            <>{children}</>
        </NutritionContext.Provider>
    )
}

export const useNutritionContext = () =>
    React.useContext(NutritionContext)