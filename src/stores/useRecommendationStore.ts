/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Event } from "@/types/IRecommendations";
import { create } from "zustand";
import { recommendationService } from "@/utils/recommendationService";

// Use Recommendation type from dashboard/recommendations/page.tsx
export interface Recommendation {
  id: string;
  name: string;
  creator: {
    name: string;
    email?: string;
    profile_picture?: string;
  };
  date: string;
  address: string;
  category: string;
  status: "Pending" | "Rejected" | "Approved";
  isDeleted: boolean;
  isVerified: boolean;
  description?: string;
  images?: string[];
  facilities?: string[];
  tips?: string;
}

interface RecommendationsState {
  places: Recommendation[];
  events: Event[];
  selectedPlace: Recommendation | null;
  selectedEvent: Event | null;

  setPlaces: (places: Recommendation[]) => void;
  setEvents: (events: Event[]) => void;

  updatePlaceStatus: (id: string, status: Recommendation["status"]) => void;
  updateEventStatus: (id: string, status: Event["status"]) => void;

  setSelectedPlace: (place: Recommendation | null) => void;
  setSelectedEvent: (event: Event | null) => void;

  rejectPlace: (id: string) => void;
  approvePlace: (id: string) => void;
  rejectEvent: (id: string) => void;
  approveEvent: (id: string) => void;

  showPlaceDetailsModal: boolean;
  openShowPlaceDetailsModal: () => void;
  closeShowPlaceDetailsModal: () => void;

  showApproveDetailsModal: boolean;
  openShowApproveDetailsModal: () => void;
  closeShowApproveDetailsModal: () => void;

  refreshEvents: (tab: "Places" | "Events") => Promise<void>;
}

export const useRecommendationsStore = create<RecommendationsState>((set) => ({
  places: [],
  events: [],
  selectedPlace: null,
  selectedEvent: null,
  showPlaceDetailsModal: false,
  showApproveDetailsModal: false,

  setPlaces: (places) => set({ places }),
  setEvents: (events) => set({ events }),

  setSelectedPlace: (place) => set({ selectedPlace: place }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),

  updatePlaceStatus: (id, status) =>
    set((state) => ({
      places: state.places.map((place) =>
        place.id === id ? { ...place, status } : place
      ),
    })),

  updateEventStatus: (id, status) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, status } : event
      ),
    })),

  rejectPlace: (id) =>
    set((state) => ({
      places: state.places.map((place) =>
        place.id === id ? { ...place, status: "Rejected" as const } : place
      ),
    })),

  approvePlace: (id) =>
    set((state) => ({
      places: state.places.map((place) =>
        place.id === id ? { ...place, status: "Approved" as const } : place
      ),
    })),

  rejectEvent: (id) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, status: "Rejected" as const } : event
      ),
    })),

  approveEvent: (id) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, status: "Approved" as const } : event
      ),
    })),

  openShowPlaceDetailsModal: () => set({ showPlaceDetailsModal: true }),
  closeShowPlaceDetailsModal: () => set({ showPlaceDetailsModal: false }),
  openShowApproveDetailsModal: () => set({ showApproveDetailsModal: true }),
  closeShowApproveDetailsModal: () => set({ showApproveDetailsModal: false }),
  refreshEvents: async (tab: "Places" | "Events") => {
    if (tab === "Events") {
      const response = await recommendationService.getAllRecommendationsEvents(
        1,
        1000
      );
      if (response.success) {
        // Map API response to Event type
        const apiEvents = (response.data.events ||
          response.data ||
          []) as unknown[];
        const events = apiEvents.map((item): Event => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const event = item as any;
          return {
            id: event.id,
            name: event.name,
            submittedBy: event.creator?.name || event.creatorName || "Unknown",
            dateSubmitted: event.date || event.createdAt || "",
            entryFee: event.fee || event.entryFee || "",
            category: event.category || "",
            status: event.isDeleted
              ? "Rejected"
              : event.isVerified
              ? "Approved"
              : "Pending",
            description: event.description || "",
            images: event.images || [],
            facilities: event.facilities || [],
            parentsTip: event.tips || event.parentsTip || "",
            comments: event.comments || [],
          };
        });
        set({ events });
      }
    } else {
      const response =
        await recommendationService.getAllRecommendationsPlaces();
      if (response.success) {
        // Map API response to Recommendation type
        const apiPlaces = (response.data.places ||
          response.data ||
          []) as unknown[];
        const places = apiPlaces.map((item): Recommendation => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const place = item as any;
          return {
            id: place.id,
            name: place.name,
            creator: place.creator || { name: place.creatorName || "Unknown" },
            date: place.date,
            address: place.address || "",
            category: place.category || "",
            status: place.isDeleted
              ? "Rejected"
              : place.isVerified
              ? "Approved"
              : "Pending",
            isDeleted: place.isDeleted || false,
            isVerified: place.isVerified || false,
            description: place.description || "",
            images: place.images || [],
            facilities: place.facilities || [],
            tips: place.tips || "",
          };
        });
        set({ places });
      }
    }
  },
}));
