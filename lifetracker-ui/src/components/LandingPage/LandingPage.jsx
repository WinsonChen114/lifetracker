import * as React from "react"
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <img className={"hero-img"} src={"src/assets/Hero_Image.jpg"} />
      <p className="cta"> Track your lifestyle and see where you need to improve!</p>
    </div>
  )
}