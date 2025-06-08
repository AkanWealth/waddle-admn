import { create } from "zustand";
import analyticsService from "@/utils/analyticsService";

type UserStat = {
  title: string;
  count: number;
  change: string;
  isPositive: boolean;
  type: string;
};

type MonthlyDataPoint = {
  name: string;
  parents: number;
  organizers: number;
};

type AnalyticsStore = {
  userStats: UserStat[];
  monthlyData: MonthlyDataPoint[];
  hasData: boolean;
  loading: boolean;
  fetchAnalytics: () => Promise<void>;
};

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  userStats: [],
  monthlyData: [],
  hasData: true,
  loading: false,
  fetchAnalytics: async () => {
    set({ loading: true });
    const result = await analyticsService.getUserActivityData();
    if (result.success) {
      set({
        userStats: result.data.userStats,
        monthlyData: result.data.monthlyData,
        hasData: result.data.hasData,
        loading: false,
      });
    } else {
      console.error("Error fetching analytics data:", result.error);
      set({ loading: false });
    }
  },
}));
