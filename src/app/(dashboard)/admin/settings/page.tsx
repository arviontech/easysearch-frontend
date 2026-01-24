"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    useGetSettingsQuery,
    useUpdateSettingsMutation,
} from "@/lib/redux/features/settings/settingsApi";
import { toast } from "sonner";
import { Loader2, Settings, Save, Globe, Mail, DollarSign, Wrench } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
    const { data: settings, isLoading } = useGetSettingsQuery({});
    const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

    const { register, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            siteName: "",
            supportEmail: "",
            currency: "",
            maintenanceMode: false,
        },
    });

    useEffect(() => {
        if (settings) {
            reset({
                siteName: settings.siteName || "",
                supportEmail: settings.supportEmail || "",
                currency: settings.currency || "",
                maintenanceMode: settings.maintenanceMode === "true",
            });
        }
    }, [settings, reset]);

    const onSubmit = async (data: any) => {
        try {
            const formattedData = {
                ...data,
                maintenanceMode: String(data.maintenanceMode)
            }
            await updateSettings(formattedData).unwrap();
            toast.success("Settings updated successfully");
        } catch (error) {
            toast.error("Failed to update settings");
        }
    };

    if (isLoading) {
        return (
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                <div className="w-10 h-10 border-4 border-[#008ca1] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                    System <span className="text-cyan-600">Settings</span>
                </h1>
                <p className="text-gray-500 mt-1 font-medium italic">Manage detailed configuration settings for the platform</p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white shadow-[0_8px_16px_rgba(0,0,0,0.05),inset_0_4px_8px_rgba(255,255,255,0.5)]">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-600">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">General Configuration</h2>
                        <p className="text-sm text-gray-500 font-medium">Update basic site information and preferences</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Site Name */}
                        <div className="space-y-2">
                            <label htmlFor="siteName" className="block text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-cyan-600" />
                                Site Name
                            </label>
                            <input
                                id="siteName"
                                placeholder="Arvion Easy Search"
                                {...register("siteName")}
                                className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Support Email */}
                        <div className="space-y-2">
                            <label htmlFor="supportEmail" className="block text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cyan-600" />
                                Support Email
                            </label>
                            <input
                                id="supportEmail"
                                type="email"
                                placeholder="support@arvion.com"
                                {...register("supportEmail")}
                                className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Currency */}
                        <div className="space-y-2">
                            <label htmlFor="currency" className="block text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-cyan-600" />
                                Currency
                            </label>
                            <input
                                id="currency"
                                placeholder="USD"
                                {...register("currency")}
                                className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Maintenance Mode */}
                        <div className="space-y-2 md:col-span-2">
                            <div className="bg-white/50 border border-cyan-100 rounded-2xl p-4 flex items-center justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl transition-colors ${watch("maintenanceMode") ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400"}`}>
                                        <Wrench className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <label htmlFor="maintenanceMode" className="block text-sm font-bold text-gray-900">
                                            Maintenance Mode
                                        </label>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                                            Disable public access to the site temporarily
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    id="maintenanceMode"
                                    checked={watch("maintenanceMode")}
                                    onCheckedChange={(checked) => setValue("maintenanceMode", checked)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-cyan-100/50">
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="px-8 py-4 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold shadow-lg shadow-[#008ca1]/20 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2 ml-auto"
                        >
                            {isUpdating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Save className="w-5 h-5" />
                            )}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
