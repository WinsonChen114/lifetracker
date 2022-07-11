import * as React from "react"
import "./NutritionOverview.css"
import { Link, } from "react-router-dom"
import { useNutritionContext } from "../../contexts/nutrition"
import Loading from "../Loading/Loading"
import NutritionFeed from "../NutritionFeed/NutritionFeed"

export default function NutritionOverview() {
  const { error, isLoading } = useNutritionContext()
  const {nutrition} = useNutritionContext()
  return (
    <div className="nutrition-overview">
      <p>NutritionOverview</p>
      {!error && <>
        <Link to="/nutrition/create">
          <p>Record Nutrition</p>
        </Link>
        {isLoading && <Loading />}
        {!isLoading && <NutritionFeed nutrition={nutrition.data.nutritions}/>}
      </>}
      {error &&
        <h4 className="error">{error}</h4>}


    </div>
  )
}