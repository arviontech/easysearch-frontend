Rajshahi Local Services Platform
Frontend Technical Documentation
Version: 1.0.0
 Last Updated: November 2025
 Status: Initial Release
 Document Owner: Development Team

2. System Overview
2.1 Platform Vision
Create a responsive, accessible, and performant web application that serves as the primary digital gateway to Rajshahi's local services, supporting both Bengali and English languages.
2.2 User Personas
Primary Users
Service Seekers (Students, Professionals, Tourists)


Age: 18-45
Tech-savvy, mobile-first users
Need: Quick, reliable service discovery
Service Providers (Landlords, Doctors, Caterers, Guides)


Age: 25-60
Variable tech proficiency
Need: Simple listing management
Platform Administrators


Role: Content moderation, user support
Need: Comprehensive management tools
2.3 Key Features
Multi-criteria search and filtering
Real-time availability checking
Integrated mapping and location services
Booking and inquiry management
Rating and review system
Multilingual support (Bengali/English)
Progressive Web App (PWA) capabilities




6. Page Specifications
6.1 Homepage
Layout Structure
Key Features
Hero Search Bar


Multi-category dropdown (House, Hostel, Doctor, Catering, Tourism)
Location autocomplete
Advanced filters toggle
Search button with loading state
Quick Service Categories


6 cards: House Rent, Hostel, Find Doctor, Catering, Foods, Tourism
Hover animations
Click navigates to respective section
Featured Carousels


Auto-play (5s interval)
Navigation arrows
Dot indicators
Swipe support on mobile
SEO Optimizations


Meta tags with location keywords
Structured data (LocalBusiness schema)
Semantic HTML5 elements
Image lazy loading
Performance Targets
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Time to Interactive: < 3.5s
Lighthouse Score: > 90

6.2 House Rent Listings Page
Layout Structure
Filter Specifications
Category Filter
Options: Family, Bachelor (Male), Bachelor (Female), Sublet
UI: Checkbox group
Behavior: Multi-select, OR logic
Price Range Filter
UI: Dual-range slider
Range: ৳2,000 - ৳50,000
Step: ৳1,000
Display: Real-time value update
Location/Area Filter
UI: Autocomplete dropdown
Data source: Predefined area list
Popular areas: Kazla, Shaheb Bazar, Uposhohor, Motihar
Rooms Filter
Options: 1 Room, 2 Rooms, 3 Rooms, 4+ Rooms
UI: Button group (single select)
Amenities Filter
Options: Furnished, Semi-furnished, Parking, Wi-Fi, Balcony
UI: Checkbox group
Advanced Filters (Collapsible)
Available From (date picker)
Preferred For (Students, Professionals, Families)
Floor Preference
Pet Policy
Listing Card Specifications
View Modes
Grid View (Default)


3 columns on desktop
2 columns on tablet
1 column on mobile
List View


Horizontal card layout
More detailed information visible
Map View


Split screen: 40% filters/list, 60% map
Clustered markers
Popup on marker click
Sync between list scroll and map





6.3 Hostel Rent Listings Page
Similar structure to House Rent with category-specific filters:
Hostel-Specific Filters
Gender: Male, Female
Tenant Type: Student, Job Holder
Meal Options: Included, Not Included, Optional
Room Type: Single, Shared (2-person), Shared (3-4 person)
Facilities: AC, Study Table, Locker, Laundry
Hostel Card Additional Info
Available seats
Hostel rules badge
Meal timing information
Security deposit amount

6.4 Find Doctor Page


Department Tabs
Pre-defined departments:
Cardiology, Pediatrics, Orthopedics, Dermatology, Gynecology
ENT, Neurology, General Medicine, Dental, Psychiatry
Tab behavior:
Horizontal scrollable on mobile
Active state indication
Load doctors on tab switch
Doctor Profile Card
Information Hierarchy
Profile photo (circular)
Name + qualifications (MBBS, FCPS)
Specialization
Star rating + review count
Experience years
Consultation fee
Available days/times
Languages spoken
Hospital/clinic affiliation
Interaction Elements
Book Appointment button (primary CTA)
View Full Profile link
Call button
Directions to clinic button
Doctor Detail Page
Sections
Header: Photo, name, credentials, ratings
About: Professional summary
Education & Training
Specializations & Services
Experience & Achievements
Available Slots Calendar
Consultation Fee & Payment Options
Hospital/Clinic Information with map
Patient Reviews
Related Doctors

6.5 Catering Services Page
Service Type Categories
Event Catering


Weddings, birthdays, corporate events
Minimum capacity filter
Package options
Home Delivery


Daily meal plans
Special occasion orders
Delivery area selection
Corporate Catering


Office lunch/snacks
Meeting refreshments
Contract options
Caterer Profile Features
Photo gallery of dishes
Menu browser (PDF viewer or structured list)
Cuisine types badges
Capacity range
Price per person/per item
Customization options
Sample menu download
Get quote form
Past work portfolio
Customer testimonials
Food Card Content
High-quality image
Food name (Bengali & English)
Short description
Famous locations to find it
Average price
"Where to Find" button → Opens map modal
User-contributed photos badge
Interactive Map Modal
When user clicks "Where to Find":
Modal opens with embedded map
Pins showing shops/restaurants serving that food
List view alongside map
Directions integration
Operating hours
Contact information

