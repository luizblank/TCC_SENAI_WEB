import styles from './styles.module.scss';

export default function Login() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <img className={styles.roberto} src='roberto.webp'/>
                </div>
                <div className={styles.col}>
                    <form className={styles.card}>
                        <div className={styles.title}>Login</div>
                        <div className={styles.input_flex} style={{ marginBottom: '20px' }}>
                            <label>ID</label>
                            <input name='id' id='id'/>
                        </div>
                        <div className={styles.input_flex}>
                            <label>Senha</label>
                            <input name='password' id='password'/>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}