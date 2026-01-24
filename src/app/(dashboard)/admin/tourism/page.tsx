"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit, Trash2, Eye, Plus, Palmtree, MapPin, DollarSign, TrendingUp } from "lucide-react";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import Image from "next/image";
import { useGetAllTourismQuery, useDeleteTourismMutation } from "@/lib/redux/features/tourism/tourismApi";
import DataTable from "../../_component/table/DataTable";
import CreateTourismModal from "./_components/CreateTourismModal";
import ConfirmationModal from "./_components/ConfirmationModal";

interface TourismDisplay {
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
    averageRating: number;
    totalReviews: number;
    createdAt: string;
    updatedAt: string;
}

const TourismPage = () => {
    const dispatch = useDispatch();
    const { data: tourismData, isLoading, isError } = useGetAllTourismQuery(undefined);
    const [deleteTourism, { isLoading: isDeleting }] = useDeleteTourismMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editTourism, setEditTourism] = useState<TourismDisplay | null>(null);
    const [tourismToDelete, setTourismToDelete] = useState<string | null>(null);

    const tourism = tourismData?.data || [];

    const handleEdit = (item: TourismDisplay) => {
        setEditTourism(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setTourismToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (tourismToDelete) {
            try {
                await deleteTourism(tourismToDelete).unwrap();
                dispatch(addNotification({ message: "Tourism place deleted successfully", type: "success" }));
                setIsDeleteModalOpen(false);
                setTourismToDelete(null);
            } catch (error: any) {
                dispatch(addNotification({
                    message: error?.data?.message || "Failed to delete tourism place",
                    type: "error"
                }));
            }
        }
    };

    const columns = [
        {
            key: "images",
            label: "Image",
            render: (item: TourismDisplay) => (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cyan-50 border border-white shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.5)]">
                    {item.images && item.images.length > 0 ? (
                        <Image
                            src={item.images[0]}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Palmtree className="w-5 h-5 text-cyan-300" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "title",
            label: "Title",
            render: (item: TourismDisplay) => (
                <div>
                    <p className="font-bold text-gray-900 text-base">{item.title}</p>
                    <p className="text-xs text-gray-400 font-medium">{item.tourismType}</p>
                </div>
            ),
        },
        {
            key: "city",
            label: "Location",
            render: (item: TourismDisplay) => (
                <div>
                    <p className="text-sm text-gray-900 font-medium">{item.city}</p>
                    {item.state && <p className="text-xs text-gray-500">{item.state}, {item.country || "N/A"}</p>}
                </div>
            ),
        },
        {
            key: "entryFee",
            label: "Entry Fee",
            render: (item: TourismDisplay) => (
                <span className="text-sm text-gray-600 font-medium">
                    {item.entryFee ? `$${item.entryFee}` : "Free"}
                </span>
            ),
        },
        {
            key: "averageRating",
            label: "Rating",
            render: (item: TourismDisplay) => (
                <div>
                    <p className="text-sm text-gray-900 font-bold">★ {item.averageRating.toFixed(1)}</p>
                    <p className="text-xs text-gray-500">{item.totalReviews} reviews</p>
                </div>
            ),
        },
        {
            key: "createdAt",
            label: "Created",
            render: (item: TourismDisplay) => (
                <span className="text-sm text-gray-600 font-medium italic">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        Tourism <span className="text-cyan-600">Places</span>
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Manage tourism destinations</p>
                </div>
                <button
                    onClick={() => {
                        setEditTourism(null);
                        setIsModalOpen(true);
                    }}
                    type="button"
                    className="px-6 py-3.5 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#008ca1]/20 active:scale-95 flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Tourism Place</span>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Places", value: tourism.length, icon: Palmtree, color: "cyan" },
                    { label: "Top Rated", value: "4.8★", icon: TrendingUp, color: "blue" },
                    { label: "Most Visited", value: "Beach", icon: MapPin, color: "indigo" },
                    { label: "Avg. Entry Fee", value: "$25", icon: DollarSign, color: "violet" },
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
                    data={tourism}
                    columns={columns}
                    searchPlaceholder="Search tourism places by title..."
                    actions={(item: TourismDisplay) => (
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className="p-2 text-[#008ca1] hover:bg-cyan-50 rounded-xl transition-all active:scale-90"
                                title="View Tourism Place"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleEdit(item)}
                                type="button"
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                                title="Edit Tourism Place"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                type="button"
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                                title="Delete Tourism Place"
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
                        <p className="text-red-500 font-bold">Failed to load tourism places. Please try again.</p>
                    </div>
                )}
            </div>

            <CreateTourismModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditTourism(null);
                }}
                editTourism={editTourism}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Tourism Place?"
                message="Are you sure you want to delete this tourism place? This action cannot be undone and will remove all associated data."
                isLoading={isDeleting}
                confirmText="Delete Place"
                variant="danger"
            />
        </div>
    );
};

export default TourismPage;
