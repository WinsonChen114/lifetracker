import * as React from "react"
import { useParams } from 'react-router-dom'
import "./NutritionDetail.css"
import apiClient from "../../services/apiClient"
import { useNutritionContext } from "../../contexts/nutrition"
import Loading from "../Loading/Loading"
import NutritionCard from "../NutritionCard/NutritionCard"
import NotFound from "../NotFound/NotFound"

export default function NutritionDetail() {
  const { nutritionId } = useParams()
  const [nutritionDetail, setNutritionDetail] = React.useState()
  const { isLoading, setIsLoading, error, setError, initialized, setInitialized } = useNutritionContext()

  React.useEffect(() => {
    setIsLoading(true)
    apiClient.getNutritionDetail(nutritionId)
      .then((response) => {
        setNutritionDetail(response.data.nutrition)
        setError(null)
        setIsLoading(false)
        setInitialized(true)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
        setInitialized(true)
      })
  }, [])

  return (
    <div className="nutrition-detail">
      <p>NutritionDetail</p>
      {isLoading && <Loading />}
      {initialized && !error && <NutritionCard />}
      {initialized && error && <NotFound />}
    </div>
  )
}