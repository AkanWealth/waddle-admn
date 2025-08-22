import { baseUrl } from "@/lib/envfile";
import { authService } from "./authService";

class PaymentService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  /**
   * Fetch all payments (admin only).
   * @param params Query parameters for filtering & pagination
   * Example: { page: 2, limit: 20, status: "SUCCESSFUL", userId: "user_123", search: "transaction_id" }
   */
  async getAllPayments(params?: {
    page?: number;
    limit?: number;
    paymentStatus?: "SUCCESSFUL" | "PENDING" | "FAILED" | "REFUNDED";
    bookingStatus?: "SUCCESSFUL" | "NO_BOOKING" | "CANCELLED";
    userId?: string;
    eventId?: string;
    startDate?: string;
    endDate?: string;
    search?: string; // Add search parameter for transaction ID, user name, event name, etc.
  }) {
    try {
      // Build query string dynamically
      const query = params
        ? "?" +
          new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
              if (value !== undefined && value !== null) {
                acc[key] = String(value);
              }
              return acc;
            }, {} as Record<string, string>)
          ).toString()
        : "";

      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/payments${query}`
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      console.error(error, "Error fetching payments");
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch payments",
      };
    }
  }
}

export const paymentService = new PaymentService();
