import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";
import { CreateEventType } from "@/types/Events";

class EventService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async createEventAsAdmin(createEventData: CreateEventType): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/events/host`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createEventData),
        }
      );

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
}

export const eventService = new EventService();
