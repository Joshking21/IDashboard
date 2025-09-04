import { Button } from "@mui/material";
import React, { useState } from "react";
import SvgIconStroke from "../../../components/SvgIcon/svgStroke";
import logoutIcon from "@assets/icon/logout-02.svg";
import styles from "./LogoutBtn.module.css";

export default function LogoutBtn({ isCollapsed = false, windowWidth = 1024 }) {
  const [logoutHover, setLogoutHover] = useState(false);

  // Determine button style based on window width and collapsed state
  const getButtonStyle = () => {
    if (windowWidth < 375) {
      // mobileS
      return {
        minWidth: "auto",
        padding: "6px 8px",
        fontSize: "0px", // Hide text on smallest screens
        justifyContent: "center",
      };
    } else if (windowWidth < 425) {
      // mobileM
      return {
        minWidth: "auto",
        padding: "8px 10px",
        fontSize: "0px", // Hide text
        justifyContent: "center",
      };
    } else if (windowWidth < 768) {
      // mobileL
      return {
        minWidth: "auto",
        padding: "8px 12px",
        fontSize: isCollapsed ? "0px" : "12px", // Hide text when collapsed
        justifyContent: isCollapsed ? "center" : "flex-start",
      };
    } else if (windowWidth < 1024) {
      // tablet
      return {
        minWidth: "auto",
        padding: "10px 14px",
        fontSize: isCollapsed ? "0px" : "13px", // Hide text when collapsed
        justifyContent: isCollapsed ? "center" : "flex-start",
      };
    } else {
      // laptop and larger
      return {
        minWidth: "auto",
        padding: "12px 16px",
        fontSize: isCollapsed ? "0px" : "14px", // Hide text when collapsed
        justifyContent: isCollapsed ? "center" : "flex-start",
      };
    }
  };

  // Determine icon size based on window width
  const getIconSize = () => {
    if (windowWidth < 375) {
      // mobileS
      return { height: "20px", width: "20px" };
    } else if (windowWidth < 768) {
      // mobileM, mobileL
      return { height: "22px", width: "22px" };
    } else {
      // tablet and larger
      return { height: "25px", width: "25px" };
    }
  };
  const handleClick = () => {
    localStorage.clear();
  };

  return (
    <Button
      onMouseEnter={() => setLogoutHover(true)}
      onMouseLeave={() => setLogoutHover(false)}
      onClick={() => {
        handleClick();
        window.location.reload();
      }}
      startIcon={
        <SvgIconStroke
          src={logoutIcon}
          fill={logoutHover ? "#EB5757" : "#888888"}
          {...getIconSize()}
        />
      }
      className={
        logoutHover
          ? `${styles.logoutBtn} ${styles.btnActive}`
          : styles.logoutBtn
      }
      style={getButtonStyle()}
    >
      {/* Only show text on larger screens when not collapsed */}
      {(windowWidth >= 768 || !isCollapsed) && "Logout"}
    </Button>
  );
}
