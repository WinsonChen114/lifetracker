import * as React from "react"
import "./RegistrationForm.css"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import apiClient from "../../services/apiClient"

export default function RegistrationForm() {
  const [validEmail, setValidEmail] = React.useState(true)
  const [validPasswords, setValidPasswords] = React.useState(true)
  const [errors, setErrors] = React.useState({})
  const {isProcessing, setIsProcessing, user, setUser, registrationInfo, handleRegistrationInfoOnChange} = useAuthContext()

  function validateEmail(value) {
    //If user has entered text, and the @ symbol is missing, or there is no "." after the @ symbol, it is not a valid email
    let isValid = value.length == 0 || (value.indexOf("@") != -1 && value.indexOf(".", value.indexOf("@")) != -1)
    setValidEmail(isValid)
  }
  function validatePasswords(password, confirm) {
    let isValid = password.length == 0 || confirm.length == 0 || password === confirm
    setValidPasswords(isValid)
  }

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    if (registrationInfo.confirm !== registrationInfo.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsProcessing(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    const { data, error } = await apiClient.signup(registrationInfo)
    if (error) {
      setErrors((e) => ({ ...e, form: error }))
    }
    if (data?.user) {
      setUser(data.user)
      apiClient.setToken(data.token)
    }
    setIsProcessing(false)
  }

  return (
    <div className="registration-form">
      <label htmlFor="email">Email</label><br />
      <input className="form-input" name="email" type="email" onChange={(event) => {
        handleRegistrationInfoOnChange("email", event.target.value)
        validateEmail(event.target.value)
      }}></input><br />
      {!validEmail && <p className="error">"{registrationInfo.email}" is not a valid email</p>}

      <label htmlFor="username">Username</label><br />
      <input className="form-input" name="username" type="text" onChange={(event) => {
        handleRegistrationInfoOnChange("username", event.target.value)
      }}></input><br />

      <label htmlFor="firstName">First Name</label><br />
      <input className="form-input" name="firstName" type="text" onChange={(event) => {
        handleRegistrationInfoOnChange("firstName", event.target.value)
      }}></input><br />

      <label htmlFor="lastName">Last Name</label><br />
      <input className="form-input" name="lastName" type="text" onChange={(event) => {
        handleRegistrationInfoOnChange("lastName", event.target.value)
      }}></input><br />

      <label htmlFor="password">Password</label><br />
      <input className="form-input" name="password" type="password" onChange={(event) => {
        handleRegistrationInfoOnChange("password", event.target.value)
        validatePasswords(event.target.value, registrationInfo.confirm)
      }}></input><br />

      <label htmlFor="passwordConfirm">Confirm Password</label><br />
      <input className="form-input" name="passwordConfirm" type="password" onChange={(event) => {
        handleRegistrationInfoOnChange("confirm", event.target.value)
        validatePasswords(registrationInfo.password, event.target.value)
      }}></input><br />
      {!validPasswords && <p className="error">passwords don't match</p>}

      <button className="submit-registration" type="submit" onClick={handleOnSubmit} disabled={!validEmail || !validPasswords}>Create Account</button>
    </div>
  )
}