import styles from './styles.module.scss';
import processo from '../../../public/processo.png'
import VideoStream from '../VideoStream';

// eslint-disable-next-line react/prop-types
export default function ProcessCard({ process, approved, denied, scanned }) {
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
                        <div className={styles.card_content}>Approved today: { approved }</div>
                        <div className={styles.card_content}>Denied today: { denied }</div>
                        <div className={styles.card_content}>Scanned today: { scanned}</div>
                    </div>
                    <div/>
                </div>
            </div>
        </>
    )
}