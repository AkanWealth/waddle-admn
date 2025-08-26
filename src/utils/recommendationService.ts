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
        `/api/v1/crowd-sourcing/places/admin`
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

  async getAllRecommendationsPlacesByPage(
    crowdSourcedId: string,
    page: number
  ) {
    try {
      //localhost:3030/api/v1/crowd-sourcing/review/{id}/paginated
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/admin-review/${crowdSourcedId}/paginated?page=${page}`
      );
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

  async getAllRecommendationsEventByPage(crowdSourcedId: string, page: number) {
    try {
      //localhost:3030/api/v1/crowd-sourcing/review/{id}/paginated
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/admin/events-review/${crowdSourcedId}/paginated?page=${page}`
      );
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
  async getAllRecommendationsPlacesStats(crowdSourcedId: string) {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/${crowdSourcedId}/attendance/stats`
      );
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
  async getRecommendationPlacePercentage(crowdSourcedId: string) {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/place/${crowdSourcedId}/recommendation-percentage`
      );
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
  async getRecommendationEventPercentage(crowdSourcedId: string) {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/event/${crowdSourcedId}/attendance-percentage`
      );
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
  async flagOrUnflagEventComment(
    id: string,
    data: "APPROPRIATE" | "INAPPROPRIATE"
  ) {
    try {
      const payload = {
        status: data,
      };

      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/comment/${id}/flag`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
  async flagOrUnflagPlaceComment(
    id: string,
    data: "APPROPRIATE" | "INAPPROPRIATE"
  ) {
    try {
      const payload = {
        status: data,
      };

      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/place-review/${id}/flag`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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

  async fetchParentsWhoMadePlaceRecommendation(placeId: string) {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/crowd-sourcing/place/${placeId}/parents`,
        {
          method: "GET",
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
            : "Failed to fetch recommenndations",
      };
    }
  }
}

export const recommendationService = new RecommendationService();
