import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function UpdatePassword() {
    const [passwordIcon, setPasswordIcon] = useState(true);

    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    
    const [passwordError, setPasswordError] = useState(false);
    const [confPasswordError, setConfPasswordError] = useState(false);

    useEffect(() => {
        if (!password)
            return;
        if (password.length < 12) {
            setPasswordError(true);
            return;
        }
        if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
            setPasswordError(true)
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError(true)
            return;
        }
        if (!/[0-9]/.test(password)) {
            setPasswordError(true)
            return;
        }

        setPasswordError(false);
    }, [password])

    useEffect(() => {
        
        if (!confPassword)
            return;
        if (confPassword != password) {
            setConfPasswordError(true);
            return;
        }
        
        setConfPasswordError(false);
    }, [password, confPassword])

    const formSubmit = (e) => {
        e.preventDefault();
        const path = window.location.pathname.split('/')
        const hash = path[path.length - 1]
        console.log(hash)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <form className={styles.card} onSubmit={formSubmit} autoComplete='off'>
                        <div className={styles.title}>Creating a new password</div>
                        <div className={styles.input_flex} style={{ marginBottom: '20px' }}>
                            <label>New Password</label>
                            <div className={styles.passwordContainer} style={{ outline: passwordError ? '1px solid red' : 'none' }}>
                                <input
                                    type={passwordIcon ? 'password' : 'text'} name='newpassword' id='newpassword' className={styles.passwordInput}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type='button' className={styles.passwordIcon} onClick={() => setPasswordIcon(!passwordIcon)}>
                                    { passwordIcon ? <FaEye/> : <FaEyeSlash/> }
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <div className={styles.input_error} style={{ display: passwordError ? 'block' : 'none' }}>Invalid password</div>
                            </div>
                        </div>
                        <div className={styles.input_flex}>
                            <label>Confirm new password</label>
                            <div className={styles.passwordContainer} style={{ outline: confPasswordError ? '1px solid red' : 'none' }}>
                                <input
                                    type={passwordIcon ? 'password' : 'text'} name='confirmpassword' id='confirmpassword' className={styles.passwordInput}
                                    onChange={(e) => setConfPassword(e.target.value)}
                                />
                                <button type='button'  className={styles.passwordIcon} onClick={() => setPasswordIcon(!passwordIcon)}>
                                    { passwordIcon ? <FaEye/> : <FaEyeSlash/> }
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <div className={styles.input_error} style={{ display: confPasswordError ? 'block' : 'none' }}>Invalid confirmation password</div>
                            </div>
                        </div>
                        <button
                            className={styles.submitBtn}
                            disabled={passwordError || confPasswordError ||
                                password < 12 || confPassword < 12
                            } 
                        >
                            Change password
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}