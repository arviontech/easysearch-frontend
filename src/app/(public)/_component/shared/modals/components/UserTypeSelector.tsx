"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Users, Briefcase, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/utils";

export const UserTypeSelector = () => {
    const { watch, setValue, trigger } = useFormContext();
    const formUserType = watch("userType");
    const [localUserType, setLocalUserType] = useState<"seeker" | "provider">(formUserType || "seeker");

    console.log("Form userType:", formUserType, "Local userType:", localUserType);

    const handleUserTypeChange = (value: "seeker" | "provider") => {
        console.log("Changing userType to:", value);
        setLocalUserType(value);
        setValue("userType", value, { shouldValidate: true });
        trigger("userType");
    };

    const userType = localUserType;

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                I want to:
            </label>
            <div className="grid grid-cols-2 gap-3">
                <motion.button
                    type="button"
                    onClick={() => handleUserTypeChange("seeker")}
                    className={cn(
                        "relative p-4 rounded-xl border-2 transition-all",
                        userType === "seeker"
                            ? "border-cyan-600 bg-cyan-50"
                            : "border-cyan-200 bg-white hover:border-cyan-400"
                    )}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <Users className={cn("w-6 h-6", userType === "seeker" ? "text-cyan-600" : "text-gray-600")} />
                        <span className={cn("text-sm font-semibold", userType === "seeker" ? "text-cyan-700" : "text-gray-700")}>
                            Find Services
                        </span>
                    </div>
                    {userType === "seeker" && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                        >
                            <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                        </motion.div>
                    )}
                </motion.button>

                <motion.button
                    type="button"
                    onClick={() => handleUserTypeChange("provider")}
                    className={cn(
                        "relative p-4 rounded-xl border-2 transition-all",
                        userType === "provider"
                            ? "border-cyan-600 bg-cyan-50"
                            : "border-cyan-200 bg-white hover:border-cyan-400"
                    )}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <Briefcase className={cn("w-6 h-6", userType === "provider" ? "text-cyan-600" : "text-gray-600")} />
                        <span className={cn("text-sm font-semibold", userType === "provider" ? "text-cyan-700" : "text-gray-700")}>
                            Offer Services
                        </span>
                    </div>
                    {userType === "provider" && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                        >
                            <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                        </motion.div>
                    )}
                </motion.button>
            </div>
        </div>
    );
};
