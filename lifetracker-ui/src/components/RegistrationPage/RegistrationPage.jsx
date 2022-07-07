import * as React from "react"
import "./RegistrationPage.css"
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import { Link, useNavigate } from "react-router-dom"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"

export default function RegistrationPage({ registrationInfo, handleOnChange = () => { } }) {
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
    <div className="registration-page">
      <RegistrationForm registrationInfo={registrationInfo} handleOnChange={handleOnChange} />
    </div>
  )
}