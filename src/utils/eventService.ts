import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

class EventService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async createEventAsAdmin(eventData: Record<string, unknown>): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    try {
      const accessToken = authService.getAccessToken();

      if (!accessToken) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${this.baseURL}/api/v1/events/host`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while creating the event",
      };
    }
  }

  async draftEventAsAdmin(eventData: Record<string, unknown>): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    try {
      const endpoint = `/api/v1/events/host/draft`;

      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "POST",

        body: JSON.stringify(eventData),
      });

      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while creating the event",
      };
    }
  }

  async getPaginatedEvents(): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    const endpoint = `/api/v1/events/admin`;

    try {
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "GET",
      });

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

  async approveAdminEvent(eventId: string): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    const endpoint = `/api/v1/events/host/${eventId}/approve`;

    try {
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "PATCH",
      });

      return { success: true, data: response.data };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while approving the event",
      };
    }
  }

  async rejectAdminEvent(eventId: string): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    const endpoint = `/api/v1/events/host/${eventId}/reject`;

    try {
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "PATCH",
      });

      return { success: true, data: response.data };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while approving the event",
      };
    }
  }

  async softDeleteEvent(eventId: string): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    const endpoint = `/api/v1/events/soft-delete/${eventId}`;

    try {
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "DELETE",
      });

      return { success: true, data: response.data };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while deleting the event",
      };
    }
  }
}

export const eventService = new EventService();
