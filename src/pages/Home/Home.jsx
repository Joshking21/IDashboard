import useAuthStore from "@/stores/useAuth"
import styles from "./home.module.css"
import UsersSummary from "@/components/UsersSummary/UsersSummary"

export default function Home() {
    const user = useAuthStore((state)=> state.user)
    return (
        <section className={styles.container}>
            <nav className={styles.header}>
                <div className={styles.nameCont}>
                    <p className={styles.name}>Hi {user?.first_name}</p>
                    <p className={styles.subcaption}>
                        Manage your customer interactions
                    </p>
                </div>

                <img src={user?.pfp} className={styles.img} />
            </nav>
            <UsersSummary />
        </section>
    )
}
