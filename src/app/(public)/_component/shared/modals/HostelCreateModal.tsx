"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Loader2, Home, MapPin, DollarSign, Bed, Users, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateHostelRentMutation } from "@/lib/redux/features/hostel-rent/hostelRentApi";
import { toast } from "sonner";
import Image from "next/image";

// Form Schema
const hostelSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    price: z.number().min(500, "Price must be at least 500"),
    roomType: z.enum(["SINGLE", "DOUBLE", "TRIPLE", "SHARED"]),
    tenantType: z.enum(["MALE", "FEMALE", "ANY"]),
    mealIncluded: z.boolean(),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    contactPhone: z.string().min(11, "Valid phone number is required"),
});

type HostelFormValues = z.infer<typeof hostelSchema>;

interface HostelCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HostelCreateModal({ isOpen, onClose }: HostelCreateModalProps) {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [createHostel, { isLoading }] = useCreateHostelRentMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<HostelFormValues>({
        resolver: zodResolver(hostelSchema),
        defaultValues: {
            mealIncluded: false,
            roomType: "SINGLE",
            tenantType: "ANY",
        },
    });

    // Cleanup previews on unmount
    useEffect(() => {
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages((prev) => [...prev, ...newFiles]);

            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        URL.revokeObjectURL(previews[index]);
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit: SubmitHandler<HostelFormValues> = async (data) => {
        try {
            const formData = new FormData();

            // Append fields
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value.toString());
            });

            // Append images
            images.forEach((image) => {
                formData.append("images", image);
            });

            await createHostel(formData).unwrap();
            toast.success("Hostel created successfully!");
            reset();
            setImages([]);
            setPreviews([]);
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to create hostel");
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Add New Hostel</h2>
                            <p className="text-sm text-gray-500">Create a new hostel listing</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Home className="w-4 h-4" /> Basic Information
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            {...register("title")}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008ca1]/20 focus:border-[#008ca1]"
                                            placeholder="e.g. Modern Student Hostel"
                                        />
                                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            {...register("description")}
                                            rows={3}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008ca1]/20 focus:border-[#008ca1]"
                                            placeholder="Describe the hostel facilities..."
                                        />
                                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Bed className="w-4 h-4" /> Room Details
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (Monthly)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="number"
                                                {...register("price", { valueAsNumber: true })}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008ca1]/20 focus:border-[#008ca1]"
                                            />
                                        </div>
                                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                                        <select
                                            {...register("roomType")}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008ca1]/20 focus:border-[#008ca1]"
                                        >
                                            <option value="SINGLE">Single Room</option>
                                            <option value="DOUBLE">Double Room</option>
                                            <option value="TRIPLE">Triple Room</option>
                                            <option value="SHARED">Shared Dorm</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Type</label>
                                        <select
                                            {...register("tenantType")}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008ca1]/20 focus:border-[#008ca1]"
                                        >
                                            <option value="ANY">Any</option>
                                            <option value="MALE">Male Only</option>
                                            <option value="FEMALE">Female Only</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center h-full pt-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                {...register("mealIncluded")}
                                                className="w-4 h-4 rounded text-[#008ca1] focus:ring-[#008ca1]"
                                            />
                                            <span className="text-sm text-gray-700">Meals Included</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Location & Contact
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            {...register("address")}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008ca1]/20 focus:border-[#008ca1]"
                                        />
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            {...register("city")}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008ca1]/20 focus:border-[#008ca1]"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                                        <input
                                            {...register("contactPhone")}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008ca1]/20 focus:border-[#008ca1]"
                                        />
                                        {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Images */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Upload className="w-4 h-4" /> Images
                                </h3>

                                <div className="grid grid-cols-4 gap-4">
                                    {previews.map((preview, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                            <Image
                                                src={preview}
                                                alt={`Preview ${idx}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}

                                    <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-[#008ca1] transition-colors flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                        <span className="text-xs text-gray-500">Upload</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
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
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5" />
                                            <span>Create Hostel</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
