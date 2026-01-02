"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/utils";

interface NavLinkProps {
    href: string;
    label: string;
    icon: LucideIcon;
    mobile?: boolean;
    onClick?: () => void;
}

export const NavLink = ({ href, label, icon: Icon, mobile, onClick }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname?.startsWith(href);

    if (mobile) {
        return (
            <Link
                href={href}
                onClick={onClick}
                className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition",
                    isActive ? "bg-cyan-600 text-white" : "text-gray-700 hover:bg-gray-100"
                )}
            >
                <Icon className="w-4 h-4" />
                {label}
            </Link>
        );
    }

    return (
        <Link
            href={href}
            className={cn(
                "text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2",
                isActive
                    ? "bg-cyan-600 text-white border-2 border-cyan-700 shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)]"
                    : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
            )}
        >
            <Icon className="w-4 h-4" />
            {label}
        </Link>
    );
};
