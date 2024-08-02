import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProcessCard from '../../components/ProcessCard';
import styles from './styles.module.scss';
import { api } from '../../API/api';

export default function Processes() {
    var [data, setData] = useState([]);
    var { sector } = useParams();
    const displaySector = "Ct-" + sector.slice(2);

    useEffect(() => {
        api
            .get(`/machine/getmachinesbysector/${sector}`)
            .then((res) => {
                setData(res.data.machines);
                console.log(res.data.machines);
            })
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.nav}>
                    <input id='search' name='id'/>
                    <h1 className={styles.title}>
                        {displaySector}
                    </h1>
                    <button>Verify Data</button>
                </div>
                { 
                    data.length > 0 && 
                    data.map((item, i) => {
                        return <ProcessCard process={item.Process} approved={item.Approved} denied={item.Denied} scanned={item.Scanned} key={i}/>
                    })
                }
            </div>
        </>
    )
}