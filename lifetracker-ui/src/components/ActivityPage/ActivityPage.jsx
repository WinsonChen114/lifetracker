import * as React from "react"
import "./ActivityPage.css"
import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"

export default function ActivityPage() {
  const { user, setUser } = useAuthContext()
  return (
    <div className="activity-page">
      <p>ActivityPage</p>
      {user?.email && <ActivityFeed />}
      {!(user?.email) && <AccessForbidden />}
    </div>
  )
}