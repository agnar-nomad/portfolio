import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DeviceStats({ stats }) {
  const deviceCounts = stats.reduce((acc, item) => {
    if (acc[item.device]) {
      acc[item.device] += 1;
    } else {
      acc[item.device] = 1;
    }

    return acc;
  }, {});

  const data = Object.entries(deviceCounts)
    .map(([device, count]) => ({
      device,
      count,
    }))
    .slice(0, 5);

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
            {data.map((entry, index) => (
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
