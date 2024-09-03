import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { api } from '../../API/api';

export default function SendEmail() {
    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [sent, setSent] = useState(false);

    const [isWaiting, setIsWaiting] = useState(false);

    const formSubmit = (e) => {
        e.preventDefault();
        setIsWaiting(true);
        api
            .post("/user/sendemail", { email: email })
            .then((res) => {
                setIsWaiting(false);
                setSent(true);
            })
            .catch((res) => {
                setIsWaiting(false);
                setSent(true);
            })
    }

    const sendBack = (e) => {
        e.preventDefault();
        window.open('/', '_self');
    }

    useEffect(() => {
        if (!email)
            return;

        if (!email.includes('@') && !email.includes('.')) {
            setEmailError(true);
            return;
        }
        if (email.split('@')[0].length < 5 || email.split('@')[0].length > 64) {
            setEmailError(true);
            return
        }
        if (email.slice(email.indexOf('@') + 1, email.indexOf('.')).length < 5) {
            setEmailError(true);
            return;
        }
        if (/[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/.test(email)) {
            setEmailError(true);
            return;
        }
        
        setEmailError(false);
    }, [email])

    return(
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <form className={styles.card} onSubmit={formSubmit} autoComplete='off' style={{ display: sent ? 'none' : 'block'}}>
                        <div className={styles.title}>Send verification</div>
                        <div className={styles.description}>
                            To make sure it's really you, enter your email in the field below and we'll send you the password recovery link.
                        </div>
                        <div className={styles.input_flex} style={{ marginBottom: '20px' }}>
                            <label>Email</label>
                            <input
                                style={{ outline: emailError ? '1px solid red' : 'none' }}
                                name='id' id='id' className={styles.emailInput} type='email' placeholder='example@email.com'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div style={{ position: 'relative' }}>
                                <div className={styles.input_error} style={{ display: emailError ? 'block' : 'none' }}>Invalid email</div>
                            </div>
                        </div>
                        <button
                            className={styles.submitBtn}
                            disabled={!email || emailError || isWaiting} 
                        >
                            <div className={styles.submitBtnText} style={{ display: isWaiting ? 'none' : 'block' }}>
                                Send
                            </div>
                            <img style={{ display: isWaiting ? 'block' : 'none' }} className={styles.loading} src='./../../../public/loading.gif'/>
                        </button>
                    </form>
                    <form className={styles.card} onSubmit={sendBack} autoComplete='off' style={{ display: sent ? 'block' : 'none'}}>
                        <div className={styles.sentDescription}>
                            If the email you wrote is correct, the password recovery link has been sent.
                        </div>
                        <button
                            className={styles.submitBtn}
                        >
                            Back to home
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}