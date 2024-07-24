import styles from './styles.module.scss';

export default function NavBar() {
    return (
        <div className={styles.component}>
            <div className={styles.boschcolors}/>
            <div className={styles.navbar}>
                <a href='/' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src='boschlogo.png' className={styles.boschlogo}/>
                </a>
                <a href='/login' className={styles.link}>Login</a>
            </div>
        </div>
    )
}