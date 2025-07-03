import Layout from "@/pages/Layout/Layout";
import { homeChildRoute } from "./home.route";
import { usersChildRoutes } from "./users.route";
import Auth from "@/pages/Auth";


export const dashboardRoute = {
    path: "/dashboard",
    element: <Auth><Layout /></Auth>,
    children: [
        homeChildRoute,
        usersChildRoutes
    ]
}