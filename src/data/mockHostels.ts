export interface Hostel {
  id: string;
  title: string;
  description: string;
  price: number; // Monthly in BDT
  currency: string;
  type: "Mess" | "Hostel"; // Mess includes food, Hostel may/may not
  gender: "Male" | "Female" | "Co-ed";
  tenantType: "Student" | "Job Holder" | "Both";
  roomType: "Single" | "Shared (2-person)" | "Shared (3-4 person)";
  mealOptions: "Included" | "Not Included" | "Optional";
  mealsPerDay?: number; // If meals included
  mealTiming?: string[];
  floor: string; // e.g., "2nd Floor", "Ground Floor", "3rd & 4th Floor"
  totalFloors: number;
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
  facilities: string[];
  utilities: {
    electricity: boolean;
    water: boolean;
    gas: boolean;
    wifi: boolean;
    generator: boolean;
  };
  roomFacilities: string[];
  commonAreas: string[];
  nearbyPlaces: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
  rules: string[];
  security: string[];
  advancePayment: number; // Number of months
  securityDeposit: number;
  capacityPerRoom: number;
  totalRooms: number;
  availableSeats: number;
  manager: {
    name: string;
    phone: string;
    verified: boolean;
  };
  features: string[];
  cleaning: {
    roomCleaning: boolean;
    frequency: string;
    bathroomCleaning: boolean;
  };
  gateClosingTime: string;
  studyHours: string;
  rating: number;
  totalReviews: number;
  postedDate: string;
  establishedYear: number;
}

