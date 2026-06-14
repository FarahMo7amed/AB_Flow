import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Area,
} from "recharts";
import { useEffect, useState } from "react";

const initialData = [
  {
    day: 1,
    probability: 0.52,
    lower: 0.45,
    upper: 0.58,
  },

  {
    day: 2,
    probability: 0.61,
    lower: 0.55,
    upper: 0.67,
  },

  {
    day: 3,
    probability: 0.72,
    lower: 0.66,
    upper: 0.78,
  },

  {
    day: 4,
    probability: 0.84,
    lower: 0.79,
    upper: 0.89,
  },

  {
    day: 5,
    probability: 0.91,
    lower: 0.87,
    upper: 0.95,
  },
];

export default function SequentialAnalysisChart() {

  const [data, setData] = useState(initialData);

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {

  const interval = setInterval(() => {

    setData((prev) => {

      const lastDay = prev[prev.length - 1].day;

      const lastProbability =
        prev[prev.length - 1].probability;

      const nextProbability = Math.min(
        0.99,
        lastProbability + Math.random() * 0.03
      );

      return [
        ...prev,

        {
          day: lastDay + 1,

          probability: Number(
            nextProbability.toFixed(2)
          ),

          lower: Number(
            (nextProbability - 0.05).toFixed(2)
          ),

          upper: Number(
            (nextProbability + 0.05).toFixed(2)
          ),
        },
      ];
    });

  }, 3000);

  return () => clearInterval(interval);

}, []);


return (
  <div>

    <div className="flex items-center gap-3 mb-4">

      <div className="relative flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
      </div>

      <p className="text-sm text-green-400 font-medium">
        Live Experiment Running
      </p>

    </div>

    <div className="w-full h-[400px]">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.15}
          />

          <XAxis
            dataKey="day"
            tick={{ fill: "#94a3b8" }}
            label={{
              value: "Day",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis
            domain={[0, 1]}
            tick={{ fill: "#94a3b8" }}
          />

          <Tooltip />

          <ReferenceLine
            y={0.95}
            stroke="#22c55e"
            strokeDasharray="5 5"
            label="Decision Threshold"
          />

          <Area
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="#3b82f6"
            fillOpacity={0.08}
          />

          <Line
            type="monotone"
            dataKey="probability"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>
);
}