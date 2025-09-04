import { Outlet } from 'react-router-dom'
import styles from "./styles.module.css"
import SideNav from '@components/SideNav'

export default function Layout() {
    return (
        <section className={styles.container}>
            <SideNav />
            <div style={{ 
                flex: 1, 
                overflow: 'auto',
                padding: '16px'
            }}>
                <Outlet />
            </div>
        </section>
    )
}