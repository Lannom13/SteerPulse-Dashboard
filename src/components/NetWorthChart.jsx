import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { useEffect, useState } from "react";

export default function NetWorthChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        const res = await fetch(
          "https://lpczocldblkfrhnlpqgf.supabase.co/rest/v1/net_worth_snapshots?select=value,recorded_at&order=recorded_at.asc",
          {
            headers: {
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwY3pvY2xkYmxrZnJobmxwcWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjQ2MTYsImV4cCI6MjA2NTk0MDYxNn0.OEtG4Kbk7r_X2M7OKgOsGbkd8WDi-IhhyusuWqUgsoY",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwY3pvY2xkYmxrZnJobmxwcWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjQ2MTYsImV4cCI6MjA2NTk0MDYxNn0.OEtG4Kbk7r_X2M7OKgOsGbkd8WDi-IhhyusuWqUgsoY"
            }
          }
        );

        const json = await res.json();

        const formatted = json.map((snap) => ({
          date: new Date(snap.recorded_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }),
          value: snap.value
        }));

        setData(formatted);
      } catch (err) {
        console.error("📉 Failed to load net worth history:", err);
      }
    };

    fetchSnapshots();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-white text-lg font-semibold mb-2">📈 Net Worth Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#2d2d2d" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis
            stroke="#ccc"
            tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(val) => `$${val.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151"
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0EA5E9"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
