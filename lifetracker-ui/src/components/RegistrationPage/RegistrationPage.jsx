import * as React from "react"
import "./RegistrationPage.css"
import RegistrationForm from "../RegistrationForm/RegistrationForm"

export default function RegistrationPage({registrationInfo, handleOnChange=()=>{}}) {
  return (
    <div className="registration-page">
      <RegistrationForm registrationInfo={registrationInfo} handleOnChange={handleOnChange}/>
    </div>
  )
}