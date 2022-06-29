import * as React from "react"
import "./NavLinks.css"
import { Link, } from "react-router-dom"

export default function NavLinks() {
  return (
    <div className="nav-links">
      <Link to="/activity">
        <p>Activity</p>
      </Link>
      <Link to="/nutrition">
        <p>Nutrition</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
      <Link to="/register">
        <p>Register</p>
      </Link>
    </div>
  )
}