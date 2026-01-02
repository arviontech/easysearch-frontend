import { Home, Building2, Stethoscope, Briefcase, UtensilsCrossed, MapPin } from "lucide-react";

export const NAV_LINKS = [
    {
        href: "/for-rent/houses",
        label: "House",
        mobileLabel: "House Rent",
        icon: Home,
    },
    {
        href: "/for-rent/hostels",
        label: "Hostel",
        mobileLabel: "Hostel Rent",
        icon: Building2,
    },
    {
        href: "/find/doctor",
        label: "Doctor",
        mobileLabel: "Find Doctor",
        icon: Stethoscope,
    },
    {
        href: "/find/jobs",
        label: "Jobs",
        mobileLabel: "Find Jobs",
        icon: Briefcase,
    },
    {
        href: "/catering",
        label: "Catering",
        mobileLabel: "Catering",
        icon: UtensilsCrossed,
    },
    {
        href: "/foods",
        label: "Foods",
        mobileLabel: "Foods",
        icon: UtensilsCrossed,
    },
    {
        href: "/tourism",
        label: "Tourism",
        mobileLabel: "Tourism & Guides",
        icon: MapPin,
    },
];
