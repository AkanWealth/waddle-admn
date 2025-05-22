export interface IBooking {
    id: string;
    eventName: string;
    organiser: string;
    date: string;
    status: "Confirmed" | "Pending" | "Canceled";
  }