"use client";

import { useState } from "react";
import DataTable from "@/app/(dashboard)/_component/table/DataTable";
import {
  CheckCircle,
  XCircle,
  Eye,
  Building2,
  Users,
  MessageSquare,
  FileText,
  Utensils,
  Map,
  Clock,
  LayoutDashboard,
} from "lucide-react";
import {
  useGetPendingItemsQuery,
  useApprovePendingItemMutation,
  useRejectPendingItemMutation
} from "@/lib/redux/features/pending/pendingApi";
import { toast } from "sonner"; // Assuming sonner is used for toasts, or replace with user's toast provider

interface ApprovalItem {
  id: string;
  type: string;
  title: string;
  createdAt: string;
  status: string;
  data: any;
}

const ApprovalsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const { data: pendingResponse, isLoading, refetch } = useGetPendingItemsQuery({ type: selectedTab === "all" ? undefined : selectedTab });
  const [approveItem] = useApprovePendingItemMutation();
  const [rejectItem] = useRejectPendingItemMutation();

  const pendingItems = pendingResponse?.data || [];

  const tabs = [
    { key: "all", label: "All Pending", icon: LayoutDashboard },
    { key: "house-rent", label: "Houses", icon: Building2 },
    { key: "hostel-rent", label: "Hostels", icon: Building2 },
    { key: "food", label: "Food", icon: Utensils },
    { key: "tourism", label: "Tourism", icon: Map },
    { key: "blog", label: "Blogs", icon: FileText },
    { key: "catering", label: "Catering", icon: Utensils },
  ];

  const handleApprove = async (item: ApprovalItem) => {
    try {
      await approveItem({ type: item.type, id: item.id }).unwrap();
      toast.success(`${item.title} approved successfully`);
    } catch (error) {
      toast.error("Failed to approve item");
    }
  };

  const handleReject = async (item: ApprovalItem) => {
    try {
      await rejectItem({ type: item.type, id: item.id }).unwrap();
      toast.success(`${item.title} rejected successfully`);
    } catch (error) {
      toast.error("Failed to reject item");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "house-rent":
      case "hostel-rent":
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case "food":
        return <Utensils className="w-5 h-5 text-green-600" />;
      case "tourism":
        return <Map className="w-5 h-5 text-purple-600" />;
      case "blog":
        return <FileText className="w-5 h-5 text-orange-600" />;
      case "catering":
        return <Utensils className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const columns = [
    {
      key: "type",
      label: "Category",
      render: (item: ApprovalItem) => (
        <div className="flex items-center space-x-2">
          {getTypeIcon(item.type)}
          <span className="capitalize text-sm font-medium">{item.type.replace('-', ' ')}</span>
        </div>
      ),
    },
    {
      key: "title",
      label: "Details",
      render: (item: ApprovalItem) => (
        <div>
          <p className="font-semibold text-gray-900">{item.title}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Clock className="w-3 h-3 mr-1" />
            {new Date(item.createdAt).toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: ApprovalItem) => (
        <span
          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${item.status === "APPROVED"
            ? "bg-green-100 text-green-700"
            : item.status === "REJECTED"
              ? "bg-red-100 text-red-700"
              : "bg-cyan-100 text-[#008ca1]"
            }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Approvals Dashboard</h1>
          <p className="text-gray-500 mt-2 text-lg">Central hub for reviewing new platform submissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
            <div className="bg-cyan-100 p-2 rounded-xl">
              <Clock className="w-6 h-6 text-[#008ca1]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Pending Total</p>
              <p className="text-2xl font-bold text-gray-900">{pendingItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedTab(tab.key)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${selectedTab === tab.key
                ? "bg-[#008ca1] text-white shadow-lg shadow-cyan-200"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#008ca1] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium animate-pulse">Loading pending submissions...</p>
          </div>
        ) : pendingItems.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">All caught up!</h3>
              <p className="text-gray-500 mt-1">There are no pending approvals for this category.</p>
            </div>
          </div>
        ) : (
          <DataTable
            data={pendingItems}
            columns={columns}
            searchPlaceholder="Search approvals by title..."
            actions={(item) => (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(item)}
                  className="p-2.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl transition-all"
                  title="Approve"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(item)}
                  className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all"
                  title="Reject"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default ApprovalsPage;
