import * as React from "react"
import "./NutritionFeed.css"
import { useNutritionContext } from "../../contexts/nutrition"
import NutritionCard from "components/NutritionCard/NutritionCard"

export default function NutritionFeed({nutrition = []}) {
  console.log("Nutrition Feed: ",nutrition)
  const nutritionHasItem = nutrition.length > 0
  return (
    <div className="nutrition-feed">
      {!nutritionHasItem && <h4 className={"empty-message"}>Nothing here yet</h4>}
      {nutritionHasItem && nutrition.map((item) => {
        return <NutritionCard key={item.id} nutrition={item}/>
      })}
    </div>
  )
}