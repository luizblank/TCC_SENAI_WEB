import styles from './styles.module.scss';

export default function Authenticate() {

    const formSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <form className={styles.card} onSubmit={formSubmit} autoComplete='off'>
                        <div className={styles.title}>Authentication</div>
                        <div className={styles.instruction}>Enter the authentication code sent to your email to sign in.</div>
                        <div className={styles.inputFlex}>
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                            />
                        </div>
                        <button
                            className={styles.submitBtn}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}