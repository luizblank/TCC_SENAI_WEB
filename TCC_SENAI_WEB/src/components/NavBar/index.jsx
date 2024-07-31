import styles from './styles.module.scss';
import boschlogo from '../../../public/boschlogo.png'

export default function NavBar() {
    return (
        <div className={styles.component}>
            <div className={styles.boschcolors}/>
            <div className={styles.navbar}>
                <a href='/' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={boschlogo} className={styles.boschlogo}/>
                </a>
                <a href='/login' className={styles.link}>Login</a>
                <a href='/login' className={styles.link}>Logout</a>
            </div>
        </div>
    )
}