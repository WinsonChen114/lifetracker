import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import NotFound from "../NotFound/NotFound"

export default function App() {
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: ""
  })
  const [registrationInfo, setRegistrationInfo] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirm: ""
  }

  )

  function handleLoginInfoOnChange(field, value) {
    setLoginInfo({
      ...loginInfo,
      [field]: value,
    })
    console.log(loginInfo)
  }

  function handleRegistrationInfoOnChange(field, value) {
    setRegistrationInfo({
      ...registrationInfo,
      [field]: value,
    })
    console.log(registrationInfo)
  }

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage loginInfo={loginInfo} handleOnChange={handleLoginInfoOnChange} />} />
            <Route path="/register" element={<RegistrationPage registrationInfo={registrationInfo} handleOnChange={handleRegistrationInfoOnChange} />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/nutrition/*" element={<NutritionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
