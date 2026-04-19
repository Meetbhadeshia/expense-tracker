import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PieProps {
    chartSeries: number[];
    showDataLabels?: boolean;
    labels: string[]
}

export default function Pie({ chartSeries, showDataLabels, labels }: PieProps) {
    const chartOptions: ApexOptions = {
        labels,
        chart: {
            foreColor: '#ffffff', // All text outside slices (legend values, axis) white
        },
        legend: {
            labels: {
                colors: '#ffffff', // Legend text white
            }
        },
        responsive: [{
            breakpoint: 768,
            options: {
                chart: {
                    width: 320,
                    height: 320
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        dataLabels: {
            enabled: true,
            formatter: (val, opts) => {
                if (!opts) return `${Number(val).toFixed(2)}%`;
                return showDataLabels
                    ? `${Number(val).toFixed(2)}%` // Show percentage with 2 decimals
                    : `${Number((opts.w as unknown as { config: { series: number[] } }).config.series[opts.seriesIndex]).toFixed(2)}`; // Show raw number with 2 decimals
            }
        },
    };

    return (
        <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            width={500}
            height={500}
        />
    );
}
