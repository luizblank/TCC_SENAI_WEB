import { useState } from 'react';
import styles from './styles.module.scss';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function UpdatePassword() {
    const [passwordIcon, setPasswordIcon] = useState(true);

    const formSubmit = () => {

    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <form className={styles.card} onSubmit={formSubmit} autoComplete='off'>
                        <div className={styles.title}>Creating a new password</div>
                        <div className={styles.input_flex} style={{ marginBottom: '20px' }}>
                            <label>New Password</label>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={passwordIcon ? 'password' : 'text'} name='newpassword' id='newpassword' className={styles.passwordInput}
                                />
                                <button type='button' className={styles.passwordIcon} onClick={() => setPasswordIcon(!passwordIcon)}>
                                    { passwordIcon ? <FaEye/> : <FaEyeSlash/> }
                                </button>
                            </div>
                        </div>
                        <div className={styles.input_flex}>
                            <label>Confirm new password</label>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={passwordIcon ? 'password' : 'text'} name='confirmpassword' id='confirmpassword' className={styles.passwordInput}
                                />
                                <button type='button'  className={styles.passwordIcon} onClick={() => setPasswordIcon(!passwordIcon)}>
                                    { passwordIcon ? <FaEye/> : <FaEyeSlash/> }
                                </button>
                            </div>
                        </div>
                        <button
                            className={styles.submitBtn}
                        >
                            Change password
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}