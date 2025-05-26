
export interface TableRow {
    placeName: string;
    submittedBy: string;
    dateSubmitted: string;
    location: string;
    category: string;
    status: "Pending" | "Rejected" | "Approved";
  }

  
export const recommendationData: TableRow[] = [
    {
      placeName: "Little Explorers Park",
      submittedBy: "John Doe",
      dateSubmitted: "04-03-2025",
      location: "Colchester",
      category: "Outdoor Play",
      status: "Pending",
    },
    {
      placeName: "Tots 'n' Treats Cafe",
      submittedBy: "Jane Smith",
      dateSubmitted: "04-03-2025",
      location: "Chelmsford",
      category: "Cafes & Restaurants",
      status: "Rejected",
    },
    {
      placeName: "Dino Discovery Trail",
      submittedBy: "Mark Johnson",
      dateSubmitted: "04-03-2025",
      location: "Ipswich",
      category: "Learning & Discovery",
      status: "Approved",
    },
    {
      placeName: "Rainbow Arts Studio",
      submittedBy: "Jane Smith",
      dateSubmitted: "04-03-2025",
      location: "Colchester",
      category: "Wellness & Calm Spaces",
      status: "Approved",
    },
    {
      placeName: "Little Explorers Park",
      submittedBy: "Mark Johnson",
      dateSubmitted: "04-03-2025",
      location: "Colchester",
      category: "Playgrounds & Parks",
      status: "Approved",
    },
    {
      placeName: "Rainbow Arts Studio",
      submittedBy: "John Doe",
      dateSubmitted: "04-03-2025",
      location: "Chelmsford",
      category: "Wellness & Calm Spaces",
      status: "Rejected",
    },
    {
      placeName: "Dino Discovery Trail",
      submittedBy: "Jane Smith",
      dateSubmitted: "04-03-2025",
      location: "Ipswich",
      category: "Seasonal Events",
      status: "Pending",
    },
    {
      placeName: "Tots 'n' Treats Cafe",
      submittedBy: "Mark Johnson",
      dateSubmitted: "04-03-2025",
      location: "Colchester",
      category: "Free & Local Gems",
      status: "Approved",
    },
  ];
  