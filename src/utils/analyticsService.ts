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
}
const analyticsService = new AnalyticsService();
export default analyticsService;
