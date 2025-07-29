import { baseUrl } from "../lib/envfile";
import { authService } from "./authService";

class DisputeService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async getAllDisputes(
    params: {
      includeResolved?: boolean;
      endDate?: string;
      startDate?: string;
      category?: string;
      status?: string;
      limit?: number;
      page?: number;
      search?: string;
    } = {}
  ): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    let endpoint = `/api/v1/disputes/admin/all`;
    const query = new URLSearchParams();
    if (params.includeResolved !== undefined)
      query.append("includeResolved", String(params.includeResolved));
    if (params.endDate) query.append("endDate", params.endDate);
    if (params.startDate) query.append("startDate", params.startDate);
    if (params.category) query.append("category", params.category);
    if (params.status) query.append("status", params.status);
    if (params.limit) query.append("limit", String(params.limit));
    if (params.page) query.append("page", String(params.page));
    if (params.search) query.append("search", params.search);
    if ([...query].length > 0) endpoint += `?${query.toString()}`;
    try {
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "GET",
      });
      console.log("DisputeService - getAllDisputes response:", response);
      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching paginated events",
      };
    }
  }

  async moveToInReview(disputeId: string): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    try {
      const endpoint = `/api/v1/disputes/admin/${disputeId}/status`;
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "IN_REVIEW" }),
      });
      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while moving to in review",
      };
    }
  }

  async moveToResolved(disputeId: string): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    try {
      const endpoint = `/api/v1/disputes/admin/${disputeId}/status`;
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "RESOLVED" }),
      });
      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while resolving dispute",
      };
    }
  }
}

export const disputeService = new DisputeService();
