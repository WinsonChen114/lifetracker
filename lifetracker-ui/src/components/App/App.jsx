import * as React from "react"
import { BrowserRouter } from "react-router-dom"
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
  return (
    <div className="app">
      <React.Fragment>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/nutrition/*" element={<NutritionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