export const mockHostels: Hostel[] = [
  {
    id: "1",
    title: "RU Students Mess - Male (3 Times Meal)",
    description: "Affordable and clean mess for male students near Rajshahi University. We provide 3 times fresh homemade meals (breakfast, lunch, dinner). Perfect for students who want a homely food experience. The mess is well-maintained with a friendly environment. Shared rooms with 3-4 students. Study-friendly atmosphere during exam periods.",
    price: 3500,
    currency: "BDT",
    type: "Mess",
    gender: "Male",
    tenantType: "Student",
    roomType: "Shared (3-4 person)",
    mealOptions: "Included",
    mealsPerDay: 3,
    mealTiming: ["8:00 AM - 9:30 AM", "1:00 PM - 2:30 PM", "8:30 PM - 10:00 PM"],
    floor: "2nd & 3rd Floor",
    totalFloors: 4,
    location: {
      address: "House #23, Road #5, Shaheb Bazar",
      area: "Shaheb Bazar",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3748,
        lng: 88.6038,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
    ],
    facilities: [
      "3 Times Fresh Meals",
      "Homemade Food",
      "Study Table",
      "Shared Bathroom",
      "Common TV Room",
      "Prayer Room",
      "Rooftop Access",
    ],
    utilities: {
      electricity: true,
      water: true,
      gas: true,
      wifi: true,
      generator: false,
    },
    roomFacilities: [
      "Study Table & Chair",
      "Bed with Mattress",
      "Wardrobe Space",
      "Ceiling Fan",
      "Natural Light",
    ],
    commonAreas: [
      "Dining Hall",
      "TV Lounge",
      "Prayer Room",
      "Rooftop",
    ],
    nearbyPlaces: [
      { name: "Rajshahi University", distance: "800 m", type: "University" },
      { name: "Shaheb Bazar Market", distance: "300 m", type: "Market" },
      { name: "Popular Pharmacy", distance: "200 m", type: "Pharmacy" },
    ],
    rules: [
      "Gate closes at 10:30 PM",
      "No guests after 8 PM",
      "Maintain silence during study hours (8 PM - 11 PM)",
      "Keep room and common areas clean",
      "No smoking inside the building",
    ],
    security: [
      "Main Gate Lock",
      "Security Guard",
      "CCTV at Entrance",
    ],
    advancePayment: 1,
    securityDeposit: 2000,
    capacityPerRoom: 4,
    totalRooms: 6,
    availableSeats: 3,
    manager: {
      name: "Abdul Karim",
      phone: "+880 1712-456789",
      verified: true,
    },
    features: [
      "Fresh Daily Meals",
      "Quiet Study Environment",
      "Clean Bathrooms",
      "Friendly Atmosphere",
      "Budget Friendly",
    ],
    cleaning: {
      roomCleaning: false,
      frequency: "Students Clean Own Room",
      bathroomCleaning: true,
    },
    gateClosingTime: "10:30 PM",
    studyHours: "8:00 PM - 11:00 PM (Quiet Hours)",
    rating: 4.3,
    totalReviews: 28,
    postedDate: "2024-11-20",
    establishedYear: 2018,
  },
  {
    id: "2",
    title: "Ladies Hostel - AC Rooms (RMC Students)",
    description: "Premium ladies hostel exclusively for female students of Rajshahi Medical College and other universities. Safe and secure environment with 24/7 security, CCTV monitoring, and female caretaker. AC rooms available. Optional meal packages. Single and shared rooms both available. Study-friendly environment with dedicated study room. Strict security measures for your safety.",
    price: 6500,
    currency: "BDT",
    type: "Hostel",
    gender: "Female",
    tenantType: "Student",
    roomType: "Shared (2-person)",
    mealOptions: "Optional",
    floor: "3rd to 5th Floor",
    totalFloors: 6,
    location: {
      address: "Building #12, Kazla Road",
      area: "Kazla",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3652,
        lng: 88.5987,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    ],
    facilities: [
      "AC Rooms",
      "24/7 Security",
      "Female Caretaker",
      "CCTV Surveillance",
      "Attached Bathroom",
      "Study Room",
      "Common Kitchen",
      "Laundry Service",
      "Water Purifier",
    ],
    utilities: {
      electricity: true,
      water: true,
      gas: true,
      wifi: true,
      generator: true,
    },
    roomFacilities: [
      "Air Conditioner",
      "Study Table & Chair",
      "Bed with Mattress",
      "Personal Locker",
      "Wardrobe",
      "Attached Bathroom",
      "Balcony",
    ],
    commonAreas: [
      "Study Room",
      "TV Lounge",
      "Prayer Room",
      "Kitchen",
      "Dining Area",
    ],
    nearbyPlaces: [
      { name: "Rajshahi Medical College", distance: "1.5 km", type: "Medical College" },
      { name: "Kazla Gate", distance: "400 m", type: "Landmark" },
      { name: "Apollo Diagnostic", distance: "500 m", type: "Diagnostic Center" },
    ],
    rules: [
      "Only for female students",
      "Gate closes at 9:00 PM strictly",
      "No male visitors allowed",
      "ID card must be shown at entry",
      "Maintain room cleanliness",
      "Prior notice required for late entry",
    ],
    security: [
      "24/7 Security Guard",
      "CCTV at All Floors",
      "Female Caretaker Available",
      "Visitor Register Maintained",
      "Emergency Contact System",
    ],
    advancePayment: 2,
    securityDeposit: 5000,
    capacityPerRoom: 2,
    totalRooms: 12,
    availableSeats: 4,
    manager: {
      name: "Mrs. Nasima Begum",
      phone: "+880 1812-567890",
      verified: true,
    },
    features: [
      "Safe for Girls",
      "AC Comfort",
      "Study Friendly",
      "Clean & Hygienic",
      "24/7 Security",
      "Premium Facilities",
    ],
    cleaning: {
      roomCleaning: true,
      frequency: "Weekly",
      bathroomCleaning: true,
    },
    gateClosingTime: "9:00 PM",
    studyHours: "7:00 PM - 11:00 PM (Complete Silence)",
    rating: 4.8,
    totalReviews: 42,
    postedDate: "2024-12-01",
    establishedYear: 2020,
  },
  {
    id: "3",
    title: "Bachelor Mess - Binodpur (Job Holders Preferred)",
    description: "Well-maintained bachelor mess for working professionals and job holders. Located in peaceful Binodpur area. No food provided - cooking facilities available. Perfect for IT professionals, bank employees, and govt. job holders. Single and shared rooms available. Peaceful environment suitable for professionals who need privacy and comfort after work.",
    price: 4000,
    currency: "BDT",
    type: "Hostel",
    gender: "Male",
    tenantType: "Job Holder",
    roomType: "Shared (2-person)",
    mealOptions: "Not Included",
    floor: "2nd Floor",
    totalFloors: 3,
    location: {
      address: "Plot #34, Binodpur Bazar Road",
      area: "Binodpur",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3638,
        lng: 88.6198,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    ],
    facilities: [
      "Common Kitchen",
      "Refrigerator",
      "Gas Stove",
      "Attached Bathroom",
      "Bike Parking",
      "Separate Entrance",
    ],
    utilities: {
      electricity: true,
      water: true,
      gas: true,
      wifi: true,
      generator: false,
    },
    roomFacilities: [
      "Bed with Mattress",
      "Study/Work Table",
      "Chair",
      "Wardrobe",
      "Ceiling Fan",
      "Attached Bathroom",
    ],
    commonAreas: [
      "Kitchen",
      "Dining Space",
      "Prayer Room",
    ],
    nearbyPlaces: [
      { name: "Rajshahi University", distance: "600 m", type: "University" },
      { name: "Binodpur Bazar", distance: "150 m", type: "Market" },
      { name: "IFIC Bank", distance: "400 m", type: "Bank" },
    ],
    rules: [
      "Job holders preferred",
      "No time restriction for entry",
      "Keep common areas clean",
      "Share kitchen maintenance",
      "No loud noise after 10 PM",
    ],
    security: [
      "Main Gate Lock",
      "Individual Room Keys",
    ],
    advancePayment: 2,
    securityDeposit: 3000,
    capacityPerRoom: 2,
    totalRooms: 8,
    availableSeats: 2,
    manager: {
      name: "Jahangir Alam",
      phone: "+880 1912-678901",
      verified: true,
    },
    features: [
      "Professional Environment",
      "Cooking Facilities",
      "No Time Restrictions",
      "Peaceful Area",
      "Bike Parking",
    ],
    cleaning: {
      roomCleaning: false,
      frequency: "Self-cleaning",
      bathroomCleaning: false,
    },
    gateClosingTime: "No Restriction",
    studyHours: "N/A",
    rating: 4.1,
    totalReviews: 15,
    postedDate: "2024-11-15",
    establishedYear: 2019,
  },
  {
    id: "4",
    title: "Premium Girls Mess with Food (Near RU)",
    description: "Premium quality mess for female students with delicious homemade food. Run by experienced cook with 10+ years experience. Menu changes daily with variety. AC optional rooms available. Very safe environment with strict security. Located walking distance from Rajshahi University main campus. Perfect for girls who want quality food and safe accommodation.",
    price: 5500,
    currency: "BDT",
    type: "Mess",
    gender: "Female",
    tenantType: "Student",
    roomType: "Shared (2-person)",
    mealOptions: "Included",
    mealsPerDay: 3,
    mealTiming: ["8:00 AM - 9:00 AM", "1:30 PM - 2:30 PM", "8:30 PM - 9:30 PM"],
    floor: "3rd Floor",
    totalFloors: 5,
    location: {
      address: "House #45, Shaheb Bazar Main Road",
      area: "Shaheb Bazar",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3742,
        lng: 88.6051,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
    ],
    facilities: [
      "3 Times Quality Meals",
      "Varied Menu",
      "AC Optional",
      "Study Room",
      "Laundry Service",
      "Locker Facility",
      "Water Purifier",
      "CCTV Security",
    ],
    utilities: {
      electricity: true,
      water: true,
      gas: true,
      wifi: true,
      generator: true,
    },
    roomFacilities: [
      "Study Table & Chair",
      "Bed with Mattress",
      "Personal Locker",
      "Wardrobe",
      "Ceiling Fan",
      "Balcony",
    ],
    commonAreas: [
      "Study Room",
      "Dining Hall",
      "TV Lounge",
      "Prayer Room",
    ],
    nearbyPlaces: [
      { name: "Rajshahi University", distance: "700 m", type: "University" },
      { name: "New Market", distance: "500 m", type: "Market" },
      { name: "Ladies Hostel Bus Stop", distance: "100 m", type: "Transport" },
    ],
    rules: [
      "Only for female students",
      "Gate closes at 8:30 PM",
      "No male visitors",
      "Must inform if staying out",
      "Maintain hygiene",
    ],
    security: [
      "24/7 Female Guard",
      "CCTV Surveillance",
      "Main Gate Lock",
      "Emergency Contact",
    ],
    advancePayment: 1,
    securityDeposit: 3000,
    capacityPerRoom: 2,
    totalRooms: 10,
    availableSeats: 5,
    manager: {
      name: "Mrs. Ayesha Rahman",
      phone: "+880 1712-789012",
      verified: true,
    },
    features: [
      "Quality Food",
      "Safe for Girls",
      "Experienced Cook",
      "Daily Varied Menu",
      "Clean Environment",
    ],
    cleaning: {
      roomCleaning: true,
      frequency: "Twice a week",
      bathroomCleaning: true,
    },
    gateClosingTime: "8:30 PM",
    studyHours: "8:00 PM - 11:00 PM (Quiet Hours)",
    rating: 4.6,
    totalReviews: 35,
    postedDate: "2024-11-25",
    establishedYear: 2017,
  },
  {
    id: "5",
    title: "Single Room Hostel - Motihar (Premium)",
    description: "Premium single room hostel in Motihar for professionals and serious students. Each room is like a mini apartment with attached bathroom, small kitchenette, and study space. Perfect for those who need privacy and focus. AC rooms with modern facilities. Suitable for PhD scholars, competitive exam preparers, and working professionals. No food provided but cooking facilities in room.",
    price: 8500,
    currency: "BDT",
    type: "Hostel",
    gender: "Male",
    tenantType: "Both",
    roomType: "Single",
    mealOptions: "Not Included",
    floor: "4th to 7th Floor",
    totalFloors: 8,
    location: {
      address: "Building #8, Motihar Circle",
      area: "Motihar",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3598,
        lng: 88.5876,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
    ],
    facilities: [
      "Single AC Rooms",
      "Attached Bathroom",
      "Kitchenette in Room",
      "24/7 Security",
      "CCTV",
      "Lift/Elevator",
      "Bike Parking",
      "Generator Backup",
    ],
    utilities: {
      electricity: true,
      water: true,
      gas: true,
      wifi: true,
      generator: true,
    },
    roomFacilities: [
      "Air Conditioner",
      "Large Study Table",
      "Comfortable Chair",
      "Bed with Mattress",
      "Wardrobe",
      "Attached Bathroom",
      "Small Kitchenette",
      "Refrigerator",
      "Balcony",
    ],
    commonAreas: [
      "Rooftop",
      "Prayer Room",
      "Lobby",
    ],
    nearbyPlaces: [
      { name: "Islami Bank Hospital", distance: "800 m", type: "Hospital" },
      { name: "Motihar More", distance: "200 m", type: "Landmark" },
      { name: "Reliance Diagnostic", distance: "500 m", type: "Diagnostic" },
    ],
    rules: [
      "Maintain room cleanliness",
      "No loud noise",
      "Visitors till 10 PM",
      "Respect other residents",
    ],
    security: [
      "24/7 Security Guard",
      "CCTV on All Floors",
      "Individual Room Locks",
      "Fire Extinguishers",
    ],
    advancePayment: 2,
    securityDeposit: 10000,
    capacityPerRoom: 1,
    totalRooms: 16,
    availableSeats: 2,
    manager: {
      name: "Rafiqul Islam",
      phone: "+880 1612-890123",
      verified: true,
    },
    features: [
      "Complete Privacy",
      "AC Comfort",
      "Own Bathroom",
      "Cooking in Room",
      "Premium Location",
      "Modern Facilities",
    ],
    cleaning: {
      roomCleaning: false,
      frequency: "Self-cleaning",
      bathroomCleaning: false,
    },
    gateClosingTime: "No Restriction",
    studyHours: "N/A",
    rating: 4.9,
    totalReviews: 21,
    postedDate: "2024-12-03",
    establishedYear: 2021,
  },
  {
    id: "6",
    title: "Budget Student Mess - Boalia (৳3000 Only)",
    description: "Most affordable mess for students in Boalia area. Basic but clean accommodation with 2 times meals (lunch and dinner). Perfect for students on tight budget who need economical living. Shared rooms with 4 students. Simple but homely environment. Mess manager is very cooperative and understanding. Great option for students who want to save money.",
    price: 3000,
    currency: "BDT",
    type: "Mess",
    gender: "Male",
    tenantType: "Student",
    roomType: "Shared (3-4 person)",
    mealOptions: "Included",
    mealsPerDay: 2,
    mealTiming: ["1:00 PM - 2:00 PM", "8:30 PM - 9:30 PM"],
    floor: "Ground & 1st Floor",
    totalFloors: 2,
    location: {
      address: "House #67, Boalia Thana Road",
      area: "Boalia",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3705,
        lng: 88.5923,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
    ],
    facilities: [
      "2 Times Meals",
      "Basic Furniture",
      "Shared Bathroom",
      "Common Space",
    ],
    utilities: {
      electricity: true,
      water: true,
      gas: true,
      wifi: false,
      generator: false,
    },
    roomFacilities: [
      "Bed",
      "Study Table",
      "Chair",
      "Ceiling Fan",
    ],
    commonAreas: [
      "Dining Area",
      "Prayer Space",
    ],
    nearbyPlaces: [
      { name: "Boalia Thana", distance: "300 m", type: "Police Station" },
      { name: "Local Market", distance: "200 m", type: "Market" },
      { name: "RU Campus", distance: "3 km", type: "University" },
    ],
    rules: [
      "Gate closes at 11 PM",
      "Keep room clean",
      "No loud music",
      "Respect meal timings",
    ],
    security: [
      "Main Gate Lock",
      "Caretaker Available",
    ],
    advancePayment: 1,
    securityDeposit: 1500,
    capacityPerRoom: 4,
    totalRooms: 8,
    availableSeats: 6,
    manager: {
      name: "Sumon Mia",
      phone: "+880 1812-901234",
      verified: true,
    },
    features: [
      "Most Affordable",
      "Basic Clean Living",
      "2 Times Food",
      "Student Friendly",
    ],
    cleaning: {
      roomCleaning: false,
      frequency: "Self-cleaning",
      bathroomCleaning: true,
    },
    gateClosingTime: "11:00 PM",
    studyHours: "Flexible",
    rating: 3.9,
    totalReviews: 18,
    postedDate: "2024-11-10",
    establishedYear: 2016,
  },
];

// Function to get hostel by ID
export function getHostelById(id: string): Hostel | undefined {
  return mockHostels.find((hostel) => hostel.id === id);
}
