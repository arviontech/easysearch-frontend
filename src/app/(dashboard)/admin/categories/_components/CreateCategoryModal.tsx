"use client";

import React, { useState } from "react";
import { X, Upload, Plus, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/lib/redux/features/category/categoryApi";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import Image from "next/image";

interface CategoryData {
    id: string;
    categoryName: string;
    categoryImage: string;
    description?: string;
}

interface CreateCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    editCategory?: CategoryData | null;
}

export default function CreateCategoryModal({ isOpen, onClose, editCategory }: CreateCategoryModalProps) {
    const dispatch = useDispatch();
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const isLoading = isCreating || isUpdating;

    React.useEffect(() => {
        if (editCategory) {
            setCategoryName(editCategory.categoryName);
            setDescription(editCategory.description || "");
            setImagePreview(editCategory.categoryImage);
            setImage(null);
        } else {
            setCategoryName("");
            setDescription("");
            setImagePreview(null);
            setImage(null);
        }
    }, [editCategory, isOpen]);

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
        if (!categoryName) {
            dispatch(addNotification({ message: "Category name is required", type: "error" }));
            return;
        }

        const formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }

        try {
            if (editCategory) {
                await updateCategory({ id: editCategory.id, data: formData }).unwrap();
                dispatch(addNotification({ message: "Category updated successfully", type: "success" }));
            } else {
                await createCategory(formData).unwrap();
                dispatch(addNotification({ message: "Category created successfully", type: "success" }));
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
                            className="bg-white/90 backdrop-blur-md w-full max-w-lg rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(255,255,255,0.5)] border border-white overflow-hidden"
                        >
                            {/* Header */}
                            <div className="px-6 py-6 border-b border-cyan-100 flex items-center justify-between bg-gradient-to-r from-cyan-50/50 to-blue-50/50">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                        {editCategory ? "Edit Category" : "Create New Category"}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {editCategory ? "Update category details" : "Add a new category to organize your properties"}
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
                                {/* Category Name */}
                                <div className="space-y-2">
                                    <label htmlFor="categoryName" className="block text-sm font-bold text-gray-700 ml-1">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="Enter category name (e.g. Apartments)"
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label htmlFor="description" className="block text-sm font-bold text-gray-700 ml-1">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter category description..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-white/50 border border-cyan-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008ca1] focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-gray-900 placeholder:text-gray-400 font-medium resize-none"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 ml-1">
                                        Category Image
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="categoryImage"
                                        />
                                        <label
                                            htmlFor="categoryImage"
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
                                                <span>{editCategory ? "Updating..." : "Creating..."}</span>
                                            </>
                                        ) : (
                                            <>
                                                {editCategory ? <X className="w-5 h-5 rotate-45" /> : <Plus className="w-5 h-5" />}
                                                <span>{editCategory ? "Update Category" : "Create Category"}</span>
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
