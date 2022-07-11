import * as React from "react"
import "./NutritionForm.css"
import { useNutritionContext } from "../../contexts/nutrition"

export default function NutritionForm() {
  const {createNutrition, handleNutritionInfoOnChange } = useNutritionContext()
  return (
    <div className="nutrition-form">
      <p>NutritionForm</p>
      <label htmlFor="name">Name</label><br />
      <input className="form-input" name="name" type="text" onChange={(event) => {
        handleNutritionInfoOnChange("name", event.target.value)
      }}></input><br />
      <label htmlFor="calories">Calories</label><br />
      <input className="form-input" name="calories" type="text" onChange={(event) => {
        handleNutritionInfoOnChange("calories", event.target.value)
      }}></input><br />
      <label htmlFor="imageUrl">Image Url</label><br />
      <input className="form-input" name="imageUrl" type="text" onChange={(event) => {
        handleNutritionInfoOnChange("imageUrl", event.target.value)
      }}></input><br />
      <label htmlFor="category">Category</label><br />
      <input className="form-input" name="category" type="text" onChange={(event) => {
        handleNutritionInfoOnChange("category", event.target.value)
      }}></input><br />

      <button className="submit-nutrition" type="submit" onClick={createNutrition}>Save</button>
    </div>
  )
}