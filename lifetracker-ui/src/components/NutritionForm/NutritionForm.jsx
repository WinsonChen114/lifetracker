import * as React from "react"
import "./NutritionForm.css"

export default function NutritionForm() {
  return (
    <div className="nutrition-form">
      <p>NutritionForm</p>
      <label htmlFor="name">Name</label><br />
      <input className="form-input" name="name" type="text"></input>
      <label htmlFor="calories">Calories</label><br />
      <input className="form-input" name="calories" type="text"></input>
      <label htmlFor="imageUrl">Image Url</label><br />
      <input className="form-input" name="" type="text"></input>
      <label htmlFor="category">Category</label><br />
      <input className="form-input" name="category" type="text"></input>

      <button className="submit-nutrition" type="submit" onClick={handleOnSubmit} disabled={!validEmail}>Save</button>
    </div>
  )
}