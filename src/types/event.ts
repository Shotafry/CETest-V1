// Event types for CibESphere
export interface EventLocation {
  lat: number;
  lng: number;
  city: string;
  region: string;
  address?: string;
}

export interface EventOrganizer {
  name: string;
  email: string;
  organization?: string;
}

export interface CyberEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: EventLocation;
  logoUrl: string;
  organizer: EventOrganizer;
  tags: string[];
  attendeesCount?: number;
  maxAttendees?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Alias para compatibilidad
export type Event = CyberEvent;

export interface EventFilters {
  regions: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  tags: string[];
}