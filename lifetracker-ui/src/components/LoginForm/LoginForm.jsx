import * as React from "react"
import "./LoginForm.css"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"

export default function LoginForm({ message }) {
  const [validEmail, setValidEmail] = React.useState(true)
  const [errors, setErrors] = React.useState({})
  const {loginUser, loginInfo, handleLoginInfoOnChange } = useAuthContext()


  function validateEmail(value) {
    //If user has entered text, and the @ symbol is missing, or there is no "." after the @ symbol, it is not a valid email
    let isValid = value.length == 0 || (value.indexOf("@") != -1 && value.indexOf(".", value.indexOf("@")) != -1)
    setValidEmail(isValid)
  }

  return (
    <div className="login-form">
      {message && <h4>{message}</h4>}
      <label htmlFor="email">Email</label><br />
      <input className="form-input" name="email" type="email" onChange={(event) => {
        handleLoginInfoOnChange("email", event.target.value)
        validateEmail(event.target.value)
      }} placeholder="example@gmail.com"></input><br />
      {!validEmail && <p className="error">"{loginInfo.email}" is not a valid email</p>}

      <label htmlFor="password">Password</label><br />
      <input className="form-input" name="password" type="password" onChange={(event) => handleLoginInfoOnChange("password", event.target.value)}></input>

      <button className="submit-login" type="submit" onClick={loginUser} disabled={!validEmail}>Login</button>
    </div>
  )
}