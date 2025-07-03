import { Button } from '@mui/material'
import React, { useState } from 'react'
import SvgIconStroke from '../../../components/SvgIcon/svgStroke'
import logoutIcon from "@assets/icon/logout-02.svg"
import styles from "./LogoutBtn.module.css"

export default function LogoutBtn() {
    const [logoutHover, setLogoutHover] = useState(false)
    return (
        <Button
            onMouseEnter={()=> setLogoutHover(true)} 
            onMouseLeave={()=> setLogoutHover(false)}
            startIcon={<SvgIconStroke src={logoutIcon} fill={logoutHover ? "#EB5757" : "#888888"} height={"25px"} width={"25px"} />}
            className={logoutHover ? `${styles.logoutBtn} ${styles.btnActive}` : styles.logoutBtn}
        >
            Logout
        </Button>
    )
}
