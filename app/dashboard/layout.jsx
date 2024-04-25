import { Footer, Navbar, Sidebar } from "../ui/dashboard"
import styles from "../ui/dashboard/dashboard.module.css";
const Layout =({children})=>{
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Navbar />
                {children}
                <Footer />
            </div>
        </div>
    )
}
export default Layout