import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

class ReportService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async getReportedEvents(
    page: number | string,
    limit: number | string,
    search?: string,
    startDate?: string,
    endDate?: string,
    status?: string
  ) {
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (status) params.append("status", status);
      params.append("page", page as string);
      params.append("limit", limit as string);

      let url = `/api/v1/host/reports/events`;

      // attach params if any
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await authService.makeAuthenticatedRequest(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch reported events",
      };
    }
  }

  async getReportedRecommendations(
    page: number | string,
    limit: number | string,
    search?: string,
    startDate?: string,
    endDate?: string,
    status?: string
  ) {
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (status) params.append("status", status);
      params.append("page", page as string);
      params.append("limit", limit as string);

      let url = `/api/v1/host/reports/recommendations`;

      // attach params if any
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await authService.makeAuthenticatedRequest(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch reported recommendations",
      };
    }
  }
}

export const reportService = new ReportService();
