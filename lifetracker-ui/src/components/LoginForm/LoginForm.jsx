import * as React from "react"
import "./LoginForm.css"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import apiClient from "../../services/apiClient"

export default function LoginForm({ loginInfo, handleOnChange = () => { } }) {
  const [validEmail, setValidEmail] = React.useState(true)
  const [errors, setErrors] = React.useState({})
  const {isProcessing, setIsProcessing} = useAuthContext()
  const {user, setUser} = useAuthContext()
  

  function validateEmail(value) {
    //If user has entered text, and the @ symbol is missing, or there is no "." after the @ symbol, it is not a valid email
    let isValid = value.length == 0 || (value.indexOf("@") != -1 && value.indexOf(".", value.indexOf("@")) != -1)
    setValidEmail(isValid)
  }

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    const { data, error } = await apiClient.login(loginInfo)
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
    <div className="login-form">
      <label htmlFor="email">Email</label><br />
      <input className="form-input" name="email" type="email" onChange={(event) => {
        handleOnChange("email", event.target.value)
        validateEmail(event.target.value)
      }} placeholder="example@gmail.com"></input><br />
      {!validEmail && <p className="error">"{loginInfo.email}" is not a valid email</p>}

      <label htmlFor="password">Password</label><br />
      <input className="form-input" name="password" type="password" onChange={(event) => handleOnChange("password", event.target.value)}></input>

      <button className="submit-login" type="submit" onClick={handleOnSubmit} disabled={!validEmail}>Login</button>
    </div>
  )
}