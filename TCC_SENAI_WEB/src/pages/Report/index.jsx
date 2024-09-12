import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../API/api';
import styles from './styles.module.scss';

export default function Report() {
    const [data, setData] = useState(null);
    const { sector } = useParams();
    const colors = ["#ffc561", "#fa4520", "#38e8ff"];

    useEffect(() => {
        api
            .get(`/machine/getmachinesbysector/${sector}`)
            .then((res) => {
                setData(res.data.machines);
                console.log(res.data.machines[0])
            });
    }, [])

    return (
        <>
            {
                data &&
                <div style={{ marginTop: "50px" }}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Process" />
                        <YAxis dataKey="Scanned" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Rejected" stackId="a" fill="#ffc561" />
                        <Bar dataKey="Red" stackId="a" fill="#fa4520" />
                        <Bar dataKey="Blue" stackId="a" fill="#38e8ff" />
                    </BarChart>
                </div>
            }
        </>
    )
}