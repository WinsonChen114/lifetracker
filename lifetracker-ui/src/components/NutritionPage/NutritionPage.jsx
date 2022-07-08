import * as React from "react"
import "./NutritionPage.css"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import { Routes, Route, useNavigate } from "react-router-dom"
import NutritionOverview from "components/NutritionOverview/NutritionOverview"
import NutritionNew from "components/NutritionNew/NutritionNew"
import NutritionDetail from "components/NutritionDetail/NutritionDetail"
import NotFound from "components/NotFound/NotFound"


export default function NutritionPage() {
  const { user, setUser } = useAuthContext()
  const navigate = useNavigate()

  React.useEffect(() => {
    // if user is not logged in,
    // redirect them to the login page
    if (!user?.email) {
      navigate("/login")
    }
  }, [user, navigate])
  
  return (
    <div className="nutrition-page">
      <p>NutritionPage</p>
      {!user?.email && <AccessForbidden />}
      <Routes>
        <Route path="/" element={<NutritionOverview />} />
        <Route path="/create" element={<NutritionNew />} />
        <Route path="/id/:nutritionId" element={<NutritionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}