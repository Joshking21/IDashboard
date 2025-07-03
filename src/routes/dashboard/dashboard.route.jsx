import Layout from "@/pages/Layout/Layout";
import { homeChildRoute } from "./home.route";
import { usersChildRoutes } from "./users.route";
import Auth from "@/pages/Auth";

console.log("usersChildRoutes.element", usersChildRoutes.element);

export const dashboardRoute = {
    path: "/dashboard",
    element: <Auth><Layout /></Auth>,
    children: [
        homeChildRoute,
        usersChildRoutes
    ]
}