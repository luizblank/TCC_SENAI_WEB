import styles from './styles.module.scss';
import processo from '/processo.png'
import VideoStream from '../VideoStream';

// eslint-disable-next-line react/prop-types
export default function ProcessCard({ process, red, blue, rejected, scanned }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.cam}>
                    <VideoStream/>
                </div>
                <div className={styles.card}>
                    <div className={styles.row}>
                        <img src={processo} className={styles.card_image}/>
                        <div className={styles.card_title}>Process { process }</div>
                    </div>
                    <div>
                        <div className={styles.card_content}>Red: { red }</div>
                        <div className={styles.card_content}>Blue: { blue }</div>
                        <div className={styles.card_content}>Rejected: { rejected }</div>
                        <div className={styles.card_content}>Scanned today: { scanned }</div>
                    </div>
                    <div/>
                </div>
            </div>
        </>
    )
}