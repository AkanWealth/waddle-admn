export interface Place {
  id: string;
  name: string;
  submittedBy: string;
  dateSubmitted: string;
  location: string;
  category: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  description?: string;
  images: string[];
  facilities: string[];
  parentsTip?: string;
  rating?: number;
  reviews?: Review[];
}

export interface Event {
  id: string;
  name: string;
  submittedBy: string;
  dateSubmitted: string;
  entryFee: string;
  category: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  description?: string;
  images: string[];
  facilities: string[];
  parentsTip?: string;
  comments?: Comment[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  flagged?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  comment: string;
  flagged?: boolean;
}







