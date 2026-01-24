"use client";

import React, { useState } from "react";
import { X, Upload, Plus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateFoodMutation, useUpdateFoodMutation } from "@/lib/redux/features/food/foodApi";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import Image from "next/image";

interface FoodData {
    id: string;
    name: string;
    description?: string;
    category: string;
    dietaryTypes?: string[];
    images?: string[];
    price: number;
    restaurantName?: string;
    contactNumber?: string;
    address: string;
    city: string;
    state?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    isAvailable: boolean;
}

interface CreateFoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    editFood?: FoodData | null;
}

const foodCategories = [
    "APPETIZER", "MAIN_COURSE", "DESSERT", "BEVERAGE",
    "SNACK", "BREAKFAST", "LUNCH", "DINNER", "FAST_FOOD", "HEALTHY"
];

const dietaryOptions = [
    "VEGETARIAN", "VEGAN", "GLUTEN_FREE", "HALAL", "KOSHER", "NON_VEGETARIAN"
];

export default function CreateFoodModal({ isOpen, onClose, editFood }: CreateFoodModalProps) {
    const dispatch = useDispatch();
    const [createFood, { isLoading: isCreating }] = useCreateFoodMutation();
    const [updateFood, { isLoading: isUpdating }] = useUpdateFoodMutation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("MAIN_COURSE");
    const [dietaryTypes, setDietaryTypes] = useState<string[]>([]);
    const [price, setPrice] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const isLoading = isCreating || isUpdating;

    React.useEffect(() => {
        if (editFood) {
            setName(editFood.name);
            setDescription(editFood.description || "");
            setCategory(editFood.category);
            setDietaryTypes(editFood.dietaryTypes || []);
            setPrice(editFood.price.toString());
            setRestaurantName(editFood.restaurantName || "");
            setContactNumber(editFood.contactNumber || "");
            setAddress(editFood.address);
            setCity(editFood.city);
            setState(editFood.state || "");
            setCountry(editFood.country || "");
            setLatitude(editFood.latitude?.toString() || "");
            setLongitude(editFood.longitude?.toString() || "");
            setIsAvailable(editFood.isAvailable);
            setImagePreviews(editFood.images || []);
            setImageFiles([]);
        } else {
            setName("");
            setDescription("");
            setCategory("MAIN_COURSE");
            setDietaryTypes([]);
            setPrice("");
            setRestaurantName("");
            setContactNumber("");
            setAddress("");
            setCity("");
            setState("");
            setCountry("");
            setLatitude("");
            setLongitude("");
            setIsAvailable(true);
            setImagePreviews([]);
            setImageFiles([]);
        }
    }, [editFood, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 5) {
            dispatch(addNotification({ message: "Maximum 5 images allowed", type: "error" }));
            return;
        }

        setImageFiles(files);
        const previews = files.map(file => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews).then(setImagePreviews);
    };

    const toggleDietaryType = (type: string) => {
        setDietaryTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !address || !city || !category) {
            dispatch(addNotification({ message: "Please fill all required fields", type: "error" }));
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("dietaryTypes", dietaryTypes.join(", "));
        formData.append("price", price);
        if (restaurantName) formData.append("restaurantName", restaurantName);
        if (contactNumber) formData.append("contactNumber", contactNumber);
        formData.append("address", address);
        formData.append("city", city);
        if (state) formData.append("state", state);
        if (country) formData.append("country", country);
        if (latitude) formData.append("latitude", latitude);
        if (longitude) formData.append("longitude", longitude);
        formData.append("isAvailable", isAvailable.toString());

        imageFiles.forEach(file => {
            formData.append("images", file);
        });

        try {
            if (editFood) {
                await updateFood({ id: editFood.id, data: formData }).unwrap();
                dispatch(addNotification({ message: "Food item updated successfully", type: "success" }));
            } else {
                await createFood(formData).unwrap();
                dispatch(addNotification({ message: "Food item created successfully", type: "success" }));
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
                                    {editFood ? "Edit Food Item" : "Create New Food Item"}
                                </h2>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {editFood ? "Update food item details" : "Add a new food item"}
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
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 ml-1">
                                        Food Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Margherita Pizza"
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="category" className="block text-sm font-bold text-gray-700 ml-1">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 font-medium"
                                    >
                                        {foodCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="price" className="block text-sm font-bold text-gray-700 ml-1">
                                        Price ($) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="e.g. 12.99"
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="restaurantName" className="block text-sm font-bold text-gray-700 ml-1">
                                        Restaurant Name
                                    </label>
                                    <input
                                        type="text"
                                        id="restaurantName"
                                        value={restaurantName}
                                        onChange={(e) => setRestaurantName(e.target.value)}
                                        placeholder="e.g. Italian Kitchen"
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
                                        placeholder="e.g. +1-555-1234"
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2 flex items-end">
                                    <label className="flex items-center gap-3 px-4 py-3 bg-cyan-50/50 border border-cyan-100 rounded-2xl cursor-pointer hover:bg-cyan-50 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={isAvailable}
                                            onChange={(e) => setIsAvailable(e.target.checked)}
                                            className="w-5 h-5 text-[#008ca1] rounded focus:ring-2 focus:ring-[#008ca1]"
                                        />
                                        <span className="text-sm font-bold text-gray-700">Available</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 ml-1">
                                    Dietary Types
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {dietaryOptions.map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => toggleDietaryType(type)}
                                            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${dietaryTypes.includes(type)
                                                    ? "bg-[#008ca1] text-white shadow-lg shadow-[#008ca1]/20"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {type.replace(/_/g, ' ')}
                                        </button>
                                    ))}
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
                                    placeholder="e.g. 123 Food Street"
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

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 ml-1">
                                    Images (Max 5)
                                </label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="foodImages"
                                    />
                                    <label
                                        htmlFor="foodImages"
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
                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB each (Max 5)</p>
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
                                            <span>{editFood ? "Updating..." : "Creating..."}</span>
                                        </>
                                    ) : (
                                        <>
                                            {editFood ? <X className="w-5 h-5 rotate-45" /> : <Plus className="w-5 h-5" />}
                                            <span>{editFood ? "Update Food" : "Create Food"}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
