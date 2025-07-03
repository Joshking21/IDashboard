import { Navigate } from "react-router-dom";
import { dashboardRoute } from "./dashboard/dashboard.route";
import { loginRoute } from "./Login/login.route";

const redirectRoute = {
    path: "/",
    element: <Navigate to={"/dashboard"} replace={true} />
}
export const appRoutes = [
    redirectRoute,
    dashboardRoute,
    loginRoute
]