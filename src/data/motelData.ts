import { Room, Amenity, SpecialOffer, LocalAttraction, GuestReview } from '../types';

export const MOTEL_INFO = {
  name: "The Pinecrest Motel & Suites",
  tagline: "Modern Comfort. Great Location. Easy Direct Booking.",
  shortDescription: "A thoughtfully updated independent roadside retreat in Bend, Oregon. Offering spotless modern rooms, doorstep parking, fast fiber Wi-Fi, heated outdoor pool, and warm local hospitality.",
  address: "1420 Scenic Highway 97",
  city: "Bend",
  state: "OR",
  zip: "97702",
  phone: "(541) 555-7463",
  tollFree: "1-800-555-PINE",
  email: "reservations@pinecrestmotel.com",
  frontDeskEmail: "frontdesk@pinecrestmotel.com",
  frontDeskHours: "24 Hours / 7 Days a Week",
  checkInTime: "3:00 PM",
  checkOutTime: "11:00 AM",
  googleRating: 4.8,
  totalReviewsCount: 648,
  coordinates: {
    lat: 44.0582,
    lng: -121.3153
  },
  yearEstablished: 1984,
  renovatedYear: 2024,
  directBookingPerks: [
    "Best Rate Guarantee — Save $15-$25/night vs OTA sites",
    "Complimentary 1-Hour Early Check-in or Late Check-out (based on availability)",
    "Free Fresh Morning Coffee & Artisan Waffle/Pastry Station",
    "100% Free 24-Hour Cancellation on standard bookings",
    "Free Level-2 EV Charging Station for direct bookers"
  ]
};

