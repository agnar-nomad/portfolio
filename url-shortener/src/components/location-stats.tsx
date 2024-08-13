import { ClicksType } from '@/types/supabase';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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
  }, {} as Record<string, number>);

  const data = Object.entries(cityCounts)
    .map(([city, count]) => ({
      city,
      count,
    }))
    .slice(0, 10);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={data}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{ color: 'green' }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
