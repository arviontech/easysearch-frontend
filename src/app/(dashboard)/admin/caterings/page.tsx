"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit, Trash2, Eye, Plus, Utensils, Search, Building2, TrendingUp, Truck } from "lucide-react";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import Image from "next/image";
import { useGetAllCateringsQuery, useDeleteCateringMutation } from "@/lib/redux/features/catering/cateringApi";
import DataTable from "../../_component/table/DataTable";
import CreateCateringModal from "./_components/CreateCateringModal";
import ConfirmationModal from "./_components/ConfirmationModal";

// Display interface for the table
interface CateringDisplay {
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
    createdAt: string;
    updatedAt: string;
}

const CateringsPage = () => {
    const dispatch = useDispatch();
    const { data: cateringsData, isLoading, isError } = useGetAllCateringsQuery(undefined);
    const [deleteCatering, { isLoading: isDeleting }] = useDeleteCateringMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editCatering, setEditCatering] = useState<CateringDisplay | null>(null);
    const [cateringToDelete, setCateringToDelete] = useState<string | null>(null);

    const caterings = cateringsData?.data || [];

    const handleEdit = (catering: CateringDisplay) => {
        setEditCatering(catering);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setCateringToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (cateringToDelete) {
            try {
                await deleteCatering(cateringToDelete).unwrap();
                dispatch(addNotification({ message: "Catering service deleted successfully", type: "success" }));
                setIsDeleteModalOpen(false);
                setCateringToDelete(null);
            } catch (error: any) {
                dispatch(addNotification({
                    message: error?.data?.message || "Failed to delete catering service",
                    type: "error"
                }));
            }
        }
    };

    const columns = [
        {
            key: "profilePhoto",
            label: "Image",
            render: (catering: CateringDisplay) => (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cyan-50 border border-white shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.5)]">
                    {catering.profilePhoto ? (
                        <Image
                            src={catering.profilePhoto}
                            alt={catering.name}
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
            label: "Business Name",
            render: (catering: CateringDisplay) => (
                <div>
                    <p className="font-bold text-gray-900 text-base">{catering.name}</p>
                    <p className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {catering.id}</p>
                </div>
            ),
        },
        {
            key: "businessRegistrationNumber",
            label: "Registration No.",
            render: (catering: CateringDisplay) => (
                <span className="text-sm text-gray-600 font-medium font-mono">
                    {catering.businessRegistrationNumber}
                </span>
            ),
        },
        {
            key: "city",
            label: "Location",
            render: (catering: CateringDisplay) => (
                <div>
                    <p className="text-sm text-gray-900 font-medium">{catering.city}</p>
                    {catering.state && <p className="text-xs text-gray-500">{catering.state}</p>}
                </div>
            ),
        },
        {
            key: "cuisineTypes",
            label: "Cuisines",
            render: (catering: CateringDisplay) => (
                <span className="text-sm text-gray-600">
                    {catering.cuisineTypes && catering.cuisineTypes.length > 0
                        ? catering.cuisineTypes.slice(0, 2).join(", ") + (catering.cuisineTypes.length > 2 ? "..." : "")
                        : "N/A"}
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Created",
            render: (catering: CateringDisplay) => (
                <span className="text-sm text-gray-600 font-medium italic">
                    {catering.createdAt ? new Date(catering.createdAt).toLocaleDateString() : "N/A"}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        Catering <span className="text-cyan-600">Services</span>
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Manage catering service providers</p>
                </div>
                <button
                    onClick={() => {
                        setEditCatering(null);
                        setIsModalOpen(true);
                    }}
                    type="button"
                    className="px-6 py-3.5 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#008ca1]/20 active:scale-95 flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Catering</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Services", value: caterings.length, icon: Utensils, color: "cyan" },
                    { label: "Active Now", value: caterings.filter((c: CateringDisplay) => c.deliveryAvailable).length, icon: Truck, color: "blue" },
                    { label: "Top Cuisine", value: "Italian", icon: TrendingUp, color: "indigo" },
                    { label: "Avg. Orders", value: "48/day", icon: Building2, color: "violet" },
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

            {/* Data Table */}
            <div className="relative">
                <DataTable
                    data={caterings}
                    columns={columns}
                    searchPlaceholder="Search catering services by name..."
                    actions={(catering: CateringDisplay) => (
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className="p-2 text-[#008ca1] hover:bg-cyan-50 rounded-xl transition-all active:scale-90"
                                title="View Catering Service"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleEdit(catering)}
                                type="button"
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                                title="Edit Catering Service"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(catering.id)}
                                type="button"
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                                title="Delete Catering Service"
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
                        <p className="text-red-500 font-bold">Failed to load catering services. Please try again.</p>
                    </div>
                )}
            </div>

            <CreateCateringModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditCatering(null);
                }}
                editCatering={editCatering}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Catering Service?"
                message="Are you sure you want to delete this catering service? This action cannot be undone and will remove all associated data."
                isLoading={isDeleting}
                confirmText="Delete Service"
                variant="danger"
            />
        </div>
    );
};

export default CateringsPage;
