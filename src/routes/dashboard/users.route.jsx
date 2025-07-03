import { lazy } from "react"

const UserPage = lazy(()=> import("@pages/Users/Users"))

export const usersChildRoutes = {
    path: "users",
    element: <UserPage />
}