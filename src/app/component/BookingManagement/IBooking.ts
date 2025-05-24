export interface IBooking {
    id: string;
    eventName: string;
    organiser: string;
    date: string;
    status: "Confirmed" | "Pending" | "Canceled";
  }


 export interface IVendor {
    name: string;
    representative: string;
    totalEvents: number;
    totalBookings: number;
    revenue: string;
  }