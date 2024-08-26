import { useEffect, useState } from 'react';
import { api } from '../../API/api';
import styles from './styles.module.scss';
import { GoAlert } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

import CryptoJS from "crypto-js";
import { SECRET } from "../../env"

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [idError, setIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isError, setIsError] = useState(undefined);
    const [resError, setResError] = useState('');

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
            const encrypt = CryptoJS.AES.encrypt(password, SECRET).toString();
            api
                .post('/user/userlogin', { id: id, password: encrypt })
                .then((res) => {
                    sessionStorage.setItem("authtoken", res.data.jwt);
                    window.open('/auth', '_self');
                })
                .catch((res) => {
                    setResError(res.response.data.error);
                    setIsError(true);
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
                                <div className={styles.input_error} style={{ display: idError ? 'block' : 'none' }}>Usuário inválido</div>
                            </div>
                        </div>
                        <div className={styles.input_flex}>
                            <label>Senha</label>
                            <input
                                style={{ outline: passwordError ? '1px solid red' : 'none' }}
                                type='password' name='password' id='password' className={styles.loginInput}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div style={{ position: 'relative' }}>
                                <div className={styles.input_error} style={{ display: passwordError ? 'block' : 'none' }}>Senha inválida</div>
                            </div>
                        </div>
                        <button
                            className={styles.submitBtn}
                            disabled={idError || passwordError ||
                                id.length != 6 || password.length < 12} 
                        >
                            Sign In
                        </button>
                        <div className={styles.forgeteverything}>
                            <a className={styles.forgot} onClick={() => window.open('/auth', '_self')}>Forgot your password?</a>
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