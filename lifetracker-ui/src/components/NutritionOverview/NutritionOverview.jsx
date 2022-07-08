import * as React from "react"
import "./NutritionOverview.css"
import { Link, } from "react-router-dom"

export default function NutritionOverview() {
  return (
    <div className="nutrition-overview">
      <p>NutritionOverview</p>
      <Link to="/nutrition/create">
        <p>Record Nutrition</p>
      </Link>

    </div>
  )
}