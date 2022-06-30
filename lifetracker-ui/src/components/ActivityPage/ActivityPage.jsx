import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import * as React from "react"
import "./ActivityPage.css"

export default function ActivityPage() {
  return (
    <div className="activity-page">
      <p>ActivityPage</p>
      <ActivityFeed />
    </div>
  )
}