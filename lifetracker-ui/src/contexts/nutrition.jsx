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
    const [nutritionInfo, setNutritionInfo] = React.useState({})



    const nutritionValue = { nutrition, setNutrition, initialized, setInitialized, isLoading, setIsLoading, error, setError, 
        nutritionInfo, handleNutritionInfoOnChange, createNutrition }
    

    React.useEffect(() => {
        console.log("nutrition start")
        console.log("nutrition user", user)
        console.log("nutrition token", localStorage.lifetracker_token)

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
        console.log("nutrition end")
    }, [localStorage.lifetracker_token])

    function handleNutritionInfoOnChange(field, value) {
        setNutritionInfo({
            ...nutritionInfo,
            [field]: value,
        })
    }

    async function createNutrition() {
        const { data, error } = await ApiClient.createNutrition(nutritionInfo)
        window.location.reload()
        if (error) {
            setError((e) => ({ ...e, form: error }))
        }
        if (data?.nutrition) {
            console.log("create nutrition has data")
            setNutrition([...nutrition, data.nutrition])
        }
    }

    return (
        <NutritionContext.Provider value={nutritionValue}>
            <>{children}</>
        </NutritionContext.Provider>
    )
}

export const useNutritionContext = () =>
    React.useContext(NutritionContext)