import * as React from "react"
import "./NutritionCard.css"

export default function NutritionCard({nutrition}) {
  //Get date in dd/mm/yyy format
  const formattedDate = nutrition.createdAt.substring(8,10)+"/"+nutrition.createdAt.substring(5,7)+"/"+nutrition.createdAt.substring(0,4)
  return (
    <div className="nutrition-card">
      <h4 className="nutrition-name">{nutrition.name}</h4>
      {nutrition.imageUrl && <img className="nutrition-image" src = {nutrition.imageUrl} />}
      <p className="nutrition-calories">{nutrition.calories}</p>
      <p className="nutrition-category">{nutrition.category}</p>
      <p className="nutrition-date">{formattedDate}</p>

    </div>
  )
}