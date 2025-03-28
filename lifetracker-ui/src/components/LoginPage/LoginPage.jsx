import * as React from "react"
import "./LoginPage.css"
import LoginForm from "../LoginForm/LoginForm"
import { Link, useNavigate } from "react-router-dom"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"

export default function LoginPage({message}) {
  const { user, setUser } = useAuthContext()
  const navigate = useNavigate()

  React.useEffect(() => {
    // if user is already logged in,
    // redirect them to the activity page
    if (user?.email) {
      navigate("/activity")
    }
  }, [user, navigate])

  return (
    <div className="login-page">
      <LoginForm message = {message}/>
    </div>
  )
}