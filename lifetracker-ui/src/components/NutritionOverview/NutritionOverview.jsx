import * as React from "react"
import "./NutritionOverview.css"
import { Link, } from "react-router-dom"
import { useNutritionContext } from "../../contexts/nutrition"

export default function NutritionOverview() {
  const {error} = useNutritionContext
  return (
    <div className="nutrition-overview">
      <p>NutritionOverview</p>
      <Link to="/nutrition/create">
        <p>Record Nutrition</p>
      </Link>

    </div>
  )
}