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
  const { isLoading, setIsLoading, error, setError} = useNutritionContext()

  React.useEffect(() => {
    console.log("In nutrition detail")
    setIsLoading(true)
    apiClient.getNutritionDetail(nutritionId)
      .then((response) => {
        console.log("nutrition detail response: ",response)
        setNutritionDetail(response.data.nutrition)
        setError(null)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log("Nutrition Detail Error: ", err)
        setError(err)
        setIsLoading(false)
      })
  }, [])

  console.log("nutritionDetail:",nutritionDetail)

  return (
    <div className="nutrition-detail">
      {isLoading && <Loading />}
      {nutritionDetail && !error && <NutritionCard nutrition={nutritionDetail}/>}
      {error && <NotFound />}
    </div>
  )
}