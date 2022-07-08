import * as React from "react"
import "./ActivityPage.css"
import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import { useActivityContext } from "../../contexts/activity"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import Loading from "components/Loading/Loading"

export default function ActivityPage() {
  const { user, setUser } = useAuthContext()
  const { isProcessing } = useActivityContext()
  const { activity } = useActivityContext()
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