"use client";
import { useState, useEffect } from "react";
import {
  UsersRound,
  UserRound,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import analyticsService from "@/utils/analyticsService";
import { useAnalyticsStore } from "@/stores/useAnalyticsStore";

const iconMap = {
  total_users: <UsersRound className="h-5 w-5 text-white" />,
  parents: <UserRound className="h-5 w-5 text-white" />,
  organisers: <UserRoundCheck className="h-5 w-5 text-white" />,
  inactive: <UserRoundX className="h-5 w-5 text-white" />,
};

const colorMap = {
  total_users: "bg-emerald-500",
  parents: "bg-blue-600",
  organisers: "bg-orange-500",
  inactive: "bg-red-500",
};

export default function UserActivity() {
  // Dummy data for user stats cards
  // const userStats = [
  //   {
  //     title: "Total Users",
  //     count: 92,
  //     change: "+4.3%",
  //     isPositive: true,
  //     bgColor: "bg-emerald-500",
  //     icon: <UsersRound className="h-5 w-5 text-white"/>
  //   },
  //   {
  //     title: "Parents",
  //     count: 80,
  //     change: "-1.2%",
  //     isPositive: false,
  //     bgColor: "bg-blue-600",
  //     icon: <UserRound className="h-5 w-5 text-white"/>
  //   },
  //   {
  //     title: "Event Organisers",
  //     count: 12,
  //     change: "+4.3%",
  //     isPositive: true,
  //     bgColor: "bg-orange-500",
  //     icon: <UserRoundCheck className="h-5 w-5 text-white"/>
  //   },
  //   {
  //     title: "Inactive User",
  //     count: 5,
  //     change: "+4.3%",
  //     isPositive: true,
  //     bgColor: "bg-red-500",
  //     icon: <UserRoundX className="h-5 w-5 text-white"/>
  //   }
  // ];

  // Function to simulate API data fetch
  const { userStats, monthlyData, hasData, fetchAnalytics } =
    useAnalyticsStore();
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // For demo: toggle between data and empty state
  const toggleDataState = () => {
    setHasData(!hasData);
  };

  return (
    <div className="font-inter">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {userStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full ${
                  colorMap[stat.type]
                } flex items-center justify-center mr-4`}
              >
                {iconMap[stat.type]}
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600 font-medium text-sm">
                  {stat.title}
                </p>
                <div className="flex flex-col items-baseline">
                  <h2 className="text-2xl font-bold">{stat.count}</h2>
                  <span
                    className={`text-xs ml-2 ${
                      stat.isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change} vs last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-black">User Growth</h2>
          <div className="flex space-x-6 mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
              <span className="text-sm text-black">Parents</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span className="text-sm text-black">Event Organisers</span>
            </div>
          </div>
        </div>

        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="parents"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="organizers"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="bg-white rounded-lg p-10 text-center flex flex-col items-center">
            <div className="w-50 rounded-full flex items-center justify-center mb-4">
              <Image
                src="/Empty.png"
                alt="No signups yet"
                width={134}
                height={89}
                className="w-full h-full text-white"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">No New Signups Yet</h3>
            <p className="text-gray-500 text-sm max-w-md">
              User registration trends will appear here as more parents and
              vendors join the platform.
            </p>
          </div>
        )}
      </div>

      {/* Button to toggle empty state (for demo purposes only) */}
    
    </div>
  );
}
