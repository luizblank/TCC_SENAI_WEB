import ProcessCard from '../../components/ProcessCard';
import styles from './styles.module.scss';

export default function Processes() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <>
            <div className={styles.container}>
                    {
                        array.map((i) => {
                            return(
                                <div className={styles.col} key={i}>
                                    <ProcessCard/>
                                </div>
                            )
                        })
                    }
            </div>
        </>
    )
}