"use client";
import { useRevenueStore } from "@/stores/useBookingStore";
import { useEffect } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function RevenueChart() {
  const { data, fetchData } = useRevenueStore();

  useEffect(() => {
    fetchData("monthly");
  }, [fetchData]);

  const totalRevenue = data.reduce((acc, item) => acc + item.amount, 0);
  const percentGrowth = 27; // You can calculate this dynamically as needed

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[#7E8494] text-xl">Total revenue</h2>
          <p className="text-[32px] font-bold text-[#303237]">
            £{totalRevenue.toLocaleString()}
          </p>
          <p className="text-[#28A745] text-sm">↑ {percentGrowth}%</p>
        </div>
        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-[12px]">
          LAST YEAR ▾
        </button>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#999" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {

  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2853A6] text-white px-7 py-3 rounded-[12px] shadow">
        <p className="text-xs pb-2">IN TOTAL</p>
        <p className="text-2xl font-bold">
          £{payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-center">{payload[0].label}</p>
      </div>
    );
  }
  return null;
};
