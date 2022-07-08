import * as React from "react"
import "./NutritionPage.css"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"

export default function NutritionPage() {
  const { user, setUser } = useAuthContext()
  return (
    <div className="nutrition-page">
      <p>NutritionPage</p>
      {!user?.email && <AccessForbidden />}
    </div>
  )
}