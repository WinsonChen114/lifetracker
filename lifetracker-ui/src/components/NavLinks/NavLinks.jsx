import * as React from "react"
import "./NavLinks.css"
import { Link, } from "react-router-dom"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"


export default function NavLinks() {
  const { user, setUser } = useAuthContext()
  const { logoutUser } = useAuthContext()
  return (
    <div className="nav-links">
      <Link to="/activity">
        <p>Activity</p>
      </Link>
      <Link to="/nutrition">
        <p>Nutrition</p>
      </Link>
      {!user?.email && <Link to="/login">
        <p>Login</p>
      </Link>}
      {!user?.email && <Link to="/register">
        <p>Register</p>
      </Link>}
      {user?.email && <button className="logout-button" onClick={() => { logoutUser() }}>Logout</button>}
    </div>
  )
}