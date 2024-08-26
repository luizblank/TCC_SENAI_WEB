import styles from './styles.module.scss';
import boschlogo from '../../../public/boschlogo.png'

export default function NavBar() {
    var token = sessionStorage.getItem('usertoken');

    const logout = () => {
        sessionStorage.removeItem("usertoken");
        window.open('/', '_self');
    }

    return (
        <div className={styles.component}>
            <div className={styles.boschcolors}/>
            <div className={styles.navbar}>
                <a href='/' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={boschlogo} className={styles.boschlogo} alt='Logo Bosch'/>
                </a>
                <a href='/login' className={styles.link} style={{ display: token || window.location.pathname == "/auth" ? 'none' : 'block' }}>Login</a>
                <a href='/' onClick={logout} className={styles.link} style={{ display: token ? 'block' : 'none' }}>Logout</a>
            </div>
        </div>
    )
}