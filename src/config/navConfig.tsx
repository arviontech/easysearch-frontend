import {
    LayoutDashboard,
    Home,
    Building2,
    Users,
    Utensils,
    Stethoscope,
    Palmtree,
    FileText,
    MessageSquare,
    Settings,
    CheckCircle,
    BarChart3,
    Tag,
    Image,
    Calendar,
    Search,
    User,
} from "lucide-react";

export interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
}

export const adminNavItems: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "House Rent", href: "/admin/properties", icon: Building2 },
    { name: "Hostels", href: "/admin/hostels", icon: Home },
    { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { name: "Catering", href: "/admin/caterings", icon: Utensils },
    { name: "Tourism", href: "/admin/tourism", icon: Palmtree },
    { name: "Foods", href: "/admin/foods", icon: Utensils },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    { name: "Approvals", href: "/admin/approvals", icon: CheckCircle },
    { name: "Banners", href: "/admin/banners", icon: Image },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export const hostNavItems: NavItem[] = [
    { name: "Dashboard", href: "/host", icon: LayoutDashboard },
    { name: "My Properties", href: "/host/house-rent", icon: Building2 },
    { name: "My Hostels", href: "/host/hostels", icon: Home },
    { name: "Bookings", href: "/host/bookings", icon: Calendar },
    { name: "Settings", href: "/host/settings", icon: Settings },
];

export const userNavItems: NavItem[] = [
    { name: "Dashboard", href: "/user", icon: LayoutDashboard },
    { name: "Search", href: "/search", icon: Search },
    { name: "My Bookings", href: "/user/bookings", icon: Calendar },
    { name: "Profile", href: "/user/profile", icon: User },
    { name: "Settings", href: "/user/settings", icon: Settings },
];

export const doctorNavItems: NavItem[] = [
    { name: "Dashboard", href: "/doctor", icon: LayoutDashboard },
    { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
    { name: "Patients", href: "/doctor/patients", icon: Users },
    { name: "Profile", href: "/doctor/profile", icon: User },
    { name: "Settings", href: "/doctor/settings", icon: Settings },
];

export const cateringNavItems: NavItem[] = [
    { name: "Dashboard", href: "/catering", icon: LayoutDashboard },
    { name: "My Services", href: "/catering/services", icon: Utensils },
    { name: "Orders", href: "/catering/orders", icon: Calendar },
    { name: "Profile", href: "/catering/profile", icon: User },
    { name: "Settings", href: "/catering/settings", icon: Settings },
];
