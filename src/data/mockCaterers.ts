export interface Caterer {
  id: string;
  businessName: string;
  description: string;
  ownerName: string;
  established: number;
  hasRestaurant: boolean;
  restaurantAddress?: string;
  serviceType: "Home-Based" | "Restaurant-Based" | "Cloud Kitchen";
  cuisineStyle: string[]; // Bengali, Indian, Chinese, Home-style, etc.
  specialties: string[];
  mealTypes: ("Breakfast" | "Lunch" | "Dinner")[]; // Which meals they provide
  menuRotation: "Daily" | "Weekly" | "Fixed"; // How often menu changes
  sampleMenus: {
    day: string;
    breakfast?: string[];
    lunch?: string[];
    dinner?: string[];
  }[];
  pricing: {
    breakfast: number;
    lunch: number;
    dinner: number;
    monthlyPackage: {
      lunch: number; // 30 days lunch
      lunchDinner: number; // 30 days lunch + dinner
      fullDay: number; // 30 days all meals
    };
  };
  deliveryAreas: string[];
  deliveryTiming: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  targetCustomers: string[]; // Office, Students, Bachelors, Families, etc.
  minimumOrder: number; // Minimum persons for delivery
  packaging: string; // Type of packaging used
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
  features: string[];
  hygieneCertificates: string[];
  trialAvailable: boolean;
  advanceOrder: string; // How much advance notice needed
  cancellationPolicy: string;
  paymentOptions: string[];
  rating: number;
  totalReviews: number;
  activeSubscribers: number;
  verified: boolean;
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
  operatingDays: string;
  establishedSince: number;
  reviewHighlights: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string; // Optional avatar URL, will use initials if not provided
  rating: number; // 1-5
  date: string; // ISO date string
  comment: string;
  helpfulCount: number;
  images?: string[]; // Optional food images from user
  orderType: string; // e.g., "Monthly Lunch Package", "Daily Tiffin"
}

