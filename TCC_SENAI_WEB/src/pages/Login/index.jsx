import { useEffect, useState } from 'react';
import { api } from '../../API/api';
import styles from './styles.module.scss';
import { GoAlert } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

import CryptoJS from "crypto-js";

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [idError, setIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isError, setIsError] = useState(undefined);
    const [resError, setResError] = useState('');

    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        if (!id)
            return;
        if (id.length !== 6) {
            setIdError(true);
        } else {
            setIdError(false);
        }
    }, [id])
    
    useEffect(() => {
        if (!password)
            return;
        if (password.length < 12) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }, [password])

    const formSubmit = (e) => {
        e.preventDefault();
        try {
            const encrypt = CryptoJS.AES.encrypt(password, import.meta.env.VITE_SECRET).toString();
            setIsWaiting(true);
            api
                .post('/user/userlogin', { id: id, password: encrypt })
                .then((res) => {
                    sessionStorage.setItem("authtoken", res.data.jwt);
                    setIsWaiting(false);
                    window.open('/auth', '_self');
                })
                .catch((res) => {
                    setResError(res.response.data.error);
                    setIsError(true);
                    setIsWaiting(false);
                })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.col} id={styles.roberto}>
                    <img className={styles.roberto} src='roberto.png'/>
                </div>
                <div className={styles.col}>
                    <form className={styles.card} onSubmit={formSubmit} autoComplete='off'>
                        <div className={styles.title}>Login</div>
                        <div className={styles.input_flex} style={{ marginBottom: '20px' }}>
                            <label>ID</label>
                            <input
                                style={{ outline: idError ? '1px solid red' : 'none' }}
                                name='id' id='id' className={styles.loginInput}
                                onChange={(e) => setId(e.target.value)}
                            />
                            <div style={{ position: 'relative' }}>
                                <div className={styles.input_error} style={{ display: idError ? 'block' : 'none' }}>Invalid user</div>
                            </div>
                        </div>
                        <div className={styles.input_flex}>
                            <label>Password</label>
                            <input
                                style={{ outline: passwordError ? '1px solid red' : 'none' }}
                                type='password' name='password' id='password' className={styles.loginInput}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div style={{ position: 'relative' }}>
                                <div className={styles.input_error} style={{ display: passwordError ? 'block' : 'none' }}>Invalid password</div>
                            </div>
                        </div>
                        <button
                            className={styles.submitBtn}
                            disabled={
                                idError || passwordError ||
                                id.length != 6 || password.length < 12 ||
                                isWaiting
                            } 
                        >
                            <div className={styles.submitBtnText} style={{ display: isWaiting ? 'none' : 'block' }}>
                                Sign In
                            </div>
                            <img style={{ display: isWaiting ? 'block' : 'none' }} className={styles.loading} src='/loading.svg' alt='loading'/>
                        </button>
                        <div className={styles.forgeteverything}>
                            <a className={styles.forgot} onClick={() => window.open('/sendverification', '_self')}>Forgot your password?</a>
                        </div>
                    </form>
                    <div className={styles.error} style={{ display: isError ? 'flex' : 'none' }}>
                        <button className={styles.close} onClick={() => { setIsError(!isError) }}>
                            <IoMdClose/>
                        </button>
                        <GoAlert style={{ marginRight: '15px', strokeWidth: 1 }}/>
                        { resError }
                    </div>
                </div>
            </div>
        </>
    )
}