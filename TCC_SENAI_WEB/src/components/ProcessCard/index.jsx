import styles from './styles.module.scss';
import camera from '../../../public/camera.jpg'
import processo from '../../../public/processo.png'
import VideoStream from '../VideoStream';

export default function ProcessCard() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.cam}>
                    <VideoStream/>
                </div>
                <div className={styles.card}>
                    <div className={styles.row}>
                        <img src={processo} className={styles.card_image}/>
                        <div className={styles.card_title}>Process 8763</div>
                    </div>
                    <div>
                        <div className={styles.card_content}>State: Approved</div>
                        <div className={styles.card_content}>Scanned today: 1372</div>
                    </div>
                    <div/>
                </div>
            </div>
        </>
    )
}