6.7 Tourism & Guides Page


Tourist Place Detail Page
Sections
Image Gallery (Hero carousel)
Overview
Name, location, type (Historical/Religious/Natural)
Opening hours, entry fee
Best time to visit
About & History
How to Reach (map + directions)
Nearby Attractions
Visitor Tips
Photo Gallery (user-contributed)
Reviews & Ratings
Hire a Guide CTA
Tour Guides Tab
Guide Profile Card
Profile photo
Name, age, experience
Languages spoken
Specialty areas
Rating & reviews
Hourly/daily rate
Availability calendar
Contact/Book button
Tour Packages
Package Card
Package name
Duration (Half-day, Full-day, Multi-day)
Itinerary overview
Inclusions (Transport, meals, guide, tickets)
Price per person
Group size
Book Now button
Custom Tour Planner
Form Fields
Number of people
Preferred dates
Duration
Interests (History, Nature, Food, Shopping)
Budget range
Special requirements
Contact information
Output
AI/Manual curation sends suggested itinerary
List of guides available for those dates
Estimated cost breakdown

6.8 User Account Pages
6.8.1 Login / Register Page
Layout
Split screen on desktop (left: branding, right: form)
Centered card on mobile
Login Form
Email/Phone input
Password input (with show/hide toggle)
Remember me checkbox
Forgot password link
Social login buttons (Google, Facebook)
Don't have an account? Register link
Registration Form
Full name
Email
Phone (with country code selector)
Password (strength indicator)
Confirm password
Terms & conditions checkbox
Register button
Already have an account? Login link
Password Recovery Flow
Enter email/phone
Receive OTP
Verify OTP
Set new password
Confirmation
6.8.2 User Dashboard
Navigation Tabs
My Bookings
Saved Listings
My Reviews
Profile Settings
Payment Methods (future)
Notifications
My Reviews Tab
List of reviews written by user
Edit/Delete options
Pending review reminders
Rating statistics
Profile Settings
interface UserProfile {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other';
    profilePhoto: string;
  };
  preferences: {
    language: 'en' | 'bn';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    currency: 'BDT' | 'USD';
  };
  address: {
    current: string;
    city: string;
    postalCode: string;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: Date;
  };
}


Profile Edit Form
All fields editable
Profile photo upload (with crop tool)
Email verification required for email changes
Phone verification required for phone changes
Save changes button with loading state

6.9 Admin Panel
Dashboard Overview
┌──────────────────────────────────────────────────┐
│  Admin Dashboard                                  │
├──────────────────────────────────────────────────┤
│  Statistics Cards Row                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │ 2,450   │ │  1,234  │ │  3,890  │ │  98%   ││
│  │ Users   │ │Listings │ │Bookings │ │Uptime  ││
│  └─────────┘ └─────────┘ └─────────┘ └────────┘│
├──────────────────────────────────────────────────┤
│  Charts Row                                       │
│  ┌───────────────────┐  ┌──────────────────────┐│
│  │ User Growth       │  │ Booking Trends       ││
│  │ [Line Chart]      │  │ [Bar Chart]          ││
│  └───────────────────┘  └──────────────────────┘│
├──────────────────────────────────────────────────┤
│  Recent Activities                                │
│  - New listing submitted by John Doe              │
│  - User reported issue #1234                      │
│  - Payment received for booking #5678             │
└──────────────────────────────────────────────────┘


Sidebar Navigation
Dashboard
Manage Listings
Houses
Hostels
Doctors
Caterers
Tourist Places
Food Items
User Management
Reviews & Ratings
Bookings
Reports
Content Management
Settings
Manage Listings
Table View
Columns: ID, Title, Category, Owner, Status, Created, Actions
Filters: Status (Active/Pending/Rejected), Category, Date range
Bulk actions: Approve, Reject, Delete
Search by title/ID
Export to CSV
Listing Detail/Edit View
All listing information editable
Image management (upload, reorder, delete)
Status change dropdown
Rejection reason textarea (if rejecting)
Verification badge toggle
Featured listing toggle
Save/Cancel buttons
Activity log (created, modified, status changes)
User Management
Table Columns
User ID, Name, Email, Phone, Role, Status, Join Date, Actions
User Roles
Admin (full access)
Moderator (content management)
Service Provider (manage own listings)
User (browse and book)
Actions
View profile
Edit details
Suspend/Activate account
Reset password
View activity log
Assign role
Content Management
Sections
Homepage banners (upload, order, schedule)
Featured listings selection
Popular foods management
FAQs editor
Terms & Conditions editor
Privacy Policy editor
About Us page editor
Contact information
Social media links
Banner Management
Upload image (with size validation)
Link URL
Display order
Active date range
Desktop/Mobile variants
Preview before publish

7. Component Library
7.1 Atomic Components
Button Component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  children: ReactNode;
}


// Usage
<Button variant="primary" size="md" loading={isSubmitting}>
  Submit
</Button>


