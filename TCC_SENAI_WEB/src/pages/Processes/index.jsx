import { useParams } from 'react-router-dom';
import ProcessCard from '../../components/ProcessCard';
import styles from './styles.module.scss';

export default function Processes() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var { sector } = useParams();
    sector = "Ct-" + sector.slice(2);

    return (
        <>
            <h1 className={styles.title}>{sector}</h1>
            <div className={styles.container}>
                {
                    array.map((a, i) => {
                        return (
                            <ProcessCard key={i}/>
                        )
                    })
                }
            </div>
        </>
    )
}