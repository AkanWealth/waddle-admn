import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

class UserService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async deactivateAdmin(adminId: string): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/host/activate/${adminId}`,
        {
          method: "DELETE",
        }
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while deactivating the admin",
      };
    }
  }

  async reactivateAdmin(adminId: string): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/host/web/${adminId}/reactivate`,
        {
          method: "PATCH",
        }
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while reactivating the admin",
      };
    }
  }

  // You can add more user-related methods here, e.g., getUsers(), updateUser(), etc.
}

export const userService = new UserService();
