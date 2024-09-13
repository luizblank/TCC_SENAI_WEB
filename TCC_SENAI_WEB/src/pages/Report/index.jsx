import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../API/api';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import styles from './styles.module.scss';

export default function Report() {
    const [data, setData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const { sector } = useParams();
    const displaySector = "Ct-" + sector.slice(2);

    useEffect(() => {
        api
            .get(`/machine/getmachinesbysector/${sector}`)
            .then((res) => {
                setData(res.data.machines);

                let totalRejected = 0;
                res.data.machines.forEach(machine => {
                    totalRejected += machine.Rejected
                });
                let pieData = [];
                res.data.machines.forEach(machine => {
                    pieData.push({
                        value: machine.Rejected,
                        percentage: Math.round(machine.Rejected * 100 / totalRejected, 2),
                        label: `Process ${machine.Process.trim()}`
                    })
                });
                setPieData(pieData)
            });
    }, [])

    return (
        <>
            <div className={styles.page}>
                <h1 className={styles.report_title}>{ displaySector } Reports</h1>
                <div className={styles.container}>
                    {
                        data &&
                        <div className={styles.col}>
                            <div className={styles.chart}>
                                <h2>Scanned parts per process</h2>
                                <BarChart
                                    dataset={data}
                                    series={[
                                        { dataKey: 'Red', label: 'Red', stack: 'Scanned', color: '#fa4520' },
                                        { dataKey: 'Blue', label: 'Blue', stack: 'Scanned', color: '#38e8ff' },
                                        { dataKey: 'Rejected', label: 'Rejected', stack: 'Scanned', color: '#ffc561' },
                                    ]}
                                    xAxis={[{ scaleType: 'band', dataKey: 'Process', label: 'Processes' }]}
                                    yAxis={[{ dataKey: 'Scanned', label: 'Scanned' }]}
                                    width={800}
                                    height={450}
                                />
                            </div>
                        </div>
                    }
                    {
                        pieData &&
                        <div className={styles.col}>
                            <div className={styles.chart}>
                                <h2>Percentage of rejected parts per process</h2>
                                <PieChart
                                    series={[{
                                        arcLabel: (item) => `${item.percentage}% (${item.value})`,
                                        arcLabelMinAngle: 35,
                                        data: pieData
                                    }]}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: {
                                                vertical: 'top',
                                                horizontal: 'middle'
                                            }
                                        }
                                    }}
                                    margin={{ top: 60, left: 50, right: 50, bottom: 50 }}
                                    width={800}
                                    height={450}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}