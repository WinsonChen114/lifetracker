import * as React from "react"
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <img className={"hero-img"} src={"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2021_20/3476027/210519-reusable-water-bottle-bd-2x1.jpg"} />
      <p className="cta"> Track your lifestyle and see where you need to improve!</p>
    </div>
  )
}