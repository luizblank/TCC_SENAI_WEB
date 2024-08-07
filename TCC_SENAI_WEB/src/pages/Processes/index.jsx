import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProcessCard from '../../components/ProcessCard';
import styles from './styles.module.scss';
import { FaSearch } from "react-icons/fa";
import { api } from '../../API/api';

export default function Processes() {
    const [data, setData] = useState([]);
    const [dataSave, setDataSave] = useState([])
    const { sector } = useParams();
    const displaySector = "Ct-" + sector.slice(2);

    useEffect(() => {
        api
            .get(`/machine/getmachinesbysector/${sector}`)
            .then((res) => {
                setData(res.data.machines);
                setDataSave(res.data.machines);
            });
    }, []);

    const updateProcesses = (e) => {
        if (e.target.value == '') {
            setData(dataSave);
            return;
        }
        setData(dataSave.filter((data) => data.Process.includes(e.target.value)));
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.nav}>
                    <div>
                        <h1 className={styles.title}>
                            {displaySector}
                        </h1>
                        <div className={styles.searchContainer}>
                            <input
                                id='search' name='id'
                                className={styles.searchInput}
                                onChange={updateProcesses}
                            />
                            <FaSearch/>
                        </div>
                    </div>
                </div>
                { 
                    data.length > 0 && 
                    data.map((item, i) => {
                        return <ProcessCard process={item.Process} approved={item.Approved} denied={item.Denied} scanned={item.Scanned} key={i}/>
                    })
                }
                {
                    data.length <= 0 &&
                    <div>
                        No processes available.
                    </div>
                }
            </div>
        </>
    )
}