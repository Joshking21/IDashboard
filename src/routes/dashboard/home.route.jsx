import { lazy } from "react"

const HomePage = lazy(()=> import("@pages/Home/Home"))

export const homeChildRoute = {
    path: "",
    element: <HomePage />
}