import * as React from "react"
import "./RegistrationForm.css"

export default function RegistrationForm() {
  return (
    <div className="registration-form">
      <label htmlFor="email">Email</label><br/>
      <input className="form-input" name="email" type="email" value="" onChange={()=>{}}></input><br/>
      <label htmlFor="username">Username</label><br/>
      <input className="form-input" name="username" type="text" value="" onChange={()=>{}}></input><br/>
      <label htmlFor="firstName">First Name</label><br/>
      <input className="form-input" name="firstName" type="text" value="" onChange={()=>{}}></input><br/>
      <label htmlFor="lastName">Last Name</label><br/>
      <input className="form-input" name="lastName" type="text" value="" onChange={()=>{}}></input><br/>
      <label htmlFor="password">Password</label><br/>
      <input className="form-input" name="password" type="password" value="" onChange={()=>{}}></input><br/>
      <label htmlFor="passwordConfirm">Confirm Password</label><br/>
      <input className="form-input" name="passwordConfirm" type="password" value="" onChange={()=>{}}></input><br/>
    </div>
  )
}