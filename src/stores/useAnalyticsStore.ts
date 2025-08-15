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
  fetchAnalytics: (startDate?: string, endDate?: string) => Promise<void>;
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
  bookingPeriod: "7days" | "monthly" | "yearly";
  isBookingLoading: boolean;
  bookingError: string | null;
  fetchEventAnalytics: (startDate?: string, endDate?: string) => Promise<void>;
  fetchBookingData: (period?: "7days" | "monthly" | "yearly") => Promise<void>;
}

export const useEventAnalyticsStore = create<EventAnalyticsState>((set) => ({
  eventStats: [],
  topEvents: [],
  bookingData: [],
  hasData: false,
  isLoading: false,
  error: null,
  bookingPeriod: "7days",
  isBookingLoading: false,
  bookingError: null,

  fetchEventAnalytics: async (startDate?: string, endDate?: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await analyticsService.getEventActivityData(
        startDate,
        endDate
      );

      if (response.success) {
        set({
          eventStats: response.data.eventStats || [],
          topEvents: response.data.topEvents || [],
          hasData: response.data.hasData || false,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          eventStats: [],
          topEvents: [],
          hasData: false,
          isLoading: false,
          error: response.error || "Failed to fetch event analytics",
        });
      }
    } catch (error) {
      set({
        eventStats: [],
        topEvents: [],
        hasData: false,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch event analytics",
      });
    }
  },

  fetchBookingData: async (
    period: "7days" | "monthly" | "yearly" = "7days"
  ) => {
    set({ isBookingLoading: true, bookingError: null, bookingPeriod: period });

    try {
      const response = await analyticsService.getEventBookingActivityData(
        period
      );

      if (response.success) {
        set({
          bookingData: response.data || [],
          isBookingLoading: false,
          bookingError: null,
        });
      } else {
        set({
          bookingData: [],
          isBookingLoading: false,
          bookingError: response.error || "Failed to fetch booking data",
        });
      }
    } catch (error) {
      set({
        bookingData: [],
        isBookingLoading: false,
        bookingError:
          error instanceof Error
            ? error.message
            : "Failed to fetch booking data",
      });
    }
  },
}));

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  userStats: [],
  monthlyData: [],
  hasData: true,
  loading: false,
  fetchAnalytics: async (startDate?: string, endDate?: string) => {
    set({ loading: true });
    const result = await analyticsService.getUserActivityData(
      startDate,
      endDate
    );
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
