import styles from './styles.module.scss';
import processo from '../../../public/processo.png'
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
                        <div className={styles.card_content}>Reds today: { red }</div>
                        <div className={styles.card_content}>Blues today: { blue }</div>
                        <div className={styles.card_content}>Rejected today: { rejected }</div>
                        <div className={styles.card_content}>Scanned today: { scanned }</div>
                    </div>
                    <div/>
                </div>
            </div>
        </>
    )
}