import styles from './styles.module.scss';

export default function Map() {
    const handleClick = (e) => {
        window.open(`/processes/${e.target.name}`, "_self");
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.col}>
                    <div>
                        <h1>Setores</h1>
                    </div>
                    <img className={styles.plant} src='planta.png' alt='Mapa Bosch'/>
                    <button onClick={handleClick} className={styles.ct101} id={styles.ct} name='ct101'>101</button>
                    <button onClick={handleClick} className={styles.ct201} id={styles.ct} name='ct201'>201</button>
                    <button onClick={handleClick} className={styles.ct210} id={styles.ct} name='ct210'>210</button>
                    <button onClick={handleClick} className={styles.ct303} id={styles.ct} name='ct303'>303</button>
                    <button onClick={handleClick} className={styles.ct304} id={styles.ct} name='ct304'>304</button>
                    <button onClick={handleClick} className={styles.ct401} id={styles.ct} name='ct401'>401</button>
                    <button onClick={handleClick} className={styles.ct401a} id={styles.ct} name='ct401-A'>401-A</button>
                </div>
            </div>
        </>
    )
}