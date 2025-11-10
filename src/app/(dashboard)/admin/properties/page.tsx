"use client";

import { useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import { Edit, Trash2, Eye, CheckCircle, XCircle, MapPin } from "lucide-react";

interface Property {
  id: number;
  title: string;
  type: "house" | "hostel" | "apartment";
  location: string;
  price: number;
  owner: string;
  status: "approved" | "pending" | "rejected";
  postedAt: string;
  views: number;
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "3 BHK Apartment in Shaheb Bazar",
      type: "apartment",
      location: "Shaheb Bazar, Rajshahi",
      price: 15000,
      owner: "John Doe",
      status: "approved",
      postedAt: "2024-01-10",
      views: 234,
    },
    {
      id: 2,
      title: "Student Hostel in Binodpur",
      type: "hostel",
      location: "Binodpur, Rajshahi",
      price: 5000,
      owner: "Ali Hasan",
      status: "pending",
      postedAt: "2024-01-15",
      views: 56,
    },
    {
      id: 3,
      title: "2 BHK House near RU",
      type: "house",
      location: "Near Rajshahi University",
      price: 12000,
      owner: "Sarah Ahmed",
      status: "approved",
      postedAt: "2024-01-12",
      views: 178,
    },
    {
      id: 4,
      title: "Single Room Hostel",
      type: "hostel",
      location: "Talaimari, Rajshahi",
      price: 3500,
      owner: "Mike Johnson",
      status: "pending",
      postedAt: "2024-01-14",
      views: 89,
    },
    {
      id: 5,
      title: "Luxury Apartment",
      type: "apartment",
      location: "C&B More, Rajshahi",
      price: 25000,
      owner: "Dr. Rahman",
      status: "rejected",
      postedAt: "2024-01-13",
      views: 45,
    },
  ]);

  const handleApprove = (id: number) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, status: "approved" as const } : prop)),
    );
  };

  const handleReject = (id: number) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, status: "rejected" as const } : prop)),
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties((prev) => prev.filter((prop) => prop.id !== id));
    }
  };

  const columns = [
    {
      key: "title",
      label: "Property",
      render: (property: Property) => (
        <div>
          <p className="font-medium text-gray-900">{property.title}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {property.location}
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (property: Property) => (
        <span className="capitalize px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          {property.type}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (property: Property) => (
        <span className="font-semibold text-gray-900">৳{property.price.toLocaleString()}/mo</span>
      ),
    },
    {
      key: "owner",
      label: "Owner",
    },
    {
      key: "status",
      label: "Status",
      render: (property: Property) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            property.status === "approved"
              ? "bg-green-100 text-green-700"
              : property.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {property.status}
        </span>
      ),
    },
    {
      key: "views",
      label: "Views",
      render: (property: Property) => (
        <span className="text-gray-600">{property.views}</span>
      ),
    },
    {
      key: "postedAt",
      label: "Posted",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties Management</h1>
          <p className="text-gray-600 mt-1">Manage all property listings</p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-md"
        >
          Add New Property
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Properties</p>
          <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {properties.filter((p) => p.status === "approved").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {properties.filter((p) => p.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Views</p>
          <p className="text-2xl font-bold text-blue-600">
            {properties.reduce((sum, p) => sum + p.views, 0)}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={properties}
        columns={columns}
        searchPlaceholder="Search properties..."
        actions={(property) => (
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
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title="Edit Property"
            >
              <Edit className="w-4 h-4" />
            </button>
            {property.status === "pending" && (
              <>
                <button
                  type="button"
                  onClick={() => handleApprove(property.id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Approve"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(property.id)}
                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="Reject"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => handleDelete(property.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Property"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />
    </div>
  );
};

export default PropertiesPage;
