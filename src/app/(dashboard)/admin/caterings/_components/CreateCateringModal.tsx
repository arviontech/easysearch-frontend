"use client";

import React, { useState } from "react";
import { X, Upload, Plus, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateCateringMutation, useUpdateCateringMutation } from "@/lib/redux/features/catering/cateringApi";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import Image from "next/image";

interface CateringData {
    id: string;
    name: string;
    profilePhoto?: string;
    businessRegistrationNumber: string;
    cuisineTypes?: string[];
    minimumOrder: number;
    deliveryAvailable: boolean;
    deliveryRadius?: number;
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
}

interface CreateCateringModalProps {
    isOpen: boolean;
    onClose: () => void;
    editCatering?: CateringData | null;
}

export default function CreateCateringModal({ isOpen, onClose, editCatering }: CreateCateringModalProps) {
    const dispatch = useDispatch();
    const [createCatering, { isLoading: isCreating }] = useCreateCateringMutation();
    const [updateCatering, { isLoading: isUpdating }] = useUpdateCateringMutation();

    const [name, setName] = useState("");
    const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState("");
    const [cuisineTypes, setCuisineTypes] = useState("");
    const [minimumOrder, setMinimumOrder] = useState("");
    const [deliveryAvailable, setDeliveryAvailable] = useState(false);
    const [deliveryRadius, setDeliveryRadius] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const isLoading = isCreating || isUpdating;

    React.useEffect(() => {
        if (editCatering) {
            setName(editCatering.name);
            setBusinessRegistrationNumber(editCatering.businessRegistrationNumber);
            setCuisineTypes(editCatering.cuisineTypes?.join(", ") || "");
            setMinimumOrder(editCatering.minimumOrder.toString());
            setDeliveryAvailable(editCatering.deliveryAvailable);
            setDeliveryRadius(editCatering.deliveryRadius?.toString() || "");
            setAddress(editCatering.address);
            setCity(editCatering.city);
            setState(editCatering.state || "");
            setZipCode(editCatering.zipCode || "");
            setImagePreview(editCatering.profilePhoto || null);
            setImage(null);
        } else {
            setName("");
            setBusinessRegistrationNumber("");
            setCuisineTypes("");
            setMinimumOrder("");
            setDeliveryAvailable(false);
            setDeliveryRadius("");
            setAddress("");
            setCity("");
            setState("");
            setZipCode("");
            setImagePreview(null);
            setImage(null);
        }
    }, [editCatering, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !businessRegistrationNumber || !address || !city) {
            dispatch(addNotification({ message: "Please fill all required fields", type: "error" }));
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("businessRegistrationNumber", businessRegistrationNumber);
        formData.append("cuisineTypes", cuisineTypes);
        formData.append("minimumOrder", minimumOrder);
        formData.append("deliveryAvailable", deliveryAvailable.toString());
        if (deliveryRadius) formData.append("deliveryRadius", deliveryRadius);
        formData.append("address", address);
        formData.append("city", city);
        if (state) formData.append("state", state);
        if (zipCode) formData.append("zipCode", zipCode);
        if (image) {
            formData.append("image", image);
        }

        try {
            if (editCatering) {
                await updateCatering({ id: editCatering.id, data: formData }).unwrap();
                dispatch(addNotification({ message: "Catering service updated successfully", type: "success" }));
            } else {
                await createCatering(formData).unwrap();
                dispatch(addNotification({ message: "Catering service created successfully", type: "success" }));
            }
            onClose();
        } catch (error: any) {
            dispatch(addNotification({
                message: error?.data?.message || "Something went wrong",
                type: "error"
            }));
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-md w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(255,255,255,0.5)] border border-white"
                        >
                            {/* Header */}
                            <div className="sticky top-0 z-10 px-6 py-6 border-b border-cyan-100 flex items-center justify-between bg-gradient-to-r from-cyan-50/50 to-blue-50/50 backdrop-blur-md">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                        {editCatering ? "Edit Catering Service" : "Create New Catering Service"}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {editCatering ? "Update catering service details" : "Add a new catering service provider"}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/50 rounded-xl transition-colors text-gray-500 hover:text-gray-700 active:scale-95"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {/* Two column layout */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Business Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 ml-1">
                                            Business Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Delicious Catering Co."
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>

                                    {/* Registration Number */}
                                    <div className="space-y-2">
                                        <label htmlFor="regNumber" className="block text-sm font-bold text-gray-700 ml-1">
                                            Registration Number *
                                        </label>
                                        <input
                                            type="text"
                                            id="regNumber"
                                            value={businessRegistrationNumber}
                                            onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
                                            placeholder="e.g. CAT-12345"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>

                                    {/* Cuisine Types */}
                                    <div className="space-y-2">
                                        <label htmlFor="cuisineTypes" className="block text-sm font-bold text-gray-700 ml-1">
                                            Cuisine Types
                                        </label>
                                        <input
                                            type="text"
                                            id="cuisineTypes"
                                            value={cuisineTypes}
                                            onChange={(e) => setCuisineTypes(e.target.value)}
                                            placeholder="e.g. Italian, Chinese, Indian"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>

                                    {/* Minimum Order */}
                                    <div className="space-y-2">
                                        <label htmlFor="minimumOrder" className="block text-sm font-bold text-gray-700 ml-1">
                                            Minimum Order ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="minimumOrder"
                                            value={minimumOrder}
                                            onChange={(e) => setMinimumOrder(e.target.value)}
                                            placeholder="e.g. 50"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>

                                    {/* Delivery Available */}
                                    <div className="space-y-2 flex items-end">
                                        <label className="flex items-center gap-3 px-4 py-3 bg-cyan-50/50 border border-cyan-100 rounded-2xl cursor-pointer hover:bg-cyan-50 transition-all">
                                            <input
                                                type="checkbox"
                                                checked={deliveryAvailable}
                                                onChange={(e) => setDeliveryAvailable(e.target.checked)}
                                                className="w-5 h-5 text-[#008ca1] rounded focus:ring-2 focus:ring-[#008ca1]"
                                            />
                                            <span className="text-sm font-bold text-gray-700">Delivery Available</span>
                                        </label>
                                    </div>

                                    {/* Delivery Radius */}
                                    <div className="space-y-2">
                                        <label htmlFor="deliveryRadius" className="block text-sm font-bold text-gray-700 ml-1">
                                            Delivery Radius (km)
                                        </label>
                                        <input
                                            type="number"
                                            id="deliveryRadius"
                                            value={deliveryRadius}
                                            onChange={(e) => setDeliveryRadius(e.target.value)}
                                            placeholder="e.g. 10"
                                            disabled={!deliveryAvailable}
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Address (full width) */}
                                <div className="space-y-2">
                                    <label htmlFor="address" className="block text-sm font-bold text-gray-700 ml-1">
                                        Address *
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="e.g. 123 Main Street"
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                    />
                                </div>

                                {/* City, State, Zip */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="city" className="block text-sm font-bold text-gray-700 ml-1">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="e.g. New York"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="state" className="block text-sm font-bold text-gray-700 ml-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            placeholder="e.g. NY"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="zipCode" className="block text-sm font-bold text-gray-700 ml-1">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            placeholder="e.g. 10001"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 ml-1">
                                        Profile Photo
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="cateringImage"
                                        />
                                        <label
                                            htmlFor="cateringImage"
                                            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-3xl cursor-pointer transition-all overflow-hidden relative group-hover:border-[#008ca1] ${imagePreview ? "border-[#008ca1] bg-cyan-50/10" : "border-cyan-100 bg-gray-50/50 hover:bg-cyan-50/30"
                                                }`}
                                        >
                                            {imagePreview ? (
                                                <>
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover group-hover:opacity-75 transition-opacity"
                                                    />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                                        <Upload className="w-8 h-8 text-white mb-2" />
                                                        <span className="text-white font-bold text-sm">Change Image</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-4 px-2">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-cyan-200 transition-all">
                                                        <Plus className="w-5 h-5 text-[#008ca1]" />
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-700">Click to upload image</p>
                                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {/* Footer / Buttons */}
                                <div className="flex items-center gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-6 py-4 border border-cyan-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-colors active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-[2] px-6 py-4 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold shadow-lg shadow-[#008ca1]/20 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>{editCatering ? "Updating..." : "Creating..."}</span>
                                            </>
                                        ) : (
                                            <>
                                                {editCatering ? <X className="w-5 h-5 rotate-45" /> : <Plus className="w-5 h-5" />}
                                                <span>{editCatering ? "Update Catering" : "Create Catering"}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