export const ROOMS_DATA: Room[] = [
  {
    id: "deluxe-king",
    name: "Deluxe King Room",
    category: "king",
    headline: "Spacious & serene with direct doorstep parking",
    description: "Our signature room featuring a plush Euro-top King mattress with 400-thread-count linens, contemporary natural pine accents, a sleek work desk with high-speed USB-C charging stations, and a modern glass-enclosed bathroom with rainfall shower.",
    basePrice: 109,
    weekendPrice: 129,
    capacity: {
      adults: 2,
      children: 1,
      maxTotal: 2
    },
    bedConfiguration: "1 King Bed (Euro-Top Plush)",
    sizeSqFt: 320,
    floor: "Ground Floor with Direct Parking",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "55\" 4K Smart TV with Netflix & Casting",
      "Quiet Inverter A/C & Heating",
      "Keurig Coffee Maker with gourmet pods",
      "Mini-Refrigerator & Microwave",
      "Rainfall Walk-in Shower with Organic Toiletries",
      "Doorstep Parking with Private Exterior Entrance"
    ],
    amenities: [
      "Free High-Speed Wi-Fi 6",
      "Mini-Fridge & Microwave",
      "Coffee & Tea Maker",
      "Air Conditioning",
      "Hairdryer & Iron",
      "Blackout Roller Shades",
      "USB Charging Ports",
      "Electronic RFID Door Key"
    ],
    petFriendly: false,
    accessible: false,
    popularBadge: "Most Popular for Couples",
    totalUnits: 14,
    availableUnits: 6
  },
  {
    id: "double-queen",
    name: "Double Queen Suite",
    category: "double_queen",
    headline: "Comfortable double queen layout for families & roadtrippers",
    description: "Designed for families, friends, and adventure travelers. Two plush Queen-sized beds, spacious luggage storage, a double-sink vanity to help everyone get ready faster, and a dedicated dining/seating nook.",
    basePrice: 129,
    weekendPrice: 149,
    capacity: {
      adults: 4,
      children: 2,
      maxTotal: 4
    },
    bedConfiguration: "2 Queen Beds (Euro-Top Plush)",
    sizeSqFt: 380,
    floor: "Ground & Second Floor",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Two Queen Beds with Down-Alternative Pillows",
      "Double Sink Vanity Area",
      "55\" Roku Smart TV",
      "Compact Dining Table & Chairs",
      "Full-Size Compact Refrigerator & Microwave",
      "High-Capacity Closet with Luggage Bench"
    ],
    amenities: [
      "Free High-Speed Wi-Fi 6",
      "Mini-Fridge & Microwave",
      "Coffee & Tea Maker",
      "Double Vanity Sinks",
      "Air Conditioning",
      "Iron & Full Ironing Board",
      "In-Room Safe",
      "Organic Shampoo & Body Wash"
    ],
    petFriendly: false,
    accessible: false,
    popularBadge: "Best Value for Families",
    totalUnits: 18,
    availableUnits: 8
  },
  {
    id: "king-studio-kitchenette",
    name: "King Studio Suite with Kitchenette",
    category: "suite",
    headline: "Extended stay comfort with cooking facilities & sofa lounge",
    description: "Our premier suite featuring a fully equipped kitchenette (induction two-burner cooktop, deep sink, microwave, large mini-fridge, pots & dinnerware), a comfortable pull-out sofa seating area, and a plush King bed.",
    basePrice: 149,
    weekendPrice: 175,
    capacity: {
      adults: 3,
      children: 2,
      maxTotal: 3
    },
    bedConfiguration: "1 King Bed + 1 Full Pull-Out Sofa",
    sizeSqFt: 440,
    floor: "Courtyard Wing (Quiet Zone)",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Kitchenette with 2-Burner Cooktop, Microwave & Cookware",
      "Plush Living Room Seating with Leather Pull-Out Sofa",
      "55\" 4K Smart TV in Bedroom & Living Area",
      "Large Working Desk with Ergonomic Task Chair",
      "Designer Tile Bathroom with Rain Shower",
      "Private Patio Chairs Facing Courtyard Garden"
    ],
    amenities: [
      "Kitchenette with Cookware & Dishes",
      "Large Refrigerator & Microwave",
      "Dining Counter with Barstools",
      "Free High-Speed Wi-Fi 6",
      "Plush Bathrobes on Request",
      "In-Room Safe",
      "Individual Climate Control",
      "Keurig Coffee Bar Station"
    ],
    petFriendly: false,
    accessible: false,
    popularBadge: "Extended Stay Favorite",
    totalUnits: 6,
    availableUnits: 3
  },
  {
    id: "pet-friendly-queen",
    name: "Pet-Friendly Queen Room",
    category: "queen",
    headline: "Ground floor room with direct grassy courtyard access for pets",
    description: "Travel with your four-legged companion with zero hassle. Ground floor room featuring durable, hypoallergenic wood-grain luxury vinyl flooring, easy exterior door access to our private grassy relief area, and complimentary pet welcome bowls and treats.",
    basePrice: 115,
    weekendPrice: 135,
    capacity: {
      adults: 2,
      children: 1,
      maxTotal: 2
    },
    bedConfiguration: "1 Queen Bed (Plush Hypoallergenic)",
    sizeSqFt: 310,
    floor: "Ground Floor with Lawn Access",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Hypoallergenic Wood-Style Luxury Flooring",
      "Complimentary Dog Bed & Stainless Bowls Provided",
      "Doorstep Access to Grassy Courtyard & Waste Stations",
      "50\" 4K Roku Smart TV",
      "Mini-Fridge & Microwave",
      "Doorstep Vehicle Parking"
    ],
    amenities: [
      "Pet Welcome Kit & Treats",
      "Free High-Speed Wi-Fi",
      "Mini-Fridge & Microwave",
      "Coffee Maker",
      "A/C & Heating",
      "Doorstep Ground Parking",
      "Eco-friendly Bath Amenities"
    ],
    petFriendly: true,
    accessible: false,
    popularBadge: "Dog & Cat Friendly",
    totalUnits: 8,
    availableUnits: 4
  },
  {
    id: "two-room-family-suite",
    name: "Two-Room Family Suite",
    category: "family",
    headline: "Two separate bedrooms for ultimate privacy & peaceful sleep",
    description: "The ultimate road-trip accommodation. Two fully partitioned bedrooms: master bedroom with 1 King bed, and a second bedroom with 2 Twin beds. Features two independent 50-inch smart TVs and an extra-spacious bathroom.",
    basePrice: 179,
    weekendPrice: 209,
    capacity: {
      adults: 4,
      children: 2,
      maxTotal: 5
    },
    bedConfiguration: "1 King Bed (Master) + 2 Twin Beds (Second Room)",
    sizeSqFt: 560,
    floor: "Quiet Courtyard Wing",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Two Separate Private Bedrooms with Closing Doors",
      "Two Independent 50\" 4K Smart TVs",
      "Full Dining Table with 4 Chairs",
      "Mid-Size Refrigerator & Microwave Station",
      "Double Sink Vanity with Bathtub & Shower Combo",
      "Doorstep Reserved Family Parking"
    ],
    amenities: [
      "Free High-Speed Wi-Fi 6",
      "Bathtub & Shower Combo",
      "Microwave & Mid-Size Fridge",
      "Keurig Coffee Station",
      "Double Sink Vanity",
      "Individual Climate Control in Each Room",
      "Iron & Full Ironing Board"
    ],
    petFriendly: false,
    accessible: false,
    popularBadge: "Top Pick for Families",
    totalUnits: 4,
    availableUnits: 2
  },
  {
    id: "accessible-king-ada",
    name: "Accessible King Room (ADA Compliant)",
    category: "accessible",
    headline: "Barrier-free design with roll-in shower and accessible parking",
    description: "Fully compliant with ADA standards. Wide 36-inch clear doorways, lower light switches, roll-under sink vanity, strobe fire alarm & doorbell visual indicators, and a barrier-free roll-in shower with bench and safety grab bars.",
    basePrice: 109,
    weekendPrice: 129,
    capacity: {
      adults: 2,
      children: 1,
      maxTotal: 2
    },
    bedConfiguration: "1 Accessible King Bed (Lowered Height)",
    sizeSqFt: 350,
    floor: "Ground Floor with Van-Accessible Parking",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Roll-In Shower with Folding Seat & Sturdy Grab Bars",
      "Wide 36\" Clearance Entry & Bathroom Doorways",
      "Lowered Climate Controls, Closet Rods & Peephole",
      "Auditory & Visual Strobe Fire Notification Devices",
      "Direct Van-Accessible ADA Parking directly in front of door",
      "Lowered Plush King Bed for Easy Transfer"
    ],
    amenities: [
      "ADA Roll-In Shower & Bench",
      "Visual Alert Alarms & Doorbell",
      "Free High-Speed Wi-Fi",
      "Lowered Microwave & Mini-Fridge",
      "55\" Smart TV with Closed Captioning",
      "Doorstep ADA Parking"
    ],
    petFriendly: false,
    accessible: true,
    popularBadge: "Fully ADA Compliant",
    totalUnits: 3,
    availableUnits: 2
  }
];

