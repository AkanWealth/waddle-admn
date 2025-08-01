import { authService } from "./authService";
import { baseUrl } from "../lib/envfile";



export interface BookingResponse {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  error?: string;
}

class BookingsService {
  private baseURL: string;

  constructor() {
    this.baseURL = baseUrl;
  }

  // Get all bookings for the logged-in user
  async getAllBookings(){
    try {
      //http://localhost:3030/api/v1/bookings/host/all
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/bookings`
      );
      console.log("Testing a couple",response)
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error")
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch bookings",
      };
    }
  }

  async getAllVendorRevenue(){
    try {
      //http://localhost:3030/api/v1/bookings/host/all
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/bookings/vendors/revenue`
      );
      console.log("Testing a couple",response)
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error")
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch bookings",
      };
    }
  }

  async getAllVendorBooking(){
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/bookings/vendors/report`
      );
      console.log("Testing a couple right here",response)
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error")
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch bookings",
      };
    }
  }
  
  async getBookingRevenueData(period:string, status?:string){
    try {
      const response = await authService.makeAuthenticatedRequest(
        `/api/v1/payments/revenue/admin?period=${period}&status=${status}`
      );
      console.log("Testing a couple right here",response)
      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error, "This is error")
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch bookings",
      };
    }
  }
}

export const bookingsService = new BookingsService();
