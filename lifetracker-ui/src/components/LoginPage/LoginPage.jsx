import * as React from "react"
import "./LoginPage.css"
import LoginForm from "../LoginForm/LoginForm"

export default function LoginPage({ loginInfo, handleOnChange = () => { } }) {
  return (
    <div className="login-page">
      <LoginForm loginInfo={loginInfo} handleOnChange={handleOnChange} />
    </div>
  )
}