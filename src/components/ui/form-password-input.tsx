"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/utils";

interface FormPasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    containerClassName?: string;
    showStrength?: boolean;
}

export const FormPasswordInput = ({
    name,
    label,
    className,
    containerClassName,
    showStrength = false,
    ...props
}: FormPasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const value = watch(name);

    const getPasswordStrength = (password: string) => {
        if (!password || password.length === 0) return { strength: 0, label: "", color: "" };
        if (password.length < 6) return { strength: 1, label: "Weak", color: "bg-red-500" };
        if (password.length < 10) return { strength: 2, label: "Fair", color: "bg-yellow-500" };
        return { strength: 3, label: "Strong", color: "bg-green-500" };
    };

    const strength = getPasswordStrength(value || "");

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
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    id={name}
                    type={showPassword ? "text" : "password"}
                    {...register(name)}
                    className={cn(
                        "w-full pl-12 pr-12 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition",
                        error ? "border-red-500" : "border-cyan-200",
                        className
                    )}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                >
                    {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                    ) : (
                        <Eye className="w-5 h-5" />
                    )}
                </button>
            </div>

            {showStrength && value && (
                <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-300", strength.color)}
                                style={{
                                    width: `${(strength.strength / 3) * 100}%`,
                                }}
                            />
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                            {strength.label}
                        </span>
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-1 text-xs text-red-500">
                    {error.message as string}
                </p>
            )}
        </div>
    );
};
