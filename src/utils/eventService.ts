import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";
import { CreateEventType } from "@/types/Events";

class EventService {
  private baseURL: string;
  private currentPage: number;
  private readonly pageSize: number;

  constructor() {
    this.baseURL = baseUrl;
    this.currentPage = 1;
    this.pageSize = 7;
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

  async getPaginatedEvents(page: number, pageSize: number = 7): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    const endpoint = `/api/v1/events/${page}/${pageSize}`;
  
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
  

  resetPagination() {
    this.currentPage = 1;
  }
}

export const eventService = new EventService();
