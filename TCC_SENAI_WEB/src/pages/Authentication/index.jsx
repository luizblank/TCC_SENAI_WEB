import { useState } from 'react';
import styles from './styles.module.scss';
import { jwtDecode } from 'jwt-decode';
import CryptoJS from "crypto-js";
import { SECRET } from '../../env';

export default function Authentication() {
    const [code1, setCode1] = useState("");
    const [code2, setCode2] = useState("");
    const [code3, setCode3] = useState("");
    const [code4, setCode4] = useState("");
    const [code5, setCode5] = useState("");
    const [code6, setCode6] = useState("");

    const [invalidCode, setInvalidCode] = useState(false);

    const formSubmit = (e) => {
        e.preventDefault();
        try {
            const authtoken = sessionStorage.getItem("authtoken");
            const decoded = jwtDecode(JSON.stringify(authtoken));
            const decrypted = CryptoJS.AES.decrypt(decoded.code, SECRET).toString(CryptoJS.enc.Utf8);
            const writtenCode = code1 + code2 + code3 + code4 + code5 + code6;
            if (writtenCode == decrypted) {
                sessionStorage.setItem("token", authtoken); // tem que ajeita isso aqui
                window.open('/', '_self');
            } else {
                setInvalidCode(true);
            }
        } catch (e) {
            console.log(e)
        }
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
                                onChange={(e) => setCode1(e.target.value)}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                                onChange={(e) => setCode2(e.target.value)}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                                onChange={(e) => setCode3(e.target.value)}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                                onChange={(e) => setCode4(e.target.value)}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                                onChange={(e) => setCode5(e.target.value)}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='id' id='id' className={styles.authInput} maxLength={1}
                                onChange={(e) => setCode6(e.target.value)}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                        </div>
                        <div className={styles.error} style={{ display: invalidCode ? 'block' : 'none' }}>
                            Invalid authentication code!
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