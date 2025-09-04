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
import { useState, useEffect } from "react"

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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            
            // Auto-collapse sidebar on smaller screens
            if (window.innerWidth < 768) {
                setIsCollapsed(true)
            } else {
                setIsCollapsed(false)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize() // Initial call

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const getNavStyle = () => {
        if (windowWidth < 375) { // mobileS
            return {
                width: '60px',
                padding: '8px 4px'
            }
        } else if (windowWidth < 425) { // mobileM
            return {
                width: '70px',
                padding: '10px 6px'
            }
        } else if (windowWidth < 768) { // mobileL
            return {
                width: '80px',
                padding: '12px 8px'
            }
        } else if (windowWidth < 1024) { // tablet
            return {
                width: isCollapsed ? '80px' : '220px',
                padding: '16px 12px'
            }
        } else { // laptop and larger
            return {
                width: isCollapsed ? '80px' : '250px',
                padding: '20px 16px'
            }
        }
    }

    return (
        <nav className={styles.container} style={getNavStyle()}>
            <SvgIconStroke src={logo} height={windowWidth < 768 ? "20px" : "50px"} width={"auto"} />
            
            {/* {windowWidth >= 768 && (
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#f0f0f0',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            )} */}

            <div className={styles.links}>
                {links.map((link, index) => (
                    <NavLink
                        className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link} 
                        key={index} 
                        to={link.link}
                        end={link.link === "/dashboard"}
                    >
                        {({isActive}) => (
                            <NavItem 
                                icon={link.icon} 
                                label={link.name} 
                                isActive={isActive} 
                                isCollapsed={isCollapsed}
                                windowWidth={windowWidth}
                            />
                        )}
                    </NavLink>
                ))}
            </div>

            <div className={styles.logout}>
                <LogoutBtn isCollapsed={isCollapsed} windowWidth={windowWidth} />
            </div>
        </nav>
    )
}

function NavItem({ icon, label, isActive, isCollapsed, windowWidth }) {
    const showLabel = windowWidth >= 1024 ? !isCollapsed : windowWidth >= 768 ? !isCollapsed : false

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: windowWidth < 768 ? '8px 4px' : '10px 8px'
        }}>
            <SvgIconStroke 
                src={icon} 
                height={windowWidth < 768 ? "20px" : "24px"} 
                width={windowWidth < 768 ? "20px" : "24px"} 
                fill={isActive ? "#1AB168" : "#888888"} 
            />
            {showLabel && <span>{label}</span>}
        </div>
    )
}