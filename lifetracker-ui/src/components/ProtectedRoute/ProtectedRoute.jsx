import * as React from "react"
import "./ProtectedRoute.css"
import NutritionForm from "components/NutritionForm/NutritionForm"
import { useAuthContext } from "../../contexts/auth"
import LoginPage from "../LoginPage/LoginPage"

export default function ProtectedRoute({ element }) {
    const { initialized, user } = useAuthContext()

    return (
        <div className="protected-route">
            {initialized && !user && <LoginPage />}
            {!user?.email && <LoginPage message={"Please sign in to access this page"}/>}
            <p>Protected Route</p>
            <> {element} </>
        </div>
    )
}