import * as React from "react"
import "./ActivityPage.css"
import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import { Link, useNavigate } from "react-router-dom"
import { useActivityContext } from "../../contexts/activity"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import Loading from "components/Loading/Loading"


export default function ActivityPage() {
  const { user, setUser } = useAuthContext()
  const { isProcessing } = useActivityContext()
  const { activity } = useActivityContext()
  const navigate = useNavigate()

  React.useEffect(() => {
    // if user is not logged in,
    // redirect them to the login page
    if (!user?.email) {
      navigate("/login")
    }
  }, [user, navigate])
  
  return (
    <div className="activity-page">
      <p>ActivityPage</p>
      {user?.email && isProcessing && <Loading />}
      {console.log(activity)}
      {user?.email && !isProcessing && <ActivityFeed totalCaloriesPerDay={activity.data.nutrition.calories.perDay} avgCaloriesPerCategory={activity.data.nutrition.calories.perCategory} />}
      {!(user?.email) && <AccessForbidden />}
    </div>
  )
}