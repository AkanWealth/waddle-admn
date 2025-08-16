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
   * Example: { page: 2, limit: 20, status: "SUCCESSFUL", userId: "user_123" }
   */
  async getAllPayments(params?: {
    page?: number;
    limit?: number;
    status?: "PENDING" | "CANCELLED" | "SUCCESSFUL" | "FAILED" | "REFUNDED";
    userId?: string;
    eventId?: string;
    startDate?: string;
    endDate?: string;
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
