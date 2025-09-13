import { useState } from "react";
import styles from "./UserTable.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useUserID from "@/stores/useUserID";

const UserTable = ({ userData, state, windowWidth }) => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredAction, setHoveredAction] = useState(null);
    const { setUserId } = useUserID();

    const getTableStyle = () => {
      if (windowWidth < 375) {
        return { fontSize: '12px' };
      } else if (windowWidth < 768) {
        return { fontSize: '13px' };
      } else {
        return { fontSize: '14px' };
      }
    };

    const getAvatarStyle = () => {
      if (windowWidth < 375) {
        return { width: '12px', height: '12px' };
      } else if (windowWidth < 768) {
        return { width: '16px', height: '16px' };
      } else {
        return { width: '20px', height: '20px' };
      }
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table} style={getTableStyle()}>
                <thead className="rounded-full">
                    <tr  className="rounded-full bg-[#2AC7690D]">
                        <th className={styles.headerCell}>User Name</th>
                        <th className={styles.headerCell}>Email</th>
                        {windowWidth >= 768 && <th className={styles.headerCell}>Location</th>}
                        <th className={styles.headerCell}></th>
                    </tr>
                </thead>
                <tbody>
                    {userData &&
                        userData.map((user) => (
                            <tr
                                key={user?.id}
                                className={`${styles.row} ${hoveredRow === user?.id ? styles.rowHover : ""}`}
                                onMouseEnter={() => setHoveredRow(user?.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                                onClick={() => {
                                    state(false);
                                    setUserId(user?.id);
                                }}
                            >
                                <td className={styles.cell}>
                                    <div className={styles.userCell}>
                                        <div 
                                          className={styles.avatar} 
                                          style={getAvatarStyle()}
                                        >
                                            <img src={user?.pfp} />
                                        </div>
                                        <span className={styles.userName}>
                                            {user?.first_name} {user?.last_name}
                                        </span>
                                    </div>
                                </td>
                                <td className={styles.cell}>
                                    <span className={styles.phoneNumber}>{user?.email}</span>
                                </td>
                                {windowWidth >= 768 && (
                                    <td className={styles.cell}>
                                        <span className={styles.location}>{"Auchi Edo State"}</span>
                                    </td>
                                )}
                                <td className={`${styles.cell} ${styles.tightCell}`}>
                                    <button
                                        className={`${styles.actionButton} ${hoveredAction === user?.id ? styles.actionButtonHover : ""}`}
                                        onMouseEnter={() => setHoveredAction(user.id)}
                                        onMouseLeave={() => setHoveredAction(null)}
                                    >
                                        <MoreVertIcon fontSize="small" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;