export const AMENITIES_DATA: Amenity[] = [
  {
    id: "free-wifi",
    name: "High-Speed Fiber Wi-Fi 6",
    category: "property",
    description: "Ultra-fast 300+ Mbps wireless internet across all guest rooms, courtyard, and lobby. Seamless video streaming, remote working, and video calls.",
    iconName: "Wifi",
    featured: true,
    highlight: "300+ Mbps Fiber Speed",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "free-parking",
    name: "Free Doorstep Parking",
    category: "property",
    description: "Park directly in front of your room door. Ample space for passenger cars, SUVs, and large truck/trailer rigs with well-lit security.",
    iconName: "Car",
    featured: true,
    highlight: "Park at Your Doorstep",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "heated-pool",
    name: "Heated Seasonal Outdoor Pool",
    category: "wellness",
    description: "Crystal clear, heated swimming pool surrounded by towering pine trees and sun loungers. Open seasonally from May 15 through October 15.",
    iconName: "Waves",
    featured: true,
    highlight: "Heated & Pine-Bordered",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "morning-coffee-breakfast",
    name: "Complimentary Morning Roaster Bar",
    category: "service",
    description: "Wake up to fresh locally roasted Oregon coffee, herbal teas, chilled juices, warm Belgian waffles, artisan pastries, fruit, and yogurt from 6:30 AM to 9:30 AM.",
    iconName: "Coffee",
    featured: true,
    highlight: "Local Roasts & Waffles",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pet-friendly",
    name: "Pet-Friendly Welcoming",
    category: "service",
    description: "We love your furry travel buddies! Designated pet rooms feature durable wood-look flooring with direct grass relief areas and complimentary welcome treats.",
    iconName: "Dog",
    featured: true,
    highlight: "Dogs & Cats Welcome",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "in-room-fridge-microwave",
    name: "In-Room Microwave & Fridge",
    category: "room",
    description: "Every single room includes a clean compact refrigerator and high-power microwave for warming trail meals and chilling beverages.",
    iconName: "Refrigerator",
    featured: true,
    highlight: "Standard in Every Room",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "front-desk-247",
    name: "24-Hour Front Desk & Support",
    category: "service",
    description: "Arriving late after a long road trip? Our friendly front desk team is staffed around the clock with express digital check-in support.",
    iconName: "Clock",
    featured: false,
    highlight: "24/7 Live Assistance"
  },
  {
    id: "ev-charging",
    name: "Dual-Port Level 2 EV Chargers",
    category: "property",
    description: "Charge your Tesla, Rivian, or other electric vehicle overnight right on the property. Complimentary for direct booking guests.",
    iconName: "Zap",
    featured: false,
    highlight: "Free for Direct Guests"
  },
  {
    id: "guest-laundry",
    name: "Guest Laundry Facility",
    category: "property",
    description: "Clean on-site coin & app-operated commercial washers and dryers. Detergent vending available at the front desk.",
    iconName: "Sparkles",
    featured: false,
    highlight: "Open 7 AM - 10 PM"
  },
  {
    id: "climate-control",
    name: "Whisper-Quiet A/C & Heating",
    category: "room",
    description: "Individual remote-controlled climate systems in every room so you can set your exact preferred sleeping temperature.",
    iconName: "Wind",
    featured: false,
    highlight: "Individual Thermostat"
  },
  {
    id: "picnic-bbq",
    name: "Pine Grove Picnic & BBQ Area",
    category: "wellness",
    description: "Relax after your scenic drive at our outdoor cedar picnic tables and stainless steel charcoal BBQ grilling area.",
    iconName: "Utensils",
    featured: false,
    highlight: "Outdoor Grills & Tables"
  },
  {
    id: "non-smoking",
    name: "100% Smoke-Free Guest Rooms",
    category: "room",
    description: "We enforce a strict 100% non-smoking interior policy for fresh, crisp, allergen-free air in every guest room.",
    iconName: "Ban",
    featured: false,
    highlight: "Clean Fresh Air Guaranteed"
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "direct-10",
    code: "DIRECT10",
    title: "Book Direct & Save 10%",
    badge: "Most Popular",
    discountPercent: 10,
    minNights: 1,
    description: "Skip third-party commissions. Book directly on our official website to save an immediate 10% on any room type, plus get priority room selection.",
    perks: [
      "10% off nightly base rate",
      "Free 1-hour late checkout (12:00 PM)",
      "Priority ground-floor parking stall"
    ],
    terms: "Valid for all room types. Applies automatically at checkout or enter code DIRECT10.",
    validThrough: "Year-Round Ongoing",
    active: true,
    bannerImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "roadtrip-15",
    code: "ROADTRIP",
    title: "Pacific Northwest Roadtripper Package",
    badge: "Stay 2+ Nights",
    discountPercent: 15,
    minNights: 2,
    description: "Exploring the Cascade Lakes Byway, Smith Rock, or Crater Lake? Stay 2 or more nights and receive 15% off your entire stay plus complimentary road snacks.",
    perks: [
      "15% off multi-night stays",
      "Complimentary Oregon trail snack basket",
      "Complimentary EV charge or extra ice bucket"
    ],
    terms: "Requires minimum 2-night consecutive stay. Free cancellation up to 24h prior.",
    validThrough: "December 31, 2026",
    active: true,
    bannerImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "weekly-25",
    code: "WEEKLY25",
    title: "Extended Stay Weekly Rate",
    badge: "Save 25%",
    discountPercent: 25,
    minNights: 7,
    description: "Ideal for traveling nurses, contractors, remote workers, and extended vacationers. Enjoy 25% savings on 7+ nights with weekly deep cleaning.",
    perks: [
      "25% off entire reservation",
      "Weekly linen & deep housekeeping refresh",
      "Dedicated high-speed workspace & free guest laundry token"
    ],
    terms: "Requires 7-night minimum stay. Deposit required.",
    validThrough: "Ongoing Special",
    active: true,
    bannerImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "hero-15",
    code: "HERO15",
    title: "Military, First Responders & Healthcare",
    badge: "15% Everyday",
    discountPercent: 15,
    minNights: 1,
    description: "We are deeply grateful for your service. Active military, veterans, firefighters, law enforcement, EMTs, and healthcare workers save 15%.",
    perks: [
      "15% discount on all room types",
      "Free early check-in when available",
      "Complimentary bottled waters upon arrival"
    ],
    terms: "Valid government, military, or healthcare badge/ID presented at check-in.",
    validThrough: "Permanent Benefit",
    active: true,
    bannerImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "senior-aaa",
    code: "SENIORAAA",
    title: "AAA, CAA & AARP Member Discount",
    badge: "12% Off",
    discountPercent: 12,
    minNights: 1,
    description: "Present your AAA, CAA auto club card or AARP membership card at check-in to receive 12% off your room rate.",
    perks: [
      "12% nightly discount",
      "Guaranteed quiet courtyard room placement",
      "Complimentary fresh morning coffee"
    ],
    terms: "Show valid membership card at front desk during arrival.",
    validThrough: "Year-Round",
    active: true,
    bannerImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
  }
];

