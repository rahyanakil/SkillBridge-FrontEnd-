"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Bar chart: bookings by status ───────────────────────────────────────────
interface BookingBarChartProps {
  bookings: { status: string }[];
  title?: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING:   "#f59e0b",
  ACCEPTED:  "#10b981",
  REJECTED:  "#f43f5e",
  COMPLETED: "#6366f1",
  CANCELLED: "#94a3b8",
};

export function BookingBarChart({ bookings, title = "Bookings by Status" }: BookingBarChartProps) {
  const counts: Record<string, number> = {};
  for (const b of bookings) counts[b.status] = (counts[b.status] ?? 0) + 1;

  const data = Object.entries(counts).map(([status, count]) => ({
    status: status.charAt(0) + status.slice(1).toLowerCase(),
    count,
    fill: STATUS_COLORS[status] ?? "#6366f1",
  }));

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-slate-800 font-bold text-sm mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="35%">
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="status" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
            cursor={{ fill: "rgba(99,102,241,0.05)" }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Pie chart: role / category distribution ─────────────────────────────────
interface PieChartProps {
  data: { name: string; value: number; color: string }[];
  title?: string;
}

export function DistributionPieChart({ data, title = "Distribution" }: PieChartProps) {
  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-slate-800 font-bold text-sm mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
