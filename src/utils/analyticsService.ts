import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

class AnalyticsService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async getUserActivityData() {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/host/analytics
            `,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response, "This one here")
      return { success: true, data: response };
    } catch (error: unknown) {
        console.log(error)
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch analytics data",
      };
    }
  }
  async getEventActivityData() {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/host/analytics/event
            `,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response, "This one here")
      return { success: true, data: response };
    } catch (error: unknown) {
        console.log(error)
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