export const mockCaterers: Caterer[] = [
  {
    id: "1",
    businessName: "Ghor Er Ranna Catering",
    description: "We provide authentic home-style Bengali meals delivered fresh to your office or home. Our experienced cooks prepare traditional Bengali dishes with the same care as home cooking. Perfect for offices, students, and bachelors who miss home-cooked food. We serve 200+ regular customers daily across Rajshahi city.",
    ownerName: "Mrs. Nasima Begum",
    established: 2015,
    hasRestaurant: false,
    serviceType: "Home-Based",
    cuisineStyle: ["Bengali Home-style", "Traditional"],
    specialties: ["Daily Tiffin Service", "Home-cooked Meals", "Corporate Lunch"],
    mealTypes: ["Lunch", "Dinner"],
    menuRotation: "Daily",
    sampleMenus: [
      {
        day: "Saturday",
        lunch: ["Plain Rice", "Chicken Curry", "Dal", "Mixed Vegetable", "Salad"],
        dinner: ["Rice", "Fish Curry (Rui/Katla)", "Aloo Bhaji", "Dal"],
      },
      {
        day: "Sunday",
        lunch: ["Polao", "Beef Curry", "Egg Bhuna", "Vegetable", "Salad"],
        dinner: ["Rice", "Chicken Roast", "Dal", "Begun Bhaji"],
      },
      {
        day: "Monday",
        lunch: ["Rice", "Fish Fry", "Chicken Curry", "Mixed Veg", "Dal"],
        dinner: ["Rice", "Beef Bhuna", "Aloo Vorta", "Dal"],
      },
      {
        day: "Tuesday",
        lunch: ["Rice", "Mutton Curry", "Egg Curry", "Vegetable", "Dal"],
        dinner: ["Rice", "Prawn Curry", "Shak Bhaji", "Dal"],
      },
    ],
    pricing: {
      breakfast: 0,
      lunch: 100,
      dinner: 90,
      monthlyPackage: {
        lunch: 2700,
        lunchDinner: 5200,
        fullDay: 0,
      },
    },
    deliveryAreas: ["Shaheb Bazar", "Kazla", "Boalia", "Court Area", "New Market", "Laxmipur"],
    deliveryTiming: {
      lunch: "12:30 PM - 1:30 PM",
      dinner: "7:30 PM - 8:30 PM",
    },
    targetCustomers: ["Office Employees", "Students", "Bachelors", "Working Professionals"],
    minimumOrder: 1,
    packaging: "Disposable food-grade containers with secure lids",
    location: {
      address: "House #45, Road #7, Shaheb Bazar",
      area: "Shaheb Bazar",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3745,
        lng: 88.6042,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800",
      "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?w=800",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    ],
    features: [
      "Daily Fresh Cooking",
      "Home-style Authentic Taste",
      "Timely Delivery Guaranteed",
      "Quality Ingredients",
      "Hygienic Kitchen",
      "Menu Changes Daily",
      "Trial Available (3 days)",
    ],
    hygieneCertificates: ["Food Safety Certificate", "Kitchen Hygiene Certified"],
    trialAvailable: true,
    advanceOrder: "Order by 10 PM for next day delivery",
    cancellationPolicy: "Cancel before 10 PM for next day, no charge. Monthly package 7 days notice.",
    paymentOptions: ["Cash on Delivery", "bKash", "Nagad", "Monthly Bill"],
    rating: 4.7,
    totalReviews: 143,
    activeSubscribers: 210,
    verified: true,
    contact: {
      phone: "+880 1712-345678",
      email: "ghorerranna@example.com",
      whatsapp: "+880 1712-345678",
    },
    operatingDays: "Saturday to Thursday (Closed on Friday)",
    establishedSince: 2015,
    reviewHighlights: [
      "Tastes just like home cooking",
      "Very punctual delivery",
      "Clean and hygienic",
      "Reasonable price",
      "Fresh ingredients daily",
    ],
    reviews: [
      {
        id: "r1",
        userName: "Rakib Hassan",
        rating: 5,
        date: "2025-01-05T10:30:00Z",
        comment: "Been using this service for 6 months now. The taste is exactly like home-cooked food. My mother is impressed! The dal and vegetables are always fresh. Delivery is always on time, never had any issues. Highly recommend for bachelors missing home food.",
        helpfulCount: 24,
        orderType: "Monthly Lunch Package",
        images: ["https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?w=400"],
      },
      {
        id: "r2",
        userName: "Nishat Tasnim",
        rating: 5,
        date: "2025-01-03T14:20:00Z",
        comment: "Perfect for office lunch! We order for our team of 15 people. The portions are generous and everyone loves the taste. Best part is they change the menu daily so we don't get bored. Very hygienic packaging too.",
        helpfulCount: 18,
        orderType: "Daily Lunch",
      },
      {
        id: "r3",
        userName: "Abdul Karim",
        rating: 4,
        date: "2024-12-28T16:45:00Z",
        comment: "Good quality food at reasonable price. Sometimes the rice quantity could be more, but overall satisfied. Fish curry is always delicious. Delivery time is consistent which I appreciate.",
        helpfulCount: 12,
        orderType: "Lunch & Dinner Package",
      },
      {
        id: "r4",
        userName: "Fatima Akter",
        rating: 5,
        date: "2024-12-25T09:15:00Z",
        comment: "As a working mother, this service has been a lifesaver! The food quality is excellent and my kids love it. Mrs. Nasima's cooking skills are amazing. The chicken curry and polao are restaurant quality!",
        helpfulCount: 31,
        orderType: "Monthly Lunch & Dinner",
        images: [
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
          "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?w=400",
        ],
      },
      {
        id: "r5",
        userName: "Mehedi Hasan",
        rating: 4,
        date: "2024-12-20T11:30:00Z",
        comment: "Very good home-style food. I've been a subscriber for 3 months. Only issue is sometimes delivery can be 10-15 mins late during rain, but food is always hot and fresh. Price is very reasonable compared to restaurants.",
        helpfulCount: 9,
        orderType: "Daily Lunch",
      },
      {
        id: "r6",
        userName: "Sadia Rahman",
        rating: 5,
        date: "2024-12-15T13:00:00Z",
        comment: "Excellent service! I ordered the trial for 3 days and immediately subscribed for the monthly package. The beef bhuna and fish preparations are outstanding. Packaging is clean and eco-friendly. Customer service is also very responsive.",
        helpfulCount: 15,
        orderType: "Monthly Lunch Package",
      },
    ],
  },
  {
    id: "2",
    businessName: "Corporate Meals BD",
    description: "Professional catering service specializing in corporate offices and institutions. We deliver bulk meals for companies with 20+ employees. Our commercial kitchen is equipped with modern facilities ensuring quality and hygiene. We provide customized meal plans based on your office requirements. Currently serving 15+ corporate clients in Rajshahi.",
    ownerName: "Md. Rafiqul Islam",
    established: 2018,
    hasRestaurant: true,
    restaurantAddress: "Shop #12, Kazla Gate, Rajshahi",
    serviceType: "Restaurant-Based",
    cuisineStyle: ["Bengali", "Indian", "Chinese", "Multi-cuisine"],
    specialties: ["Corporate Lunch", "Office Catering", "Bulk Orders"],
    mealTypes: ["Breakfast", "Lunch", "Dinner"],
    menuRotation: "Weekly",
    sampleMenus: [
      {
        day: "Week 1",
        breakfast: ["Paratha", "Egg Omelet", "Tea"],
        lunch: ["Rice/Polao", "Chicken Curry", "Beef Bhuna", "Vegetable", "Dal", "Salad"],
        dinner: ["Rice", "Fish Curry", "Chicken Roast", "Dal", "Vegetable"],
      },
      {
        day: "Week 2",
        breakfast: ["Puri", "Halwa", "Tea"],
        lunch: ["Biryani/Polao", "Mutton Kasha", "Chicken Curry", "Raita", "Salad"],
        dinner: ["Fried Rice", "Chili Chicken", "Vegetable Manchurian", "Soup"],
      },
    ],
    pricing: {
      breakfast: 60,
      lunch: 120,
      dinner: 110,
      monthlyPackage: {
        lunch: 3200,
        lunchDinner: 6300,
        fullDay: 9000,
      },
    },
    deliveryAreas: ["Kazla", "Court Area", "Shaheb Bazar", "Talaimari", "GPO", "Rani Bazar"],
    deliveryTiming: {
      breakfast: "8:30 AM - 9:30 AM",
      lunch: "12:00 PM - 1:00 PM",
      dinner: "7:00 PM - 8:00 PM",
    },
    targetCustomers: ["Corporate Offices", "Banks", "NGOs", "Institutions", "Factories"],
    minimumOrder: 10,
    packaging: "Multi-compartment food boxes for office delivery",
    location: {
      address: "Shop #12, Kazla Gate",
      area: "Kazla",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3652,
        lng: 88.5987,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    ],
    features: [
      "Commercial Kitchen Setup",
      "ISO Certified Kitchen",
      "Bulk Order Specialist",
      "Customized Menu Options",
      "Dedicated Delivery Team",
      "Corporate Billing Available",
      "Flexible Meal Plans",
    ],
    hygieneCertificates: ["ISO 22000 Certified", "Food Safety License", "Trade License"],
    trialAvailable: true,
    advanceOrder: "1 day advance for corporate orders",
    cancellationPolicy: "24 hours notice required for cancellation",
    paymentOptions: ["Monthly Invoice", "Bank Transfer", "bKash", "Cash"],
    rating: 4.8,
    totalReviews: 89,
    activeSubscribers: 450,
    verified: true,
    contact: {
      phone: "+880 1812-567890",
      email: "corporatemeals@example.com",
      whatsapp: "+880 1812-567890",
    },
    operatingDays: "All 7 days (Different menu on Friday)",
    establishedSince: 2018,
    reviewHighlights: [
      "Professional service",
      "Never late on delivery",
      "Good variety in menu",
      "Clean and packaged well",
      "Best for office catering",
    ],
    reviews: [
      {
        id: "r7",
        userName: "Ashraf Ali",
        rating: 5,
        date: "2025-01-04T12:00:00Z",
        comment: "We've been using Corporate Meals BD for our office of 25 employees for over a year. Excellent professional service! The food variety is great - they rotate between Bengali, Chinese, and Indian cuisines. Never had a single late delivery. Highly recommend for corporate offices.",
        helpfulCount: 28,
        orderType: "Corporate Monthly Package",
      },
      {
        id: "r8",
        userName: "Tahmina Sultana",
        rating: 5,
        date: "2025-01-01T15:30:00Z",
        comment: "Best corporate catering in Rajshahi! The packaging is excellent with separate compartments for rice, curry, and vegetables. The biryani on Fridays is always a treat. Our entire team looks forward to lunch now!",
        helpfulCount: 22,
        orderType: "Office Lunch Package",
        images: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400"],
      },
      {
        id: "r9",
        userName: "Kamal Hossain",
        rating: 4,
        date: "2024-12-27T10:45:00Z",
        comment: "Good quality food and reliable service. We order for 30+ people daily. Only suggestion would be to add more vegetarian options. But overall very satisfied with taste and presentation.",
        helpfulCount: 11,
        orderType: "Bulk Daily Orders",
      },
      {
        id: "r10",
        userName: "Rima Akter",
        rating: 5,
        date: "2024-12-22T14:20:00Z",
        comment: "Professional and hygienic! As an HR manager, I'm very impressed with their invoicing system and corporate billing. The food quality is consistent and our employees are happy. The customer service is top-notch.",
        helpfulCount: 19,
        orderType: "Corporate Package",
      },
    ],
  },
  {
    id: "3",
    businessName: "Student Tiffin Service",
    description: "Affordable and nutritious meal service specifically designed for students and young professionals. We understand student budgets and provide healthy, filling meals at economical prices. Our menu includes both Bengali and fast food options. Special student packages available. Delivery to RU campus, hostels, and residential areas.",
    ownerName: "Abdul Karim",
    established: 2019,
    hasRestaurant: false,
    serviceType: "Cloud Kitchen",
    cuisineStyle: ["Bengali", "Fast Food", "Chinese"],
    specialties: ["Student Meals", "Budget Tiffin", "Hostel Delivery"],
    mealTypes: ["Lunch", "Dinner"],
    menuRotation: "Daily",
    sampleMenus: [
      {
        day: "Regular Day",
        lunch: ["Rice", "Chicken/Fish Curry", "Dal", "Vegetable", "Egg (optional +20tk)"],
        dinner: ["Rice", "Beef/Chicken Curry", "Dal", "Bhaji"],
      },
      {
        day: "Special Day (Tue/Thu)",
        lunch: ["Polao/Khichuri", "Meat Curry", "Borhani"],
        dinner: ["Fried Rice/Noodles", "Chicken Item", "Salad"],
      },
    ],
    pricing: {
      breakfast: 0,
      lunch: 70,
      dinner: 65,
      monthlyPackage: {
        lunch: 1900,
        lunchDinner: 3600,
        fullDay: 0,
      },
    },
    deliveryAreas: ["RU Campus", "Binodpur", "Shaheb Bazar", "Talaimari", "Uposhohor"],
    deliveryTiming: {
      lunch: "1:00 PM - 2:00 PM",
      dinner: "8:00 PM - 9:00 PM",
    },
    targetCustomers: ["University Students", "Hostel Residents", "Young Professionals", "Bachelors"],
    minimumOrder: 1,
    packaging: "Eco-friendly disposable boxes",
    location: {
      address: "Binodpur Bazar Road",
      area: "Binodpur",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3641,
        lng: 88.6206,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      "https://images.unsplash.com/photo-1562059390-a761a084768e?w=800",
    ],
    features: [
      "Budget-Friendly Pricing",
      "Student ID Discount (5%)",
      "Hostel Delivery Available",
      "Flexible Payment Options",
      "Large Portions",
      "Add-ons Available",
      "Weekend Special Menu",
    ],
    hygieneCertificates: ["Food License", "Health Certificate"],
    trialAvailable: true,
    advanceOrder: "Same day order till 11 AM for lunch, 5 PM for dinner",
    cancellationPolicy: "2 hours before delivery time, no questions asked",
    paymentOptions: ["Cash on Delivery", "bKash", "Nagad", "Weekly Payment"],
    rating: 4.5,
    totalReviews: 178,
    activeSubscribers: 320,
    verified: true,
    contact: {
      phone: "+880 1912-678901",
      email: "studenttiffin@example.com",
      whatsapp: "+880 1912-678901",
    },
    operatingDays: "All 7 days",
    establishedSince: 2019,
    reviewHighlights: [
      "Very affordable for students",
      "Good quantity",
      "Flexible timing",
      "Understanding service",
      "Quick delivery",
    ],
    reviews: [
      {
        id: "r11",
        userName: "Arif Rahman",
        rating: 5,
        date: "2025-01-06T09:00:00Z",
        comment: "Perfect for students! I'm a final year student at RU and this has been a blessing. Only 70tk for lunch with good quantity. The special day menu with polao and khichuri is amazing. Delivery to hostel is always on time. Highly recommended for students!",
        helpfulCount: 42,
        orderType: "Student Monthly Package",
      },
      {
        id: "r12",
        userName: "Nusrat Jahan",
        rating: 4,
        date: "2025-01-02T13:15:00Z",
        comment: "Great budget-friendly option! The portions are generous and food is tasty. Sometimes the rice can be a bit dry but overall excellent value for money. The 5% student discount with ID is a nice touch!",
        helpfulCount: 26,
        orderType: "Daily Lunch",
        images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"],
      },
      {
        id: "r13",
        userName: "Sajid Hossain",
        rating: 5,
        date: "2024-12-29T16:00:00Z",
        comment: "Been ordering for 8 months now. Consistent quality and very affordable. The chicken curry is always delicious and they give good portions. Customer service is very understanding - they let me pause my subscription during exam weeks!",
        helpfulCount: 35,
        orderType: "Lunch & Dinner Package",
      },
      {
        id: "r14",
        userName: "Maliha Tasnim",
        rating: 4,
        date: "2024-12-24T11:30:00Z",
        comment: "As a working professional on a budget, this service is perfect. The food is simple but tasty. Delivery timing is flexible which helps with my work schedule. Would give 5 stars if they had breakfast option too!",
        helpfulCount: 18,
        orderType: "Monthly Lunch",
      },
      {
        id: "r15",
        userName: "Zahid Islam",
        rating: 5,
        date: "2024-12-18T14:45:00Z",
        comment: "Excellent service for the price! I recommended it to 5 of my hostel mates and we all subscribed. The weekend special menu with fried rice and Chinese items is a hit. Very student-friendly pricing and service.",
        helpfulCount: 29,
        orderType: "Student Package",
      },
    ],
  },
  {
    id: "4",
    businessName: "Spice Route Kitchen",
    description: "Premium meal delivery service with restaurant-quality food. We operate both a dine-in restaurant and catering service. Our experienced chefs prepare multi-cuisine meals with focus on taste and presentation. Ideal for professionals and families who want restaurant-quality meals at home or office. We also provide customized diet plans.",
    ownerName: "Chef Tanvir Ahmed",
    established: 2016,
    hasRestaurant: true,
    restaurantAddress: "Modern Plaza, Motihar, Rajshahi",
    serviceType: "Restaurant-Based",
    cuisineStyle: ["Indian", "Chinese", "Thai", "Continental", "Bengali"],
    specialties: ["Premium Meals", "Diet Plans", "Customized Menus"],
    mealTypes: ["Breakfast", "Lunch", "Dinner"],
    menuRotation: "Weekly",
    sampleMenus: [
      {
        day: "Premium Menu",
        breakfast: ["Continental Breakfast", "Eggs your way", "Toast", "Juice", "Coffee"],
        lunch: ["Butter Naan", "Chicken Tikka Masala", "Paneer Curry", "Fried Rice", "Raita", "Dessert"],
        dinner: ["Thai Fried Rice", "Green Curry Chicken", "Spring Rolls", "Soup", "Salad"],
      },
      {
        day: "Bengali Special",
        lunch: ["Kacchi Biryani", "Borhani", "Firni"],
        dinner: ["Morog Polao", "Beef Rezala", "Salad", "Mishti"],
      },
    ],
    pricing: {
      breakfast: 150,
      lunch: 180,
      dinner: 170,
      monthlyPackage: {
        lunch: 4800,
        lunchDinner: 9500,
        fullDay: 13500,
      },
    },
    deliveryAreas: ["Motihar", "Shaheb Bazar", "Kazla", "Uposhohor", "Luxmipur", "Padma Residential"],
    deliveryTiming: {
      breakfast: "8:00 AM - 9:00 AM",
      lunch: "12:30 PM - 1:30 PM",
      dinner: "7:30 PM - 8:30 PM",
    },
    targetCustomers: ["Working Professionals", "Families", "Health Conscious", "Premium Clients"],
    minimumOrder: 1,
    packaging: "Premium food-safe containers, microwave-friendly",
    location: {
      address: "Modern Plaza, Shop #5-6, Motihar",
      area: "Motihar",
      city: "Rajshahi",
      division: "Rajshahi",
      coordinates: {
        lat: 24.3598,
        lng: 88.5876,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    features: [
      "Restaurant Quality Food",
      "Chef-Prepared Meals",
      "Customized Diet Plans",
      "Multi-Cuisine Options",
      "Premium Ingredients",
      "Nutrition Information Provided",
      "Also Available for Dine-in",
    ],
    hygieneCertificates: ["ISO 22000", "HACCP Certified", "Restaurant License", "Health Permit"],
    trialAvailable: true,
    advanceOrder: "Order before 8 PM for next day",
    cancellationPolicy: "12 hours notice required, full refund for monthly subscribers",
    paymentOptions: ["Cash", "Card Payment", "bKash", "Nagad", "Bank Transfer", "Monthly Billing"],
    rating: 4.9,
    totalReviews: 94,
    activeSubscribers: 180,
    verified: true,
    contact: {
      phone: "+880 1712-789012",
      email: "spiceroute@example.com",
      whatsapp: "+880 1712-789012",
    },
    operatingDays: "All 7 days",
    establishedSince: 2016,
    reviewHighlights: [
      "Restaurant quality at home",
      "Excellent taste and presentation",
      "Worth the premium price",
      "Very professional service",
      "Great variety",
    ],
    reviews: [
      {
        id: "r16",
        userName: "Dr. Faisal Ahmed",
        rating: 5,
        date: "2025-01-07T10:00:00Z",
        comment: "Outstanding quality! As a busy doctor, I don't have time to cook. Spice Route has been a game-changer. The butter chicken and Thai curry are restaurant-level quality. Presentation is beautiful and the portion sizes are perfect. Worth every taka!",
        helpfulCount: 38,
        orderType: "Premium Monthly Package",
        images: [
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
        ],
      },
      {
        id: "r17",
        userName: "Lubna Chowdhury",
        rating: 5,
        date: "2025-01-03T15:00:00Z",
        comment: "Best meal delivery service in Rajshahi! My family has been subscribing for 6 months. Chef Tanvir's expertise really shows. The multi-cuisine variety is amazing - we get Indian on Monday, Thai on Tuesday, Continental on Wednesday. Kids absolutely love it!",
        helpfulCount: 31,
        orderType: "Family Package",
      },
      {
        id: "r18",
        userName: "Imran Hossain",
        rating: 4,
        date: "2024-12-30T12:30:00Z",
        comment: "Premium quality food with excellent presentation. The customized diet plan option is great - I'm on a low-carb diet and they've been very accommodating. Slightly expensive but totally worth it for the quality. The microwave-friendly packaging is convenient.",
        helpfulCount: 24,
        orderType: "Custom Diet Plan",
      },
      {
        id: "r19",
        userName: "Sabiha Rahman",
        rating: 5,
        date: "2024-12-26T14:00:00Z",
        comment: "Restaurant quality delivered at home! We used to order from restaurants daily which was expensive and inconsistent. Spice Route provides the same quality but more affordably with a monthly package. The nutrition information they provide is very helpful. Highly recommended!",
        helpfulCount: 27,
        orderType: "Full Day Package",
        images: ["https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400"],
      },
      {
        id: "r20",
        userName: "Ashik Mahmud",
        rating: 5,
        date: "2024-12-20T11:00:00Z",
        comment: "Top-notch service! Been a subscriber for 4 months. The variety in menu keeps things interesting - never bored with the same food. The kacchi biryani and morog polao are exceptional. Also available for dine-in at their restaurant. Five stars all the way!",
        helpfulCount: 33,
        orderType: "Lunch & Dinner Package",
      },
    ],
  },
];

// Function to get caterer by ID
export function getCatererById(id: string): Caterer | undefined {
  return mockCaterers.find((caterer) => caterer.id === id);
}
