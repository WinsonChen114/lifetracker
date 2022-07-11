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
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute"

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

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/activity" element={<ProtectedRoute element={<ActivityPage />} />} />
            <Route path="/nutrition/*" element={<ProtectedRoute element={<NutritionPage />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
