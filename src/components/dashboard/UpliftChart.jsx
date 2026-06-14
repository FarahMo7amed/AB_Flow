import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

const upliftData = [
  {
    percentile: 10,
    model: 0.12,
    random: 0.03,
    perfect: 0.16,
  },

  {
    percentile: 20,
    model: 0.21,
    random: 0.06,
    perfect: 0.28,
  },

  {
    percentile: 40,
    model: 0.39,
    random: 0.12,
    perfect: 0.47,
  },

  {
    percentile: 60,
    model: 0.56,
    random: 0.18,
    perfect: 0.69,
  },

  {
    percentile: 80,
    model: 0.74,
    random: 0.24,
    perfect: 0.88,
  },

  {
    percentile: 100,
    model: 0.91,
    random: 0.30,
    perfect: 1,
  },
];

const featureImportance = [
  {
    feature: "Device Type",
    score: 92,
  },

  {
    feature: "Traffic Source",
    score: 81,
  },

  {
    feature: "Country",
    score: 72,
  },

  {
    feature: "Returning User",
    score: 64,
  },

  {
    feature: "Session Duration",
    score: 55,
  },
];

const topUsers = [
  {
    id: "USR-1042",
    uplift: "+18%",
  },

  {
    id: "USR-1843",
    uplift: "+16%",
  },

  {
    id: "USR-2281",
    uplift: "+14%",
  },

  {
    id: "USR-9912",
    uplift: "+13%",
  },

  {
    id: "USR-7734",
    uplift: "+11%",
  },
];

export default function UpliftChart() {

  return (
    <div>

      {/* METRIC CARDS */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="rounded-2xl bg-secondary/20 p-5">
          <p className="text-sm text-muted-foreground mb-2">
            AUUC
          </p>

          <h3 className="text-3xl font-bold text-foreground">
            0.73
          </h3>
        </div>

        <div className="rounded-2xl bg-secondary/20 p-5">
          <p className="text-sm text-muted-foreground mb-2">
            Qini Score
          </p>

          <h3 className="text-3xl font-bold text-foreground">
            0.58
          </h3>
        </div>

        <div className="rounded-2xl bg-secondary/20 p-5">
          <p className="text-sm text-muted-foreground mb-2">
            Best Segment
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Mobile Users
          </h3>
        </div>

      </div>

      {/* UPLIFT CURVE */}

      <div className="rounded-2xl border border-border p-5 mb-8">

        <h2 className="text-xl font-bold text-foreground mb-6">
          Uplift Curve
        </h2>

        <div className="w-full h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={upliftData}>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.15}
              />

              <XAxis
                dataKey="percentile"
                tick={{ fill: "#94a3b8" }}
              />

              <YAxis
                tick={{ fill: "#94a3b8" }}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="model"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.15}
              />

              <Line
                type="monotone"
                dataKey="random"
                stroke="#94a3b8"
                strokeDasharray="5 5"
              />

              <Line
                type="monotone"
                dataKey="perfect"
                stroke="#22c55e"
                strokeDasharray="4 4"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* FEATURE IMPORTANCE */}

      <div className="rounded-2xl border border-border p-5 mb-8">

        <h2 className="text-xl font-bold text-foreground mb-6">
          Feature Importance
        </h2>

        <div className="space-y-5">

          {featureImportance.map((item) => (

            <div key={item.feature}>

              <div className="flex items-center justify-between mb-2">

                <p className="text-sm text-foreground">
                  {item.feature}
                </p>

                <p className="text-sm text-muted-foreground">
                  {item.score}%
                </p>

              </div>

              <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">

                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${item.score}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* TOP USERS TABLE */}

      <div className="rounded-2xl border border-border p-5">

        <h2 className="text-xl font-bold text-foreground mb-6">
          Top Users by Predicted Uplift
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-border">

                <th className="text-left py-3 text-muted-foreground">
                  User ID
                </th>

                <th className="text-left py-3 text-muted-foreground">
                  Predicted Uplift
                </th>

              </tr>

            </thead>

            <tbody>

              {topUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b border-border/40"
                >

                  <td className="py-4 text-foreground">
                    {user.id}
                  </td>

                  <td className="py-4 text-green-400 font-medium">
                    {user.uplift}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}