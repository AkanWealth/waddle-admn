import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

class RecommendationService {
  private baseURL: string;
  private readonly defaultPageSize: number = 10;

  constructor() {
    this.baseURL = baseUrl;
  }

  async getAllRecommendationsEvents(page: number = 1, pageSize: number = this.defaultPageSize) {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/events/${page}/${pageSize}`
      );
      console.log("Testing a couple", response);
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error");
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch recommendations",
      };
    }
  }
}

export const recommendationService = new RecommendationService();
