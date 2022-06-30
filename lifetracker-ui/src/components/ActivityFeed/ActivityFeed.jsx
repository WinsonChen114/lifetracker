import * as React from "react"
import "./ActivityFeed.css"
import SummaryStat from "../SummaryStat/SummaryStat"

export default function ActivityFeed({ totalCaloriesPerDay = [], avgCaloriesPerCategory = [] }) {
  let limit = avgCaloriesPerCategory.size < 6 ? avgCaloriesPerCategory.size : 6
  let truncatedAverage = []
  for (let i = 0; i < limit; i++) {
    truncatedAverage.push(avgCaloriesPerCategory[i])
  }

  return (
    <div className="activity-feed">
      <div className="per-category">
        <h4>Average Calories Per Category</h4>
        {
          truncatedAverage.map((item) => {
            <SummaryStat />
          })
        }
      </div>
      <div className="per-day">
        <h4>Average Calories Per Day</h4>
        {
          totalCaloriesPerDay.map((item) => {
            <SummaryStat />
          })
        }
      </div>
    </div>
  )
}