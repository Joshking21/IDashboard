import SvgIconStroke from "../../../components/SvgIcon/svgStroke"
import styles from "./styles.module.css"
import logo from "@assets/icon/logo-green.svg"
import homeIcon from "@assets/icon/home.svg"
import userIcon from "@assets/icon/profile-2user.svg"
import sendIcon from "@assets/icon/send-2.svg"
import tourIcon from "@assets/icon/location-tick.svg"
import moneyIcon from "@assets/icon/money-send.svg"
import { NavLink } from "react-router-dom"
import LogoutBtn from "../LogoutBtn/LogoutBtn"

const links = [
    {
        name: "Dashboard",
        icon: homeIcon,
        link: "/dashboard"
    },
    {
        name: "Users",
        icon: userIcon,
        link: "/dashboard/users"
    },
    {
        name: "Request",
        icon: sendIcon,
        link: "/dashboard/requests"
    },
    {
        name: "Tour",
        icon: tourIcon,
        link: "/dashboard/tours"
    },
    {
        name: "Payment",
        icon: moneyIcon,
        link: "/dashboard/payments"
    }
]

export default function SideNav() {

    return (
        <nav className={styles.container}>
            <SvgIconStroke src={logo} height={"50px"} width={"auto"} />

            <div className={styles.links}>
                {links.map((link, index)=> (
                    <NavLink
                        className={({isActive})=> isActive ? `${styles.link} ${styles.active}` : styles.link} 
                        key={index} 
                        to={link.link}
                        end={link.link === "/dashboard"}
                    >
                        {({isActive})=> (
                            <NavItem icon={link.icon} label={link.name} isActive={isActive} />
                        )}
                    </NavLink>
                ))}
            </div>

            <div className={styles.logout}>
                <LogoutBtn />
            </div>
        </nav>
    )
}


function NavItem({ icon, label, isActive }) {
    return (
        <>
        <SvgIconStroke src={icon} height={"24px"} width={"24px"} fill={isActive ? "#1AB168" : "#888888"} />
        {label}
        </>
    )
}

