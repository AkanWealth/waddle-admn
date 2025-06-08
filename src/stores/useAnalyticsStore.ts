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

//Events Types
interface EventStat {
  type:
    | "total_events"
    | "active_events"
    | "cancelled_events"
    | "total_attendees";
  title: string;
  count: number;
  change: string;
  isPositive: boolean;
}

interface TopEvent {
  id: number;
  event: string;
  vendor: string;
  attendees: number;
}

interface BookingData {
  day: string;
  bookings: number;
}

interface EventAnalyticsState {
  eventStats: EventStat[];
  topEvents: TopEvent[];
  bookingData: BookingData[];
  hasData: boolean;
  isLoading: boolean;
  error: string | null;
  fetchEventAnalytics: (startDate?: string, endDate?: string) => Promise<void>;
}

export const useEventAnalyticsStore = create<EventAnalyticsState>((set) => ({
  eventStats: [],
  topEvents: [],
  bookingData: [],
  hasData: false,
  isLoading: false,
  error: null,

  fetchEventAnalytics: async (startDate?: string, endDate?: string) => {
    set({ isLoading: true, error: null });

    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      set({ isLoading: true });
      const response = await analyticsService.getEventActivityData();

      if (response.success) {
      }

      set({
        eventStats: response.data.eventStats || [],
        topEvents: response.data.topEvents || [],
        bookingData: response.data.bookingData || [],
        hasData: response.data.hasData || false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        eventStats: [],
        topEvents: [],
        bookingData: [],
        hasData: false,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch event analytics",
      });
    }
  },
}));

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
