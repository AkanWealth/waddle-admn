/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client"
import { useRevenueStore } from "@/stores/useBookingStore";
import { useEffect, useState, useRef } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function RevenueChart() {
    const { data, fetchData } = useRevenueStore();
      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef();
      const [selectedOption, setSelectedOption] = useState("LAST YEAR");


      // Close dropdown when clicking outside
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
          ) {
            setIsOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }, []);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    const totalRevenue = data.reduce((acc, item) => acc + item.amount, 0);
    const percentGrowth = 27; // You can calculate this dynamically as needed
    const options = ["LAST WEEK", "LAST MONTH", "LAST YEAR"];

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
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-[12px] focus:outline-none"
            >
              {selectedOption} ▾
            </button>

            {isOpen && (
              <div className="absolute mt-2 w-40  rounded-md shadow-lg z-10">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      console.log(`Selected: ${option}`);
                      setIsOpen(false);
                      setSelectedOption(option);
                    }}
                    className="block w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-sm mt-3 text-sm text-[#2853A6] hover:bg-blue-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
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
          <p className="text-2xl font-bold">£{payload[0].value.toLocaleString()}</p>
          <p className="text-xs text-center">03 June</p>
        </div>
      );
    }
    return null;
  };