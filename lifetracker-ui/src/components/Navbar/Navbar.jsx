import * as React from "react"
import "./Navbar.css"
import { Link, } from "react-router-dom"
import NavLinks from "../NavLinks/NavLinks"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" >
          <p>Logo Placeholder </p>
        </Link>
      </div>
      <NavLinks />
    </nav>
  )
}