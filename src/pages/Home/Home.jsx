import useAuthStore from "@/stores/useAuth";
import styles from "./home.module.css";
import UsersSummary from "@/components/UsersSummary/UsersSummary";
import FinanceSummary from "./Components/finance-summary";
import TableSummary from "./Components/table-summary";
import { useState, useEffect } from "react";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getContainerStyle = () => {
    if (windowWidth < 375) { // mobileS
      return { padding: '8px' };
    } else if (windowWidth < 425) { // mobileM
      return { padding: '10px' };
    } else if (windowWidth < 768) { // mobileL
      return { padding: '12px' };
    } else if (windowWidth < 1024) { // tablet
      return { padding: '16px' };
    } else { // laptop and larger
      return { padding: '20px' };
    }
  };

  return (
    <section className={styles.container} style={getContainerStyle()}>
      <nav className={styles.header} style={{
        flexDirection: windowWidth < 768 ? 'column' : 'row',
        alignItems: windowWidth < 768 ? 'flex-start' : 'center',
        gap: windowWidth < 768 ? '12px' : '0'
      }}>
        <div className={styles.nameCont}>
          <p className={styles.name}>Hi {user?.first_name}</p>
          <p className={styles.subcaption}>Manage your customer interactions</p>
        </div>

        <img 
          src={user?.pfp} 
          className={styles.img} 
          style={{
            width: windowWidth < 768 ? '40px' : '50px',
            height: windowWidth < 768 ? '40px' : '50px'
          }}
        />
      </nav>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: windowWidth < 768 ? '12px' : '20px'
      }}>
        <UsersSummary windowWidth={windowWidth} />
        <FinanceSummary windowWidth={windowWidth} />
        <TableSummary windowWidth={windowWidth} />
      </div>
    </section>
  );
}