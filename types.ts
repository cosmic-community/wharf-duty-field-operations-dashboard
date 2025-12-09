// Comprehensive type definitions for Novi Marine Brokers Wharf Duty Dashboard

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
  bucket?: string;
}

// Province/State options
export type ProvinceState = 'NS' | 'NB' | 'PE' | 'NL' | 'QC' | 'ME' | 'MA';
export type ProvinceStateValue = 'Nova Scotia' | 'New Brunswick' | 'Prince Edward Island' | 'Newfoundland and Labrador' | 'Quebec' | 'Maine' | 'Massachusetts';

// Wharf types
export type WharfType = 'public' | 'private' | 'commercial';
export type WharfTypeValue = 'Public' | 'Private' | 'Commercial';

// Priority levels
export type Priority = 'high' | 'medium' | 'low';
export type PriorityValue = 'High' | 'Medium' | 'Low';

// User roles
export type UserRole = 'admin' | 'broker' | 'remote_worker' | 'referral_agent';
export type UserRoleValue = 'Admin' | 'Broker' | 'Remote Worker' | 'Referral Agent';

// Trip status
export type TripStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';
export type TripStatusValue = 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';

// Visit status
export type VisitStatus = 'completed' | 'partial' | 'skipped';
export type VisitStatusValue = 'Completed' | 'Partial' | 'Skipped';

// Select dropdown option interface
export interface SelectOption<K = string, V = string> {
  key: K;
  value: V;
}

// File metafield interface
export interface FileMetafield {
  url: string;
  imgix_url: string;
}

// Wharf object type
export interface Wharf extends CosmicObject {
  type: 'wharves';
  metadata: {
    wharf_id: string;
    name: string;
    local_name?: string;
    latitude: number;
    longitude: number;
    province_state: SelectOption<ProvinceState, ProvinceStateValue>;
    fishing_district: string;
    wharf_type: SelectOption<WharfType, WharfTypeValue>;
    avg_boat_count?: number;
    last_visit_date?: string;
    priority: SelectOption<Priority, PriorityValue>;
    wharf_photo?: FileMetafield;
    notes?: string;
  };
}

// User object type
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    full_name: string;
    email: string;
    phone?: string;
    user_role: SelectOption<UserRole, UserRoleValue>;
    assigned_regions?: string[];
    profile_photo?: FileMetafield;
    active: boolean;
  };
}

// Trip object type
export interface Trip extends CosmicObject {
  type: 'trips';
  metadata: {
    trip_id: string;
    user: User | string;
    trip_date: string;
    base_location_name: string;
    base_lat: number;
    base_lng: number;
    planned_wharves: Wharf[] | string[];
    working_hours: number;
    estimated_total_time?: number;
    trip_status: SelectOption<TripStatus, TripStatusValue>;
    actual_start_time?: string | null;
    actual_end_time?: string | null;
    trip_notes?: string;
  };
}

// Visit object type
export interface Visit extends CosmicObject {
  type: 'visits';
  metadata: {
    visit_id: string;
    wharf: Wharf | string;
    user: User | string;
    trip?: Trip | string;
    check_in_time: string;
    check_out_time?: string;
    gps_lat: number;
    gps_lng: number;
    boat_count: number;
    photos?: FileMetafield[];
    status: SelectOption<VisitStatus, VisitStatusValue>;
    notes?: string;
    synced_to_crm: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isWharf(obj: CosmicObject): obj is Wharf {
  return obj.type === 'wharves';
}

export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isTrip(obj: CosmicObject): obj is Trip {
  return obj.type === 'trips';
}

export function isVisit(obj: CosmicObject): obj is Visit {
  return obj.type === 'visits';
}

// Utility types
export type WharfWithRelations = Wharf & {
  metadata: Omit<Wharf['metadata'], 'province_state' | 'wharf_type' | 'priority'> & {
    province_state: SelectOption<ProvinceState, ProvinceStateValue>;
    wharf_type: SelectOption<WharfType, WharfTypeValue>;
    priority: SelectOption<Priority, PriorityValue>;
  };
};

export type VisitWithRelations = Visit & {
  metadata: Omit<Visit['metadata'], 'wharf' | 'user' | 'trip'> & {
    wharf: Wharf;
    user: User;
    trip?: Trip;
  };
};

export type TripWithRelations = Trip & {
  metadata: Omit<Trip['metadata'], 'user' | 'planned_wharves'> & {
    user: User;
    planned_wharves: Wharf[];
  };
};

// Dashboard statistics type
export interface DashboardStats {
  totalWharves: number;
  totalVisits: number;
  totalTrips: number;
  totalUsers: number;
  highPriorityWharves: number;
  activeTrips: number;
  completedVisits: number;
  avgBoatsPerVisit: number;
}