export interface House {
  id: string;
  title: string;
  description: string;
  price: number; // Monthly rent in BDT
  currency: string;
  propertyType: "Apartment" | "House" | "Studio" | "Duplex" | "Penthouse";
  bedrooms: number;
  bathrooms: number;
  size: number; // in square feet
  floor: string;
  totalFloors: number;
  furnishing: "Furnished" | "Semi-Furnished" | "Unfurnished";
  availableFrom: string;
  location: {
    address: string;
    area: string;
    city: string;
    division: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  amenities: string[];
  utilities: {
    gas: boolean;
    electricity: boolean;
    water: boolean;
    internet: boolean;
    generator: boolean;
  };
  nearbyPlaces: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
  rules: string[];
  securityDeposit: number;
  advanceRent: number; // Number of months
  owner: {
    name: string;
    phone: string;
    email: string;
    verified: boolean;
  };
  features: string[];
  parking: {
    available: boolean;
    type?: "Car" | "Bike" | "Both";
    capacity?: number;
  };
  rating: number;
  totalReviews: number;
  postedDate: string;
}

export const mockHouses: House[] = [
  {
    id: "1",
    title: "Luxurious 3 Bedroom Apartment in Shaheb Bazar",
    description: "Beautiful and spacious 3 bedroom apartment located in the heart of Shaheb Bazar, Rajshahi. This modern apartment features large windows with natural light, a well-designed kitchen, and a comfortable living space perfect for families. The building is well-maintained with 24/7 security and CCTV surveillance. Walking distance to markets, schools, and hospitals.",
    price: 18000,
    currency: "BDT",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: 1200,
    floor: "4th Floor",
    totalFloors: 6,
    furnishing: "Semi-Furnished",
    availableFrom: "2025-01-15",
    location: {
      address: "House #45, Road #3, Shaheb Bazar",
      area: "Shaheb Bazar",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3745,
        lng: 88.6042,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800",
    ],
    amenities: [
      "24/7 Security",
      "CCTV Surveillance",
      "Lift/Elevator",
      "Rooftop Access",
      "Common Prayer Room",
      "Visitor Parking",
      "Playground",
    ],
    utilities: {
      gas: true,
      electricity: true,
      water: true,
      internet: true,
      generator: true,
    },
    nearbyPlaces: [
      { name: "Rajshahi Medical College Hospital", distance: "2.5 km", type: "Hospital" },
      { name: "New Market", distance: "500 m", type: "Shopping" },
      { name: "Rajshahi University", distance: "5 km", type: "University" },
      { name: "Bhubon Mohon Park", distance: "1.2 km", type: "Park" },
      { name: "Agrani Bank", distance: "300 m", type: "Bank" },
    ],
    rules: [
      "No smoking inside the apartment",
      "No pets allowed",
      "Rent must be paid by 5th of every month",
      "Subletting not allowed",
      "Visitors allowed till 10 PM",
    ],
    securityDeposit: 36000,
    advanceRent: 2,
    owner: {
      name: "Md. Kamal Hossain",
      phone: "+880 1712-345678",
      email: "kamal.hossain@example.com",
      verified: true,
    },
    features: [
      "Balcony with City View",
      "Modular Kitchen",
      "Master Bedroom with Attached Bathroom",
      "Spacious Living Room",
      "Dining Area",
      "Storage Room",
    ],
    parking: {
      available: true,
      type: "Both",
      capacity: 2,
    },
    rating: 4.5,
    totalReviews: 12,
    postedDate: "2024-12-01",
  },
  {
    id: "2",
    title: "Cozy 2 Bedroom House in Uposhohor",
    description: "Well-maintained 2 bedroom independent house in peaceful Uposhohor residential area. Perfect for small families looking for a quiet neighborhood. The house has a small garden in front and a backyard. All amenities are available within walking distance.",
    price: 12000,
    currency: "BDT",
    propertyType: "House",
    bedrooms: 2,
    bathrooms: 1,
    size: 900,
    floor: "Ground Floor",
    totalFloors: 1,
    furnishing: "Unfurnished",
    availableFrom: "2025-01-01",
    location: {
      address: "Plot #12, Block B, Uposhohor",
      area: "Uposhohor",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3636,
        lng: 88.6241,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    amenities: [
      "Garden",
      "Boundary Wall",
      "Gate with Lock",
      "Separate Entrance",
    ],
    utilities: {
      gas: true,
      electricity: true,
      water: true,
      internet: false,
      generator: false,
    },
    nearbyPlaces: [
      { name: "Popular Diagnostic Center", distance: "1 km", type: "Hospital" },
      { name: "Supan Market", distance: "800 m", type: "Shopping" },
      { name: "RDA School", distance: "600 m", type: "School" },
    ],
    rules: [
      "Family preferred",
      "No loud music after 9 PM",
      "Maintain cleanliness",
    ],
    securityDeposit: 24000,
    advanceRent: 2,
    owner: {
      name: "Mrs. Rehana Khatun",
      phone: "+880 1812-345679",
      email: "rehana.k@example.com",
      verified: true,
    },
    features: [
      "Private Garden",
      "Independent House",
      "Natural Ventilation",
      "Ample Sunlight",
    ],
    parking: {
      available: true,
      type: "Bike",
      capacity: 2,
    },
    rating: 4.2,
    totalReviews: 8,
    postedDate: "2024-11-28",
  },
  {
    id: "3",
    title: "Modern Studio Apartment near Rajshahi University",
    description: "Perfect for students or young professionals! Compact studio apartment with all modern amenities near Rajshahi University. Fully furnished with bed, study table, wardrobe, and kitchen appliances. High-speed internet included in rent.",
    price: 8000,
    currency: "BDT",
    propertyType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    size: 450,
    floor: "2nd Floor",
    totalFloors: 4,
    furnishing: "Furnished",
    availableFrom: "2024-12-20",
    location: {
      address: "Building #7, Binodpur Bazar Road",
      area: "Binodpur",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3641,
        lng: 88.6206,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
    ],
    amenities: [
      "High-Speed WiFi Included",
      "24/7 Water Supply",
      "Backup Generator",
      "Common Laundry",
    ],
    utilities: {
      gas: true,
      electricity: true,
      water: true,
      internet: true,
      generator: true,
    },
    nearbyPlaces: [
      { name: "Rajshahi University", distance: "500 m", type: "University" },
      { name: "Binodpur Bazar", distance: "200 m", type: "Shopping" },
      { name: "RU Clinic", distance: "600 m", type: "Hospital" },
    ],
    rules: [
      "Students preferred",
      "No parties",
      "Guest allowed with prior notice",
    ],
    securityDeposit: 16000,
    advanceRent: 2,
    owner: {
      name: "Mr. Farhan Ahmed",
      phone: "+880 1912-345680",
      email: "farhan.a@example.com",
      verified: true,
    },
    features: [
      "Fully Furnished",
      "WiFi Included",
      "Attached Bathroom",
      "Kitchenette",
      "Study Table & Chair",
      "Wardrobe",
    ],
    parking: {
      available: true,
      type: "Bike",
      capacity: 1,
    },
    rating: 4.7,
    totalReviews: 15,
    postedDate: "2024-12-05",
  },
];

// Function to get house by ID
export function getHouseById(id: string): House | undefined {
  return mockHouses.find((house) => house.id === id);
}
