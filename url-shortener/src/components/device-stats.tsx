import { ClicksType } from '@/types/supabase';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


type DeviceStatsProps = {
  stats: ClicksType[]
}

export default function DeviceStats({ stats }: DeviceStatsProps) {
  const deviceCounts = stats.reduce((acc, item) => {
    const deviceType = item.device || "unknown"
    if (acc[deviceType]) {
      acc[deviceType] += 1;
    } else {
      acc[deviceType] = 1;
    }

    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(deviceCounts)
    .map(([device, count]) => ({
      device,
      count,
    }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={data}
            labelLine={false}
            label={({ device, percent }) =>
              `${device}: ${(percent * 100).toFixed(0)}%`
            }
            dataKey="count">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