export const LOCAL_ATTRACTIONS: LocalAttraction[] = [
  {
    id: "downtown-bend",
    name: "Historic Downtown Bend & Old Mill District",
    category: "Culture & Downtown",
    distanceMiles: 2.1,
    driveTime: "5 mins",
    description: "Boutique shops, riverside dining patios, artisan ice cream, art galleries, and the scenic Deschutes River trail promenade.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    tag: "Dining & Shopping",
    address: "Wall St & Bond St, Bend, OR"
  },
  {
    id: "smith-rock",
    name: "Smith Rock State Park",
    category: "Nature & Parks",
    distanceMiles: 24.5,
    driveTime: "28 mins",
    description: "World-famous towering basalt volcanic cliffs, the iconic Misery Ridge trail, scenic Crooked River loops, and golden eagle nesting sites.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    tag: "World-Class Hiking",
    address: "Terrebonne, OR 97760"
  },
  {
    id: "mt-bachelor",
    name: "Mt. Bachelor Ski & Summer Resort",
    category: "Nature & Parks",
    distanceMiles: 21.0,
    driveTime: "25 mins",
    description: "Pacific Northwest ski mecca with 4,300+ acres of alpine terrain in winter, and downhill mountain biking & scenic chairlifts in summer.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
    tag: "Skiing & Mountain Biking",
    address: "Century Dr, Bend, OR"
  },
  {
    id: "deschutes-brewery",
    name: "Deschutes Brewery & Beer Hall",
    category: "Dining & Breweries",
    distanceMiles: 1.8,
    driveTime: "4 mins",
    description: "Legendary craft brewery known for Black Butte Porter and Fresh Squeezed IPA. Serving wood-fired pub cuisine and brewery tours.",
    image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&w=800&q=80",
    tag: "Local Craft Beer",
    address: "901 SW Simpson Ave, Bend, OR"
  },
  {
    id: "high-desert-museum",
    name: "High Desert Museum & Wildlife Center",
    category: "Culture & Downtown",
    distanceMiles: 4.2,
    driveTime: "6 mins",
    description: "Renowned 135-acre outdoor/indoor museum featuring live river otters, birds of prey flight shows, Native American art, and living history.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    tag: "Family Friendly",
    address: "59800 US-97, Bend, OR"
  },
  {
    id: "st-charles-medical",
    name: "St. Charles Medical Center (Hospital)",
    category: "Transit & Medical",
    distanceMiles: 3.5,
    driveTime: "7 mins",
    description: "Level II trauma center and premier regional hospital. We proudly offer special patient & visiting family discount rates.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    tag: "Regional Medical Center",
    address: "2500 NE Neff Rd, Bend, OR"
  },
  {
    id: "rdm-airport",
    name: "Redmond Municipal Airport (RDM)",
    category: "Transit & Medical",
    distanceMiles: 16.2,
    driveTime: "19 mins",
    description: "Closest commercial airport with daily nonstop flights to Seattle, San Francisco, Denver, Salt Lake City, and Phoenix.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    tag: "Commercial Airport",
    address: "2522 SE Jesse Butler Cir, Redmond, OR"
  },
  {
    id: "tumalo-falls",
    name: "Tumalo Falls & Cascade Lakes Byway",
    category: "Nature & Parks",
    distanceMiles: 13.8,
    driveTime: "20 mins",
    description: "Spectacular 97-foot waterfall with accessible viewpoint, scenic pine trails, and gateway to crystal alpine lakes (Sparks, Devil's, Elk Lake).",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    tag: "Waterfalls & Lakes",
    address: "Skyliners Rd, Bend, OR"
  }
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: "rev-1",
    authorName: "Marcus & Elena Vance",
    location: "Seattle, WA",
    rating: 5,
    date: "August 12, 2026",
    title: "Spotless, modern, and exactly what an American motel should be!",
    content: "We stopped here on our road trip down Highway 97 to California. The check-in was lightning fast, the room was remarkably clean and quiet with modern wood-style floors, and being able to park right in front of our room made unpacking our gear so effortless. The morning coffee and fresh waffles were delicious.",
    roomStayed: "Deluxe King Room",
    verifiedDirectGuest: true,
    source: "Google Reviews",
    cleanlinessScore: 5,
    comfortScore: 5,
    serviceScore: 5
  },
  {
    id: "rev-2",
    authorName: "Sarah Jenkins",
    location: "Boise, ID",
    rating: 5,
    date: "July 28, 2026",
    title: "Best pet-friendly stay we've ever had",
    content: "Traveling with a 65lb Golden Retriever is usually stressful, but The Pinecrest made it a breeze. Our ground-floor room opened straight onto a manicured grass courtyard, they had water bowls and treats ready, and the room smelled fresh and pristine. We'll be staying here every time we visit Bend!",
    roomStayed: "Pet-Friendly Queen Room",
    verifiedDirectGuest: true,
    source: "Direct Guest",
    cleanlinessScore: 5,
    comfortScore: 5,
    serviceScore: 5
  },
  {
    id: "rev-3",
    authorName: "David Miller & Family",
    location: "San Francisco, CA",
    rating: 5,
    date: "August 3, 2026",
    title: "Two-Room Suite was perfect for our family of four",
    content: "Having two separate bedrooms at a fraction of the cost of downtown hotels was incredible. The kids loved swimming in the heated pool while my wife and I relaxed on the lounge chairs. Fast Wi-Fi handled our streaming easily. Staff gave us great dinner recommendations!",
    roomStayed: "Two-Room Family Suite",
    verifiedDirectGuest: true,
    source: "TripAdvisor",
    cleanlinessScore: 5,
    comfortScore: 5,
    serviceScore: 5
  },
  {
    id: "rev-4",
    authorName: "Robert Kowalski",
    location: "Denver, CO",
    rating: 5,
    date: "July 15, 2026",
    title: "Excellent value for roadtrippers and outdoor lovers",
    content: "As someone who travels for hiking and fly fishing, I appreciate simplicity and high quality. The shower had great hot water pressure, the King bed was super comfortable after 9 hours of driving, and having a microwave and fridge let us prep breakfast snacks easily. Highly recommended.",
    roomStayed: "Deluxe King Room",
    verifiedDirectGuest: true,
    source: "Google Reviews",
    cleanlinessScore: 5,
    comfortScore: 5,
    serviceScore: 5
  },
  {
    id: "rev-5",
    authorName: "Patricia & Donald Hayes",
    location: "Portland, OR",
    rating: 5,
    date: "June 29, 2026",
    title: "Warm hospitality, nostalgic motel charm with modern luxury",
    content: "The Pinecrest captures everything we love about vintage roadside motels (doorstep parking, easy access, friendly owners) but delivers modern comfort like high-end mattresses, fast Wi-Fi, and crisp white linens. We booked directly through their website and saved almost $30.",
    roomStayed: "Double Queen Suite",
    verifiedDirectGuest: true,
    source: "Direct Guest",
    cleanlinessScore: 5,
    comfortScore: 5,
    serviceScore: 5
  }
];

