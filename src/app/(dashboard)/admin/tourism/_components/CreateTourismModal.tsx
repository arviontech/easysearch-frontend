"use client";

import React, { useState } from "react";
import { X, Upload, Plus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateTourismMutation, useUpdateTourismMutation } from "@/lib/redux/features/tourism/tourismApi";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import Image from "next/image";

interface TourismData {
    id: string;
    title: string;
    description?: string;
    tourismType: string;
    images?: string[];
    entryFee?: number;
    openingHours?: string;
    contactNumber?: string;
    address: string;
    city: string;
    state?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
}

interface CreateTourismModalProps {
    isOpen: boolean;
    onClose: () => void;
    editTourism?: TourismData | null;
}

const tourismTypes = [
    "HISTORICAL", "NATURAL", "ADVENTURE", "CULTURAL",
    "RELIGIOUS", "ENTERTAINMENT", "BEACH", "MOUNTAIN", "PARK", "MUSEUM"
];

export default function CreateTourismModal({ isOpen, onClose, editTourism }: CreateTourismModalProps) {
    const dispatch = useDispatch();
    const [createTourism, { isLoading: isCreating }] = useCreateTourismMutation();
    const [updateTourism, { isLoading: isUpdating }] = useUpdateTourismMutation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tourismType, setTourismType] = useState("NATURAL");
    const [entryFee, setEntryFee] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const isLoading = isCreating || isUpdating;

    React.useEffect(() => {
        if (editTourism) {
            setTitle(editTourism.title);
            setDescription(editTourism.description || "");
            setTourismType(editTourism.tourismType);
            setEntryFee(editTourism.entryFee?.toString() || "");
            setOpeningHours(editTourism.openingHours || "");
            setContactNumber(editTourism.contactNumber || "");
            setAddress(editTourism.address);
            setCity(editTourism.city);
            setState(editTourism.state || "");
            setCountry(editTourism.country || "");
            setLatitude(editTourism.latitude?.toString() || "");
            setLongitude(editTourism.longitude?.toString() || "");
            setImagePreviews(editTourism.images || []);
            setImageFiles([]);
        } else {
            setTitle("");
            setDescription("");
            setTourismType("NATURAL");
            setEntryFee("");
            setOpeningHours("");
            setContactNumber("");
            setAddress("");
            setCity("");
            setState("");
            setCountry("");
            setLatitude("");
            setLongitude("");
            setImagePreviews([]);
            setImageFiles([]);
        }
    }, [editTourism, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 10) {
            dispatch(addNotification({ message: "Maximum 10 images allowed", type: "error" }));
            return;
        }

        setImageFiles(files);
        const previews = files.map(file => {
            const reader = new FileReader();
            return new Promise<string>((resolve) => {
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews).then(setImagePreviews);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !address || !city || !tourismType) {
            dispatch(addNotification({ message: "Please fill all required fields", type: "error" }));
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tourismType", tourismType);
        if (entryFee) formData.append("entryFee", entryFee);
        if (openingHours) formData.append("openingHours", openingHours);
        if (contactNumber) formData.append("contactNumber", contactNumber);
        formData.append("address", address);
        formData.append("city", city);
        if (state) formData.append("state", state);
        if (country) formData.append("country", country);
        if (latitude) formData.append("latitude", latitude);
        if (longitude) formData.append("longitude", longitude);

        imageFiles.forEach(file => {
            formData.append("images", file);
        });

        try {
            if (editTourism) {
                await updateTourism({ id: editTourism.id, data: formData }).unwrap();
                dispatch(addNotification({ message: "Tourism place updated successfully", type: "success" }));
            } else {
                await createTourism(formData).unwrap();
                dispatch(addNotification({ message: "Tourism place created successfully", type: "success" }));
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-md w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(255,255,255,0.5)] border border-white"
                        >
                            <div className="sticky top-0 z-10 px-6 py-6 border-b border-cyan-100 flex items-center justify-between bg-gradient-to-r from-cyan-50/50 to-blue-50/50 backdrop-blur-md">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                        {editTourism ? "Edit Tourism Place" : "Create New Tourism Place"}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {editTourism ? "Update tourism place details" : "Add a new tourism destination"}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/50 rounded-xl transition-colors text-gray-500 hover:text-gray-700 active:scale-95"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="block text-sm font-bold text-gray-700 ml-1">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. Grand Canyon National Park"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="tourismType" className="block text-sm font-bold text-gray-700 ml-1">
                                            Type *
                                        </label>
                                        <select
                                            id="tourismType"
                                            value={tourismType}
                                            onChange={(e) => setTourismType(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 font-medium"
                                        >
                                            {tourismTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="entryFee" className="block text-sm font-bold text-gray-700 ml-1">
                                            Entry Fee ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="entryFee"
                                            value={entryFee}
                                            onChange={(e) => setEntryFee(e.target.value)}
                                            placeholder="e.g. 35"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="openingHours" className="block text-sm font-bold text-gray-700 ml-1">
                                            Opening Hours
                                        </label>
                                        <input
                                            type="text"
                                            id="openingHours"
                                            value={openingHours}
                                            onChange={(e) => setOpeningHours(e.target.value)}
                                            placeholder="e.g. 8:00 AM - 6:00 PM"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="contactNumber" className="block text-sm font-bold text-gray-700 ml-1">
                                            Contact Number
                                        </label>
                                        <input
                                            type="text"
                                            id="contactNumber"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            placeholder="e.g. +1-928-638-7888"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="block text-sm font-bold text-gray-700 ml-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter description..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="address" className="block text-sm font-bold text-gray-700 ml-1">
                                        Address *
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="e.g. South Rim Visitor Center"
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                    />
                                </div>

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
                                            placeholder="e.g. Grand Canyon Village"
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
                                            placeholder="e.g. Arizona"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="country" className="block text-sm font-bold text-gray-700 ml-1">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            id="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            placeholder="e.g. USA"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="latitude" className="block text-sm font-bold text-gray-700 ml-1">
                                            Latitude
                                        </label>
                                        <input
                                            type="number"
                                            step="any"
                                            id="latitude"
                                            value={latitude}
                                            onChange={(e) => setLatitude(e.target.value)}
                                            placeholder="e.g. 36.0544"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="longitude" className="block text-sm font-bold text-gray-700 ml-1">
                                            Longitude
                                        </label>
                                        <input
                                            type="number"
                                            step="any"
                                            id="longitude"
                                            value={longitude}
                                            onChange={(e) => setLongitude(e.target.value)}
                                            placeholder="e.g. -112.1401"
                                            className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 ml-1">
                                        Images (Max 10)
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="tourismImages"
                                        />
                                        <label
                                            htmlFor="tourismImages"
                                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-3xl cursor-pointer transition-all overflow-hidden relative group-hover:border-[#008ca1] border-cyan-100 bg-gray-50/50 hover:bg-cyan-50/30"
                                        >
                                            {imagePreviews.length > 0 ? (
                                                <div className="grid grid-cols-5 gap-2 p-4 w-full h-full overflow-y-auto">
                                                    {imagePreviews.map((preview, idx) => (
                                                        <div key={idx} className="relative w-full h-20">
                                                            <Image src={preview} alt={`Preview ${idx + 1}`} fill className="object-cover rounded-lg" />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-4 px-2">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-cyan-200 transition-all">
                                                        <Plus className="w-5 h-5 text-[#008ca1]" />
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-700">Click to upload images</p>
                                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB each (Max 10)</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>

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
                                                <span>{editTourism ? "Updating..." : "Creating..."}</span>
                                            </>
                                        ) : (
                                            <>
                                                {editTourism ? <X className="w-5 h-5 rotate-45" /> : <Plus className="w-5 h-5" />}
                                                <span>{editTourism ? "Update Tourism" : "Create Tourism"}</span>
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
