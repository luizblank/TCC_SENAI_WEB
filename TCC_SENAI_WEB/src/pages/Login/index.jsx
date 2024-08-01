import { useEffect, useState } from 'react';
import { api } from '../../API/api';
import styles from './styles.module.scss';

import CryptoJS from "crypto-js";
import { SECRET } from "../../env"

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [idError, setIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isError, setIsError] = useState(true);
    const [resError, setResError] = useState('deu erro');

    useEffect(() => {
        if (!id)
            return;
        if (id.length !== 6) {
            setIdError(true);
        } else {
            setIdError(false);
        }

        if (!password)
            return;
        if (password.length < 12) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }, [id, password])        

    const formSubmit = (e) => {
        e.preventDefault();
        try {
            const encrypt = CryptoJS.AES.encrypt(password, SECRET).toString();
            api
                .post('/api/userlogin', { id: id, password: encrypt })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((res) => {
                    console.log(res.response.data)
                })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <img className={styles.roberto} src='roberto.webp'/>
                </div>
                <div className={styles.col}>
                    <form className={styles.card} onSubmit={formSubmit} autoComplete='off'>
                        <div className={styles.title}>Login</div>
                        <div className={styles.input_flex} style={{ marginBottom: '20px' }}>
                            <label>ID</label>
                            <input
                                style={{ outline: idError ? '1px solid red' : 'none' }}
                                name='id' id='id'
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_flex}>
                            <label>Senha</label>
                            <input
                                style={{ outline: passwordError ? '1px solid red' : 'none' }}
                                type='password' name='password' id='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className={styles.submitBtn}
                            disabled={idError || passwordError ||
                                id.length != 6 || password.length < 12} 
                        >
                            Submit
                        </button>
                    </form>
                    <div className={styles.error}>
                        sadasdas
                    </div>
                </div>
            </div>
        </>
    )
}