export const GALLERY_PHOTOS = [
  {
    id: "gal-1",
    category: "Exterior & Grounds",
    title: "Courtyard & Mountain Sun",
    caption: "Our welcoming roadside property framed by Central Oregon ponderosa pines with doorstep parking.",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "gal-2",
    category: "Rooms & Suites",
    title: "Deluxe King Plush Bed",
    caption: "Spotless Euro-top king bed with luxury 400-thread count sheets and warm timber accents.",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "gal-3",
    category: "Pool & Relax",
    title: "Heated Seasonal Swimming Pool",
    caption: "Crystal clear, heated outdoor pool with loungers and mountain pine surroundings.",
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "gal-4",
    category: "Rooms & Suites",
    title: "Double Queen Family Layout",
    caption: "Two spacious queen beds with luggage storage and double vanity station.",
    url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "gal-5",
    category: "Bathrooms",
    title: "Modern Walk-In Rain Shower",
    caption: "Sparkling clean tile bathroom with high water pressure and organic bath amenities.",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "gal-6",
    category: "Breakfast & Coffee",
    title: "Morning Artisan Coffee Station",
    caption: "Freshly roasted Oregon coffee and hot morning waffle bar served daily.",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "gal-7",
    category: "Rooms & Suites",
    title: "King Studio Kitchenette",
    caption: "Extended-stay kitchenette with cooktop, microwave, cookware, and full-size fridge.",
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "gal-8",
    category: "Exterior & Grounds",
    title: "Evening Pinecrest Glow",
    caption: "Illuminated neon-accented lodge signage and cozy exterior courtyard lighting.",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "gal-9",
    category: "Pool & Relax",
    title: "Outdoor Cedar Picnic Gazebo",
    caption: "Shaded outdoor seating and BBQ grilling area for evening family cookouts.",
    url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1400&q=80"
  }
];

