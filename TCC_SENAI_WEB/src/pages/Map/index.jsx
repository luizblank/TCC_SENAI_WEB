import styles from './styles.module.scss';

export default function Map() {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.col}>
                <h1>Setores</h1>
                <img className={styles.plant} src='planta.png'/>
            </div>
        </div>
        </>
    )
}