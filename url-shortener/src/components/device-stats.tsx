import { ClicksType } from '@/types/supabase';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Payload } from 'recharts/types/component/DefaultTooltipContent';

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
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
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
        <p className=''>{`${payload[0].payload?.device}: ${payload[0].value} ${Number(payload[0].value) == 1 ? "click" : "clicks"}`}</p>
      </div>
    );
  }

  return null;
}