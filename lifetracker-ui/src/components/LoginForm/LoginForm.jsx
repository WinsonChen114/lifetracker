import * as React from "react"
import "./LoginForm.css"

export default function LoginForm({ loginInfo, handleOnChange = () => { }, loginUser = () => {}}) {
  const [validEmail, setValidEmail] = React.useState(true)

  function validateEmail(value) {
    //If user has entered text, and the @ symbol is missing, or there is no "." after the @ symbol, it is not a valid email
    let isValid = value.length == 0 || (value.indexOf("@") != -1 && value.indexOf(".", value.indexOf("@")) != -1)
    setValidEmail(isValid)
  }

  return (
    <div className="login-form">
      <label htmlFor="email">Email</label><br />
      <input className="form-input" name="email" type="email" onChange={(event) => {
        handleOnChange("email", event.target.value)
        validateEmail(event.target.value)
      }} placeholder="example@gmail.com"></input><br />
      {!validEmail && <p className="error">"{loginInfo?.email}" is not a valid email</p>}
      <label htmlFor="password">Password</label><br />
      <input className="form-input" name="password" type="password" onChange={(event) => handleOnChange("password", event.target.value)}></input>
      <button className="submit-login" type="submit" onSubmit={loginUser}>Login</button>
    </div>
  )
}