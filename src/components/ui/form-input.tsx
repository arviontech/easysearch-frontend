"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    icon?: LucideIcon;
    containerClassName?: string;
}

export const FormInput = ({
    name,
    label,
    icon: Icon,
    className,
    containerClassName,
    ...props
}: FormInputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];

    return (
        <div className={cn("space-y-2", containerClassName)}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon className="w-5 h-5 text-gray-400" />
                    </div>
                )}
                <input
                    id={name}
                    {...register(name)}
                    className={cn(
                        "w-full pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition",
                        Icon ? "pl-12" : "pl-4",
                        error ? "border-red-500" : "border-cyan-200",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500">
                    {error.message as string}
                </p>
            )}
        </div>
    );
};
