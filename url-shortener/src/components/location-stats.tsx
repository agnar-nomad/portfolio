import { ClicksType } from '@/types/supabase';
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Payload } from 'recharts/types/component/DefaultTooltipContent';

type LocationStatsProps = {
  stats: ClicksType[]
}

export default function LocationStats({ stats }: LocationStatsProps) {

  const cityCounts = stats.reduce((acc, item) => {
    const city = item.city || "unknown"
    if (acc[city]) {
      acc[city] += 1;
    } else {
      acc[city] = 1;
    }
    return acc;
  }, {} as Record<string, number>)

  const data = Object.entries(cityCounts)
    .map(([city, count]) => ({
      city,
      visits: count,
      country: stats.find(stat => stat.city === city)?.country || ""
    }))
    .slice(0, 10);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart width={700} height={300} data={data}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="visits" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


type CustomTooltipProps = {
  payload?: Array<Payload<number, string>>,
  label?: string,
  active?: boolean
}
function CustomTooltip({ payload, active }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-50 border-gray-400 border text-gray-800 p-2 w-max">
        <p className=''>{`${payload[0].payload?.city}, ${payload[0].payload?.country}`}</p>
        <p className=''>{`Visit count : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}