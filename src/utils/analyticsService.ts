import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

class AnalyticsService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async getUserActivityData(startDate?: string, endDate?: string) {
    try {
      let url = `/api/v1/host/analytics`;
      const params = [];
      if (startDate) params.push(`startDate=${encodeURIComponent(startDate)}`);
      if (endDate) params.push(`endDate=${encodeURIComponent(endDate)}`);
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }
      const response = await authService.makeAuthenticatedRequest(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response, "This one here");
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch analytics data",
      };
    }
  }
  async getEventActivityData(startDate?: string, endDate?: string) {
    try {
      let url = `/api/v1/host/analytics/event`;
      const params = [];
      if (startDate) params.push(`startDate=${encodeURIComponent(startDate)}`);
      if (endDate) params.push(`endDate=${encodeURIComponent(endDate)}`);
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }
      const response = await authService.makeAuthenticatedRequest(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response, "This one here");
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch event analytics data",
      };
    }
  }

  async getEventBookingActivityData(period: string) {
    try {
      const url = `/api/v1/host/analytics/booking/${period}`;

      const response = await authService.makeAuthenticatedRequest(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response, "This one here");
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch event analytics data",
      };
    }
  }

  async exportReport(startDate?: string, endDate?: string) {
    try {
      // Define the base URL
      let url = `/api/v1/host/analytics/export/csv`;

      // Build query parameters if available
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      // Append params to URL
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await authService.makeAuthenticatedRequest(url, {
        method: "GET",
      });

      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to export report",
      };
    }
  }
}
const analyticsService = new AnalyticsService();
export default analyticsService;
