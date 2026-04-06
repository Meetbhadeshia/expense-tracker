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
        dataLabels: {
            enabled: true,
            formatter: (val, opts) => {
                if (!opts) return `${Number(val).toFixed(1)}%`;
                return showDataLabels
                    ? `${Number(val).toFixed(1)}%` // Show percentage if true
                    : `${(opts.w as unknown as { config: { series: number[] } }).config.series[opts.seriesIndex]}`; // Show raw number if false
            }
        },
    };

    return (
        <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            height={500}
            width={500}
            style={{ height: '20vh' }}
        />
    );
}
