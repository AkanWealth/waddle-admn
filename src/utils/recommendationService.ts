import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

class RecommendationService {
  private baseURL: string;
  private readonly defaultPageSize: number = 10;

  constructor() {
    this.baseURL = baseUrl;
  }

  async getAllRecommendationsEvents() {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/events/admin`
      );
      console.log("Testing a couple", response);
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error");
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch recommendations",
      };
    }
  }

  async getAllRecommendationsPlaces() {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/places/1/10000`
      );
      console.log("Testing a couple", response);
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error");
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch recommendations",
      };
    }
  }
  async approveRecommendationPlace(id: string) {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/verify/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error");
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to approve recommendation",
      };
    }
  }

  async rejectARecommendationPlace(id: string) {
    try {
      //localhost:3030/api/v1/crowd-sourcing/unverify/{id}
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/unverify/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error");
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to approve recommendation",
      };
    }
  }
}

export const recommendationService = new RecommendationService();
