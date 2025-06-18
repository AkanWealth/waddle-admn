import { baseUrl } from "../lib/envfile";
import { authService } from "./authService";

class DisputeService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async getAllDisputes(): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    const endpoint = `/api/v1/ticket/all-tickets`;

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
}

export const disputeService = new DisputeService();
