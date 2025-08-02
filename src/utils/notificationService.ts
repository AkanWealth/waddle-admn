// import { authService } from "./authService";
// import { baseUrl } from "../lib/envfile";

// class NotificationService {
//   private baseURL: string;

//   constructor() {
//     this.baseURL = baseUrl;
//   }

//   async getPaginatedNotifications({
//     adminId,
//     includeRead = "true",
//     includeCleared = "false",
//     limit = "50",
//     offset = "0",
//   }: {
//     adminId: string;
//     includeRead?: string;
//     includeCleared?: string;
//     limit?: string;
//     offset?: string;
//   }): Promise<{
//     success: boolean;
//     data?: unknown;
//     error?: string;
//   }> {
//     const endpoint = `/api/v1/notifications/admin/${adminId}?includeRead=${includeRead}&includeCleared=${includeCleared}&limit=${limit}&offset=${offset}`;

//     try {
//       const response = await authService.makeAuthenticatedRequest(endpoint, {
//         method: "GET",
//       });

//       return { success: true, data: response };
//     } catch (error: unknown) {
//       return {
//         success: false,
//         error:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred while fetching admin notifications",
//       };
//     }
//   }
// }

// export const notificationService = new NotificationService();
import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";

interface GetNotificationsParams {
  adminId: string;
  includeRead?: string;
  includeCleared?: string;
  limit?: string;
  offset?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class NotificationService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  async getPaginatedNotifications({
    adminId,
    includeRead = "true",
    includeCleared = "false",
    limit = "50",
    offset = "0",
  }: GetNotificationsParams): Promise<ApiResponse> {
    const endpoint = `/api/v1/notifications/admin/${adminId}?includeRead=${includeRead}&includeCleared=${includeCleared}&limit=${limit}&offset=${offset}`;

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
            : "An unexpected error occurred while fetching admin notifications",
      };
    }
  }

  // Add method to mark individual notification as read (if API supports it)
  async markAsRead(notificationId: string): Promise<ApiResponse> {
    const endpoint = `/api/v1/notifications/${notificationId}/read`;

    try {
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "PATCH",
      });

      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while marking notification as read",
      };
    }
  }

  async markAllAsRead(adminId: string): Promise<ApiResponse> {
    //localhost:3030/api/v1/notifications/admin/read-all/{adminId}
    const endpoint = `/api/v1/notifications/admin/read-all/${adminId}`;

    try {
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "PATCH",
      });

      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while marking notification as read",
      };
    }
  }

  // Add method to get unread count (if API supports it)
  async getUnreadCount(adminId: string): Promise<ApiResponse> {
    const endpoint = `/api/v1/notifications/admin/${adminId}/unread-count`;

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
            : "An unexpected error occurred while fetching unread count",
      };
    }
  }

  async clearAll(adminId: string): Promise<ApiResponse> {
    //api.waddleapp.io/api/v1/notifications/admin/clear-all/{adminId}
    const endpoint = `/api/v1/notifications/admin/clear-all/${adminId}`;

    try {
      const response = await authService.makeAuthenticatedRequest(endpoint, {
        method: "PATCH",
      });

      return { success: true, data: response };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while marking notification as read",
      };
    }
  }

  // Method to check for new notifications (for polling)
  async checkForNewNotifications(
    adminId: string,
    lastChecked?: Date
  ): Promise<ApiResponse> {
    let endpoint = `/api/v1/notifications/admin/${adminId}?includeRead=false&includeCleared=false&limit=10&offset=0`;

    if (lastChecked) {
      endpoint += `&since=${lastChecked.toISOString()}`;
    }

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
            : "An unexpected error occurred while checking for new notifications",
      };
    }
  }
}

export const notificationService = new NotificationService();
