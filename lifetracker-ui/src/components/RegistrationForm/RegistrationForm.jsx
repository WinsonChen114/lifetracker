import * as React from "react"
import "./RegistrationForm.css"

export default function RegistrationForm({ registrationInfo, handleOnChange = () => { }, signupUser = () => { } }) {
  const [validEmail, setValidEmail] = React.useState(true)
  const [validPasswords, setValidPasswords] = React.useState(true)

  function validateEmail(value) {
    //If user has entered text, and the @ symbol is missing, or there is no "." after the @ symbol, it is not a valid email
    let isValid = value.length == 0 || (value.indexOf("@") != -1 && value.indexOf(".", value.indexOf("@")) != -1)
    setValidEmail(isValid)
  }
  function validatePasswords(password, confirm) {
    let isValid = password.length == 0 || confirm.length == 0 || password === confirm
    setValidPasswords(isValid)
  }

  return (
    <div className="registration-form">
      <label htmlFor="email">Email</label><br />
      <input className="form-input" name="email" type="email" onChange={(event) => {
        handleOnChange("email", event.target.value)
        validateEmail(event.target.value)
      }}></input><br />
      {!validEmail && <p className="error">"{registrationInfo.email}" is not a valid email</p>}

      <label htmlFor="username">Username</label><br />
      <input className="form-input" name="username" type="text" onChange={(event) => {
        handleOnChange("username", event.target.value)
      }}></input><br />

      <label htmlFor="firstName">First Name</label><br />
      <input className="form-input" name="firstName" type="text" onChange={(event) => {
        handleOnChange("firstName", event.target.value)
      }}></input><br />

      <label htmlFor="lastName">Last Name</label><br />
      <input className="form-input" name="lastName" type="text" onChange={(event) => {
        handleOnChange("lastName", event.target.value)
      }}></input><br />

      <label htmlFor="password">Password</label><br />
      <input className="form-input" name="password" type="password" onChange={(event) => {
        handleOnChange("password", event.target.value)
        validatePasswords(event.target.value, registrationInfo.confirm)
      }}></input><br />

      <label htmlFor="passwordConfirm">Confirm Password</label><br />
      <input className="form-input" name="passwordConfirm" type="password" onChange={(event) => {
        handleOnChange("confirm", event.target.value)
        validatePasswords(registrationInfo.password, event.target.value)
      }}></input><br />
      {!validPasswords && <p className="error">passwords don't match</p>}

      <button className="submit-registration" type="submit" onSubmit={signupUser} disabled={!validEmail || !validPasswords}>Create Account</button>
    </div>
  )
}