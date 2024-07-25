import styles from './styles.module.scss';

export default function Map() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <h1>Setores</h1>
                    <img className={styles.plant} src='planta.png'/>
                    <button className={styles.ct101} id='ct101' name='ct101'>101</button>
                    <button className={styles.ct201} id='ct201' name='ct201'>201</button>
                    <button className={styles.ct210} id='ct210' name='ct210'>210</button>
                    <button className={styles.ct303} id='ct303' name='ct303'>303</button>
                    <button className={styles.ct304} id='ct304' name='ct304'>304</button>
                    <button className={styles.ct401} id='ct401' name='ct401'>401</button>
                    <button className={styles.ct401a} id='ct401a' name='ct401a'>401-A</button>
                </div>
            </div>
        </>
    )
}