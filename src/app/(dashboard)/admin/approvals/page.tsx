"use client";

import { useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import {
  CheckCircle,
  XCircle,
  Eye,
  Building2,
  Users,
  MessageSquare,
  FileText,
} from "lucide-react";

interface ApprovalItem {
  id: number;
  type: "property" | "user" | "review" | "post";
  title: string;
  submittedBy: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  description: string;
}

const ApprovalsPage = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "property" | "user" | "review" | "post">(
    "all",
  );

  // Mock data - replace with real API data
  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    {
      id: 1,
      type: "property",
      title: "3 BHK Apartment in Shaheb Bazar",
      submittedBy: "John Doe",
      submittedAt: "2024-01-15 10:30 AM",
      status: "pending",
      description: "Spacious apartment near university",
    },
    {
      id: 2,
      type: "user",
      title: "New User: Sarah Ahmed",
      submittedBy: "Sarah Ahmed",
      submittedAt: "2024-01-15 09:15 AM",
      status: "pending",
      description: "User registration pending verification",
    },
    {
      id: 3,
      type: "review",
      title: "Review for Hostel Prime",
      submittedBy: "Mike Johnson",
      submittedAt: "2024-01-15 08:45 AM",
      status: "pending",
      description: "5-star review with detailed feedback",
    },
    {
      id: 4,
      type: "post",
      title: "Doctor listing: Dr. Rahman",
      submittedBy: "Dr. Abdul Rahman",
      submittedAt: "2024-01-14 04:20 PM",
      status: "pending",
      description: "Cardiologist with 15 years experience",
    },
    {
      id: 5,
      type: "property",
      title: "Student Hostel in Binodpur",
      submittedBy: "Ali Hasan",
      submittedAt: "2024-01-14 02:10 PM",
      status: "pending",
      description: "Boys hostel with 20 rooms",
    },
  ]);

  const tabs = [
    { key: "all" as const, label: "All Pending", count: approvals.filter((a) => a.status === "pending").length },
    { key: "property" as const, label: "Properties", count: approvals.filter((a) => a.type === "property" && a.status === "pending").length },
    { key: "user" as const, label: "Users", count: approvals.filter((a) => a.type === "user" && a.status === "pending").length },
    { key: "review" as const, label: "Reviews", count: approvals.filter((a) => a.type === "review" && a.status === "pending").length },
    { key: "post" as const, label: "Posts", count: approvals.filter((a) => a.type === "post" && a.status === "pending").length },
  ];

  const filteredApprovals =
    selectedTab === "all"
      ? approvals.filter((a) => a.status === "pending")
      : approvals.filter((a) => a.type === selectedTab && a.status === "pending");

  const handleApprove = (id: number) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "approved" as const } : item)),
    );
  };

  const handleReject = (id: number) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "rejected" as const } : item)),
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "property":
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case "user":
        return <Users className="w-5 h-5 text-green-600" />;
      case "review":
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case "post":
        return <FileText className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const columns = [
    {
      key: "type",
      label: "Type",
      render: (item: ApprovalItem) => (
        <div className="flex items-center space-x-2">
          {getTypeIcon(item.type)}
          <span className="capitalize">{item.type}</span>
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (item: ApprovalItem) => (
        <div>
          <p className="font-medium text-gray-900">{item.title}</p>
          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
        </div>
      ),
    },
    {
      key: "submittedBy",
      label: "Submitted By",
    },
    {
      key: "submittedAt",
      label: "Submitted At",
    },
    {
      key: "status",
      label: "Status",
      render: (item: ApprovalItem) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.status === "approved"
              ? "bg-green-100 text-green-700"
              : item.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approvals</h1>
          <p className="text-gray-600 mt-1">Review and manage pending submissions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedTab(tab.key)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === tab.key
                  ? "bg-yellow-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredApprovals}
        columns={columns}
        searchPlaceholder="Search approvals..."
        actions={(item) => (
          <>
            <button
              type="button"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleApprove(item.id)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Approve"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleReject(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Reject"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </>
        )}
      />
    </div>
  );
};

export default ApprovalsPage;
