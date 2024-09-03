import { useState } from 'react';
import styles from './styles.module.scss';
import { jwtDecode } from 'jwt-decode';
import CryptoJS from "crypto-js";
import { api } from '../../API/api';

export default function Authentication() {
    const [invalidCode, setInvalidCode] = useState(false);

    const [isWaiting, setIsWaiting] = useState(false);

    const formSubmit = (e) => {
        e.preventDefault();
        try {
            console.log(import.meta.env.VITE_SECRET)
            const authtoken = sessionStorage.getItem("authtoken");
            const decoded = jwtDecode(JSON.stringify(authtoken));
            const decrypted = CryptoJS.AES.decrypt(decoded.code, import.meta.env.VITE_SECRET).toString(CryptoJS.enc.Utf8);

            var writtenCode = ""
            for (var i = 0; i < 6; i++) {
                writtenCode += e.target[i].value;
            }
            if (writtenCode == decrypted) {
                setIsWaiting(true);
                api
                    .post("/user/getauthuser", { boschID: decoded.id })
                    .then((res) => {
                        sessionStorage.setItem("usertoken", res.data.jwt);
                        sessionStorage.removeItem("authtoken");
                        setIsWaiting(false)
                        window.open('/', '_self');
                    })
                    .catch((res) => {
                        setIsWaiting(false);
                    })
            } else {
                setInvalidCode(true);
            }
        } catch (e) {
            console.log(e)
        }
    }

    function onPaste(e) {
        const pasted = e.clipboardData.getData("text/plain").split('');
        const form = document.getElementsByClassName("_authInput_1et5c_7")
        pasted.forEach((item, i) => {
            form[i].value = item
        });
    }

    function nextInput(e) {
        if (e.target.value == "") {
            const crrInput = e.target.id;
            const nextInput = document.getElementById(
                crrInput.substring(0, 4) + `${parseInt(crrInput.substring(4)) - 1}`
            )
            nextInput.focus();
            return;
        }

        const crrInput = e.target.id;
        const nextInput = document.getElementById(
            crrInput.substring(0, 4) + `${parseInt(crrInput.substring(4)) + 1}`
        )
        nextInput.focus();
    }
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <form className={styles.card} onSubmit={formSubmit} autoComplete='off' id='form'>
                        <div className={styles.title}>Authentication</div>
                        <div className={styles.instruction}>Enter the authentication code sent to your email to sign in.</div>
                        <div className={styles.inputFlex}>
                            <input
                                name='code1' id='code1' className={styles.authInput} maxLength={1}
                                onPaste={onPaste} onChange={nextInput}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='code2' id='code2' className={styles.authInput} maxLength={1}
                                onPaste={onPaste} onChange={nextInput}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='code3' id='code3' className={styles.authInput} maxLength={1}
                                onPaste={onPaste} onChange={nextInput}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='code4' id='code4' className={styles.authInput} maxLength={1}
                                onPaste={onPaste} onChange={nextInput}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='code5' id='code5' className={styles.authInput} maxLength={1}

                                onPaste={onPaste} onChange={nextInput}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                            <input
                                name='code6' id='code6' className={styles.authInput} maxLength={1}
                                onPaste={onPaste} onChange={nextInput}
                                style={{ outline: invalidCode ? '1px solid red' : 'none' }}
                            />
                        </div>
                        <div className={styles.error} style={{ display: invalidCode ? 'block' : 'none' }}>
                            Invalid authentication code!
                        </div>
                        <button
                            className={styles.submitBtn}
                            disabled={isWaiting}
                        >
                            <div className={styles.submitBtnText} style={{ display: isWaiting ? 'none' : 'block' }}>
                                Submit
                            </div>
                            <img style={{ display: isWaiting ? 'block' : 'none' }} className={styles.loading} src='./../../../public/loading.svg' alt='loading'/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}