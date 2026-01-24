"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit, Trash2, Eye, Plus, Utensils, DollarSign, Star, TrendingUp } from "lucide-react";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import Image from "next/image";
import { useGetAllFoodQuery, useDeleteFoodMutation } from "@/lib/redux/features/food/foodApi";
import DataTable from "../../_component/table/DataTable";
import CreateFoodModal from "./_components/CreateFoodModal";
import ConfirmationModal from "./_components/ConfirmationModal";

interface FoodDisplay {
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
    averageRating: number;
    totalReviews: number;
    isAvailable: boolean;
    createdAt: string;
}

const FoodsPage = () => {
    const dispatch = useDispatch();
    const { data: foodData, isLoading, isError } = useGetAllFoodQuery(undefined);
    const [deleteFood, { isLoading: isDeleting }] = useDeleteFoodMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editFood, setEditFood] = useState<FoodDisplay | null>(null);
    const [foodToDelete, setFoodToDelete] = useState<string | null>(null);

    const foods = foodData?.data || [];

    const handleEdit = (item: FoodDisplay) => {
        setEditFood(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setFoodToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (foodToDelete) {
            try {
                await deleteFood(foodToDelete).unwrap();
                dispatch(addNotification({ message: "Food item deleted successfully", type: "success" }));
                setIsDeleteModalOpen(false);
                setFoodToDelete(null);
            } catch (error: any) {
                dispatch(addNotification({
                    message: error?.data?.message || "Failed to delete food item",
                    type: "error"
                }));
            }
        }
    };

    const columns = [
        {
            key: "images",
            label: "Image",
            render: (item: FoodDisplay) => (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cyan-50 border border-white shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.5)]">
                    {item.images && item.images.length > 0 ? (
                        <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Utensils className="w-5 h-5 text-cyan-300" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "name",
            label: "Food Name",
            render: (item: FoodDisplay) => (
                <div>
                    <p className="font-bold text-gray-900 text-base">{item.name}</p>
                    <p className="text-xs text-gray-400 font-medium">{item.category.replace(/_/g, ' ')}</p>
                </div>
            ),
        },
        {
            key: "price",
            label: "Price",
            render: (item: FoodDisplay) => (
                <span className="text-sm text-gray-900 font-bold">${item.price.toFixed(2)}</span>
            ),
        },
        {
            key: "restaurantName",
            label: "Restaurant",
            render: (item: FoodDisplay) => (
                <div>
                    <p className="text-sm text-gray-900 font-medium">{item.restaurantName || "N/A"}</p>
                    <p className="text-xs text-gray-500">{item.city}</p>
                </div>
            ),
        },
        {
            key: "dietaryTypes",
            label: "Dietary",
            render: (item: FoodDisplay) => (
                <span className="text-xs text-gray-600">
                    {item.dietaryTypes && item.dietaryTypes.length > 0
                        ? item.dietaryTypes.slice(0, 2).join(", ")
                        : "N/A"}
                </span>
            ),
        },
        {
            key: "isAvailable",
            label: "Status",
            render: (item: FoodDisplay) => (
                <span className={`px-2 py-1 text-xs font-bold rounded-lg ${item.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {item.isAvailable ? "Available" : "Unavailable"}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        Food <span className="text-cyan-600">Menu</span>
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Manage food items and menu</p>
                </div>
                <button
                    onClick={() => {
                        setEditFood(null);
                        setIsModalOpen(true);
                    }}
                    type="button"
                    className="px-6 py-3.5 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#008ca1]/20 active:scale-95 flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Food Item</span>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Items", value: foods.length, icon: Utensils, color: "cyan" },
                    { label: "Available", value: foods.filter((f: FoodDisplay) => f.isAvailable).length, icon: TrendingUp, color: "blue" },
                    { label: "Avg. Price", value: "$" + (foods.reduce((sum: number, f: FoodDisplay) => sum + f.price, 0) / (foods.length || 1)).toFixed(2), icon: DollarSign, color: "indigo" },
                    { label: "Top Rated", value: "4.5★", icon: Star, color: "violet" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white shadow-[0_8px_16px_rgba(0,0,0,0.05),inset_0_4px_8px_rgba(255,255,255,0.5)] group hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 mt-0.5">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative">
                <DataTable
                    data={foods}
                    columns={columns}
                    searchPlaceholder="Search food items by name..."
                    actions={(item: FoodDisplay) => (
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className="p-2 text-[#008ca1] hover:bg-cyan-50 rounded-xl transition-all active:scale-90"
                                title="View Food Item"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleEdit(item)}
                                type="button"
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                                title="Edit Food Item"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                type="button"
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                                title="Delete Food Item"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                />
                {isLoading && (
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                        <div className="w-10 h-10 border-4 border-[#008ca1] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {isError && (
                    <div className="p-12 text-center bg-red-50/50 backdrop-blur-md rounded-2xl border border-red-100">
                        <p className="text-red-500 font-bold">Failed to load food items. Please try again.</p>
                    </div>
                )}
            </div>

            <CreateFoodModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditFood(null);
                }}
                editFood={editFood}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Food Item?"
                message="Are you sure you want to delete this food item? This action cannot be undone and will remove all associated data."
                isLoading={isDeleting}
                confirmText="Delete Item"
                variant="danger"
            />
        </div>
    );
};

export default FoodsPage;
