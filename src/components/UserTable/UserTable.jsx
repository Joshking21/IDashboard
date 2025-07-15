import { useState } from "react";
import styles from "./UserTable.module.css"
import MoreVertIcon from '@mui/icons-material/MoreVert'

const UserTable = ({userData}) => {
  const [hoveredRow, setHoveredRow] = useState(null)
  const [hoveredAction, setHoveredAction] = useState(null)

//   const userData = [
//     { id: 1, name: 'Edafe Jesugare', phone: '09123667654', location: 'Auchi Edo state' },
//     { id: 2, name: 'Edafe Jesugare', phone: '09123667654', location: 'Auchi Edo state' },
//     { id: 3, name: 'Edafe Jesugare', phone: '09123667654', location: 'Auchi Edo state' },
//     { id: 4, name: 'Edafe Jesugare', phone: '09123667654', location: 'Auchi Edo state' },
//     { id: 5, name: 'Edafe Jesugare', phone: '09123667654', location: 'Auchi Edo state' },
//     { id: 6, name: 'Edafe Jesugare', phone: '09123667654', location: 'Auchi Edo state' },
//     { id: 7, name: 'Edafe Jesugare', phone: '09123667654', location: 'Auchi Edo state' },
//     { id: 8, name: 'Edafe Jesugare', phone: '09123667654', location: 'Auchi Edo state' }
//   ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>User Name</th>
            <th className={styles.headerCell}>Email</th>
            <th className={styles.headerCell}>Location</th>
            <th className={styles.headerCell}></th>
          </tr>
        </thead>
        <tbody>
          { userData && userData.map((user) => (
            <tr
                key={user?.id}
                className={`${styles.row} ${hoveredRow === user?.id ? styles.rowHover : ''}`}
                onMouseEnter={() => setHoveredRow(user?.id)}
                onMouseLeave={() => setHoveredRow(null)}
            >
              <td className={styles.cell}>
                <div className={styles.userCell}>
                  <div className={styles.avatar}>
                    <img src={user?.pfp} />
                  </div>
                  <span className={styles.userName}>{user?.first_name} {user?.last_name}</span>
                </div>
              </td>
              <td className={styles.cell}>
                <span className={styles.phoneNumber}>{user?.email}</span>
              </td>
              <td className={styles.cell}>
                <span className={styles.location}>{"Auchi Edo State"}</span>
              </td>
              <td className={`${styles.cell} ${styles.tightCell}`}>
                <button 
                    className={`${styles.actionButton} ${hoveredAction === user?.id ? styles.actionButtonHover : ''}`}
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
  )
}

export default UserTable