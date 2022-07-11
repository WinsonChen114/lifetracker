import * as React from "react"
import "./ActivityFeed.css"
import SummaryStat from "../SummaryStat/SummaryStat"

export default function ActivityFeed({ totalCaloriesPerDay = [], avgCaloriesPerCategory = [] }) {
  let limit = avgCaloriesPerCategory.length < 6 ? avgCaloriesPerCategory.length : 6
  let truncatedAverage = []
  for (let i = 0; i < limit; i++) {
    truncatedAverage.push(avgCaloriesPerCategory[i])
  }

  return (
    <div className="activity-feed">
      <div className="per-category">
        <h4>Average Calories Per Category</h4>
        {
          truncatedAverage.map((item, index) => {
            return <SummaryStat key={index} stat={item.avgCaloriesPerCategory} label={"calories"} substat={item.category} />
          })
        }
      </div>
      <div className="per-day">
        <h4>Total Calories Per Day</h4>
        {
          totalCaloriesPerDay.map((item, index) => {
            return <SummaryStat key={index} stat={item.totalCaloriesPerDay} label={"calories"} substat={item.date} />
          })
        }
      </div>
    </div>
  )
}