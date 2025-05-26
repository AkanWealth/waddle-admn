import { Place, Event } from '@/types/IRecommendations';
import { create } from 'zustand';



interface RecommendationsState {
  places: Place[];
  events: Event[];
  selectedPlace: Place | null;
  selectedEvent: Event | null;
  
  setPlaces: (places: Place[]) => void;
  setEvents: (events: Event[]) => void;
  updatePlaceStatus: (id: string, status: Place['status']) => void;
  updateEventStatus: (id: string, status: Event['status']) => void;
  setSelectedPlace: (place: Place | null) => void;
  setSelectedEvent: (event: Event | null) => void;
  rejectPlace: (id: string) => void;
  approvePlace: (id: string) => void;
  rejectEvent: (id: string) => void;
  approveEvent: (id: string) => void;
}

export const useRecommendationsStore = create<RecommendationsState>((set) => ({
  places: [],
  events: [],
  selectedPlace: null,
  selectedEvent: null,

  setPlaces: (places) => set({ places }),
  setEvents: (events) => set({ events }),
  
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
    
  setSelectedPlace: (place) => set({ selectedPlace: place }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  
  rejectPlace: (id) =>
    set((state) => ({
      places: state.places.map((place) =>
        place.id === id ? { ...place, status: 'Rejected' as const } : place
      ),
    })),
    
  approvePlace: (id) =>
    set((state) => ({
      places: state.places.map((place) =>
        place.id === id ? { ...place, status: 'Approved' as const } : place
      ),
    })),
    
  rejectEvent: (id) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, status: 'Rejected' as const } : event
      ),
    })),
    
  approveEvent: (id) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, status: 'Approved' as const } : event
      ),
    })),
}));