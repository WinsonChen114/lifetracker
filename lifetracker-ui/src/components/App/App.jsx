import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"
import { AuthContextProvider } from "../../contexts/auth"
import { ActivityContextProvider } from "../../contexts/activity"
import { NutritionContextProvider } from "../../contexts/nutrition"

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <ActivityContextProvider>
        <NutritionContextProvider>
          <App />
        </NutritionContextProvider>
      </ActivityContextProvider>
    </AuthContextProvider>
  )
}

function App() {
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
  }

  function handleRegistrationInfoOnChange(field, value) {
    setRegistrationInfo({
      ...registrationInfo,
      [field]: value,
    })
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
