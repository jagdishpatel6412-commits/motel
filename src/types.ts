export interface Room {
  id: string;
  name: string;
  category: 'king' | 'queen' | 'double_queen' | 'suite' | 'family' | 'accessible';
  headline: string;
  description: string;
  basePrice: number;
  weekendPrice?: number;
  capacity: {
    adults: number;
    children: number;
    maxTotal: number;
  };
  bedConfiguration: string;
  sizeSqFt: number;
  floor: string;
  images: string[];
  features: string[];
  amenities: string[];
  petFriendly: boolean;
  accessible: boolean;
  popularBadge?: string;
  totalUnits: number;
  availableUnits: number;
  checkInNotice?: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'room' | 'property' | 'service' | 'wellness';
  description: string;
  iconName: string;
  featured: boolean;
  highlight?: string;
  image?: string;
}

export interface SpecialOffer {
  id: string;
  code: string;
  title: string;
  badge: string;
  discountPercent?: number;
  discountFixed?: number;
  minNights: number;
  description: string;
  perks: string[];
  terms: string;
  validThrough: string;
  active: boolean;
  bannerImage: string;
}

export interface LocalAttraction {
  id: string;
  name: string;
  category: 'Nature & Parks' | 'Dining & Breweries' | 'Culture & Downtown' | 'Transit & Medical';
  distanceMiles: number;
  driveTime: string;
  description: string;
  image: string;
  tag: string;
  address: string;
}

export interface GuestReview {
  id: string;
  authorName: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  roomStayed: string;
  verifiedDirectGuest: boolean;
  source: 'Google Reviews' | 'Direct Guest' | 'TripAdvisor';
  cleanlinessScore: number;
  comfortScore: number;
  serviceScore: number;
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  estimatedArrival?: string;
  addPet: boolean;
  addLateCheckout: boolean;
  addSnackPack: boolean;
  promoCode?: string;
  discountAmount: number;
  nightlyRate: number;
  subtotal: number;
  taxesAndFees: number;
  totalAmount: number;
  paymentMethod: 'credit_card' | 'pay_at_desk';
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  checkInDate?: string;
  checkOutDate?: string;
  subject?: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'responded' | 'archived';
}

export interface SearchQuery {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType?: string;
  promoCode?: string;
  petFriendly?: boolean;
}

export type ActivePage =
  | 'home'
  | 'rooms'
  | 'room-detail'
  | 'amenities'
  | 'gallery'
  | 'location'
  | 'reviews'
  | 'offers'
  | 'book'
  | 'contact'
  | 'about'
  | 'policies'
  | 'admin'
  | 'my-reservation';
