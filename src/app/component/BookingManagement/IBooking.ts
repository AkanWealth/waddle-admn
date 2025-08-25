// export interface IBooking {
//   id: string;
//   event: {
//     name: string;
//     organiser: {
//       name: string;
//     };
//     date: Date;
//   };
//   organiser: string;
//   date: string;
//   status: "Confirmed" | "Pending" | "Canceled";
// }

export type IBooking = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  organiser: any;
  id: string;
  userId: string;
  eventId: string;
  ticket_quantity: number;
  sessionId: string;
  status: string;
  isDeleted: boolean;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  event: Event;
  user: User;
};

type Event = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any;
  adminId: string | null;
  id: string;
  name: string;
  description: string;
  address: string;
  images: string; // comma-separated URLs
  price: number;
  total_ticket: number;
  ticket_booked: number;
  date: Date;
  time: string;
  age_range: string;
  instruction: string;
  category: string;
  isPublished: boolean;
  isDeleted: boolean;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  organiserId: string;
  organiser: Organiser;
};

type Organiser = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  business_logo: string;
  address: string;
  business_name: string;
  business_category: string;
  registration_number: string;
  email_verify: boolean;
  isLocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  failedLoginAttempts: number;
  website_url: string;
  facebook_url: string;
  verification_token: string | null;
  verification_token_expiration: string | null;
  reset_token: string | null;
  reset_expiration: string | null;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  fcmToken: string | null;
  role: "ORGANISER";
  fcmIsOn: boolean;
  isApproved: boolean;
};

type User = {
  id: string;
  profile_picture: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
  guardian_type: string;
  email_verify: boolean;
  isLocked: boolean;
  isDeleted: boolean;
  failedLoginAttempts: number;
  verification_token: string | null;
  verification_token_expiration: string | null;
  reset_token: string | null;
  reset_expiration: string | null;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  fcmToken: string | null;
  role: "GUARDIAN";
  fcmIsOn: boolean;
};

export interface IVendor {
  name: string;
  representative: string;
  totalEvents: number;
  totalBookings: number;
  revenue: string;
}