States
Default
Hover (background darkens 10%)
Active (background darkens 15%)
Focus (outline ring)
Disabled (opacity 50%, cursor not-allowed)
Loading (spinner icon, disabled interaction)
Input Component
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}


Features
Label animation on focus
Error state with red border and error message
Character count (if maxLength specified)
Clear button (for search type)
Password visibility toggle (for password type)
Select Component
interface SelectProps {
  options: Array<{value: string; label: string; disabled?: boolean}>;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  error?: string;
}


Behavior
Keyboard navigation (arrow keys, enter, escape)
Search filtering if searchable
Multi-select with checkboxes if multiple
Clear all option if clearable
Virtual scrolling for large lists (>100 items)
Checkbox & Radio
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}


interface RadioGroupProps {
  options: Array<{value: string; label: string}>;
  value: string;
  onChange: (value: string) => void;
  name: string;
  direction?: 'horizontal' | 'vertical';
}


7.2 Molecular Components
SearchBar Component
interface SearchBarProps {
  categories: string[];
  onSearch: (query: string, category: string, location: string) => void;
  placeholder?: string;
  showFilters?: boolean;
}


// Implementation features
- Autocomplete suggestions
- Recent searches
- Category selector dropdown
- Location autocomplete
- Voice search button (optional)
- Advanced filters toggle
- Search on enter or button click


Card Component
interface CardProps {
  image?: string;
  badges?: Array<{text: string; variant: string}>;
  title: string;
  price?: {amount: number; period?: string};
  meta?: Array<{icon: ReactNode; text: string}>;
  features?: string[];
  actions?: Array<{label: string; onClick: () => void; variant: string}>;
  onSave?: () => void;
  onShare?: () => void;
  isSaved?: boolean;
}


Variants
Listing card (properties, hostels)
Profile card (doctors, guides)
Service card (caterers)
Food card (popular foods)
Place card (tourist places)
FilterPanel Component
interface FilterPanelProps {
  filters: FilterConfig[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onApply: () => void;
  onReset: () => void;
  collapsible?: boolean;
}


interface FilterConfig {
  id: string;
  type: 'checkbox' | 'radio' | 'range' | 'select' | 'date';
  label: string;
  options?: Array<{value: string; label: string}>;
  min?: number;
  max?: number;
  step?: number;
}


Features
Collapsible sections
Active filter badges at top
Quick reset per filter group
Results count update on change
Sticky positioning on scroll
Mobile: Bottom drawer with apply/reset
Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}


Behavior
Focus trap (tab cycles within modal)
Scroll lock on body
Smooth open/close animation
Overlay backdrop with blur effect
Close button in header
ESC key to close
Click outside to close (optional)
Carousel Component
interface CarouselProps {
  items: Array<{id: string; content: ReactNode}>;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  responsive?: Array<{breakpoint: number; settings: object}>;
}


Features
Touch/swipe support
Lazy load images
Thumbnail navigation (optional)
Keyboard navigation
Auto-play with pause on hover
Progress indicator
Fade or slide transition
7.3 Organism Components
Navigation Component
Desktop Navigation
┌─────────────────────────────────────────────────┐
│ [Logo]  House  Hostel  Doctor  Catering  More▼ │
│                          [Search] [Login] [🔔]  │
└─────────────────────────────────────────────────┘


Mobile Navigation
┌─────────────────────────────────────────────────┐
│ [☰]  [Logo]                    [Search] [User]  │
└─────────────────────────────────────────────────┘


// Hamburger menu opens drawer from left


Features
Sticky on scroll with shadow
Active link indication
Dropdown mega menu for categories
Search bar (expandable on mobile)
User menu dropdown (logged in)
Notification bell with badge
Language switcher
Mobile: Slide-out drawer menu
Footer Component
┌─────────────────────────────────────────────────┐
│  [Logo]              Quick Links    Categories   │
│                      - About        - Houses     │
│  Connecting          - Contact      - Hostels    │
│  Rajshahi            - FAQs         - Doctors    │
│                      - Terms        - Catering   │
│  [Social Icons]      - Privacy      - Tourism    │
│                                                   │
│  Download App        Newsletter                  │
│  [iOS] [Android]     [Email Input] [Subscribe]   │
│                                                   │
│  ─────────────────────────────────────────────   │
│  © 2025 Rajshahi Services. All rights reserved.  │
└─────────────────────────────────────────────────┘


ListingGrid Component
interface ListingGridProps {
  items: Listing[];
  viewMode: 'grid' | 'list' | 'map';
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  sortOptions?: SortOption[];
  currentSort?: string;
  onSortChange?: (sort: string) => void;
}


Features
Skeleton loading states
Infinite scroll or pagination
Empty state illustration
View toggle buttons
Sort dropdown
Results count
Map view synchronization
ReviewSection Component
interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {[key: number]: number};
  onSubmitReview?: (review: Review) => void;
  canReview?: boolean;
}


Layout
Rating summary card (average, total, breakdown)
Rating breakdown chart (5⭐ to 1⭐ with bars)
Review form (if canReview)
Review list with pagination
Sort options (Most recent, Highest rated, Lowest rated)
Filter by rating
Helpful votes (thumbs up)



