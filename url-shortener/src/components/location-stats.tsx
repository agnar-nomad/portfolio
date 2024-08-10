import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function LocationStats({ stats }) {
  const cityCounts = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else {
      acc[item.city] = 1;
    }

    return acc;
  }, {});

  const data = Object.entries(cityCounts)
    .map(([city, count]) => ({
      city,
      count,
    }))
    .slice(0, 5);

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