export const PROPERTY_POLICIES = [
  {
    title: "Check-In & Check-Out Times",
    summary: "Check-in: 3:00 PM | Check-out: 11:00 AM",
    details: "Early check-in (from 1:00 PM) and late check-out (until 1:00 PM) are available upon request for direct booking guests. Our front desk is staffed 24/7, so late night arrivals are always welcomed."
  },
  {
    title: "Direct Booking Cancellation Policy",
    summary: "100% Free Cancellation up to 24 Hours Before Arrival",
    details: "Standard direct reservations can be cancelled or modified with zero penalty up to 24 hours prior to 3:00 PM on your scheduled check-in date. Cancellations within 24 hours are subject to a one-night room rate fee."
  },
  {
    title: "Pet Policy (Designated Rooms)",
    summary: "Well-behaved dogs & cats welcome in dedicated pet rooms ($20/night)",
    details: "We welcome up to 2 pets per pet-friendly designated room. A flat cleaning fee of $20 per night applies. Pets must be on leash in common areas and must not be left unattended in rooms."
  },
  {
    title: "Doorstep Parking & Vehicles",
    summary: "Free on-site parking for 1 standard vehicle per room + trailer stalls",
    details: "Every room has a dedicated parking stall directly in front of the door. We also offer designated oversized vehicle parking for RVs, boat trailers, and commercial trucks at no extra charge."
  },
  {
    title: "100% Smoke-Free Property",
    summary: "Non-smoking inside all guest rooms and indoor areas",
    details: "For the health and comfort of all travelers, smoking or vaping is strictly prohibited inside any guest room. A designated outdoor smoking pavilion with seating is available in the perimeter courtyard."
  },
  {
    title: "Payment & Security Deposit",
    summary: "Major credit cards accepted & pay-at-check-in available",
    details: "We accept Visa, MasterCard, American Express, Discover, and Apple Pay. A valid photo ID and credit card authorization for an incidental hold of $50 are collected at check-in (fully released at checkout)."
  },
  {
    title: "Quiet Hours",
    summary: "10:00 PM to 7:00 AM daily",
    details: "To ensure every traveler enjoys a peaceful night of rest, we maintain quiet hours from 10:00 PM to 7:00 AM. Outdoor pool closes promptly at 9:30 PM."
  }
];

