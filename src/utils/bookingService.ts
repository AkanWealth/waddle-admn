import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

interface Booking {
  id: string;
  date: string;
  userId: string;
  status: string;
  // Add more fields based on your backend
}

interface BookingResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class BookingsService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  // Get all bookings for the logged-in user
  async getAllBookings(): Promise<BookingResponse> {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `${this.baseURL}/api/v1/bookings/host/all`
      );
      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch bookings",
      };
    }
  }

  
}

export const bookingsService = new BookingsService();