export const FAQS = [
  {
    question: "Why should I book directly on this website instead of Expedia or Booking.com?",
    answer: "When you book directly on our website, you get our Guaranteed Lowest Rate (saving $15-$25/night), priority room selection, free 1-hour early check-in or late check-out when available, free EV charging, and 100% direct customer support without third-party hold times."
  },
  {
    question: "Can I check in late at night if I'm driving long distance?",
    answer: "Yes! Our front desk is staffed 24 hours a day, 7 days a week. If you arrive at 11 PM or 2 AM, a friendly team member will be here to hand you your room key."
  },
  {
    question: "Is parking really right outside my room door?",
    answer: "Yes! The Pinecrest is built with classic American single-story and two-story exterior corridor design, allowing you to park your car just steps from your entrance door."
  },
  {
    question: "Is breakfast included with our stay?",
    answer: "Yes! All registered guests enjoy our complimentary Morning Roaster Bar from 6:30 AM to 9:30 AM daily, including fresh Oregon coffee, hot waffles, baked pastries, yogurt, oatmeal, and fruit."
  },
  {
    question: "Are your rooms pet-friendly?",
    answer: "We have designated Pet-Friendly Queen Rooms featuring easy-clean hardwood-style flooring and direct grass courtyard access. Be sure to select the 'Pet-Friendly Queen Room' when booking."
  },
  {
    question: "How far is the motel from Mt. Bachelor and downtown Bend?",
    answer: "We are located right on Scenic Highway 97, just 5 minutes (2 miles) from historic downtown Bend and 25 minutes (21 miles) from Mt. Bachelor ski slopes."
  },
  {
    question: "Do all rooms have microwaves and mini-refrigerators?",
    answer: "Yes! Every single room and suite at The Pinecrest comes standard with a clean compact refrigerator, microwave, and Keurig coffee maker."
  }
];
