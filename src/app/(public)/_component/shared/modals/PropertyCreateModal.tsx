"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { useCreateHouseRentMutation } from "@/lib/redux/features/api/houseRentApi";
import { useGetCategoriesQuery } from "@/lib/redux/features/api/categoryApi";
import type { CreateHouseRentRequest, PropertyType, Furnishing } from "@/lib/api/types";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import {
  Loader2,
  Home,
  MapPin,
  Calendar,
  DollarSign,
  Ruler,
  Bed,
  Bath,
  Building,
  Image as ImageIcon,
  Plus,
  X,
  Sparkles,
  FileText,
  Car,
  Zap,
} from "lucide-react";
import MapLocationPicker from "@/components/map/MapLocationPicker";

interface PropertyCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PropertyCreateModal = ({ isOpen, onClose }: PropertyCreateModalProps) => {
  const dispatch = useDispatch();
  const [createProperty, { isLoading }] = useCreateHouseRentMutation();
  const { data: categoriesResponse } = useGetCategoriesQuery({ page: 1, limit: 100 });

  // Form state
  const [formData, setFormData] = useState<CreateHouseRentRequest>({
    title: "",
    description: "",
    price: 0,
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    size: 0,
    floor: "Ground",
    totalFloors: 1,
    furnishing: "Unfurnished",
    availableFrom: new Date().toISOString().split("T")[0],
    address: "",
    area: "",
    city: "",
    division: "",
    lat: 24.3745,
    lng: 88.6042,
    categoryId: "",
    ownerId: "",
    // Optional extended fields
    images: [],
    securityDeposit: 0,
    advanceRent: 0,
    features: [],
    amenities: [],
    rules: [],
    utilities: {
      gas: false,
      electricity: false,
      water: false,
      internet: false,
      generator: false,
    },
    parking: {
      available: false,
      type: "",
    },
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateHouseRentRequest, string>>>({});

  const propertyTypes: PropertyType[] = ["Apartment", "House", "Villa", "Studio"];
  const furnishingOptions: Furnishing[] = ["Furnished", "Semi_Furnished", "Unfurnished"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
          name === "bedrooms" ||
          name === "bathrooms" ||
          name === "size" ||
          name === "totalFloors" ||
          name === "lat" ||
          name === "lng"
          ? Number(value)
          : value,
    }));
    if (errors[name as keyof CreateHouseRentRequest]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, lat, lng }));
  };

  // Array field handlers
  const addArrayItem = (field: "images" | "features" | "amenities" | "rules") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }));
  };

  const updateArrayItem = (
    field: "images" | "features" | "amenities" | "rules",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.map((item, i) => (i === index ? value : item)) || [],
    }));
  };

  const removeArrayItem = (field: "images" | "features" | "amenities" | "rules", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || [],
    }));
  };

  // Utilities handler
  const handleUtilityChange = (utility: keyof NonNullable<CreateHouseRentRequest["utilities"]>) => {
    setFormData((prev) => ({
      ...prev,
      utilities: {
        ...prev.utilities,
        [utility]: !prev.utilities?.[utility],
      },
    }));
  };

  // Parking handler
  const handleParkingChange = (field: "available" | "type", value: boolean | string) => {
    setFormData((prev) => ({
      ...prev,
      parking: {
        available: prev.parking?.available || false,
        type: prev.parking?.type || "",
        [field]: value,
      },
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateHouseRentRequest, string>> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.bedrooms < 1) newErrors.bedrooms = "At least 1 bedroom required";
    if (formData.bathrooms < 1) newErrors.bathrooms = "At least 1 bathroom required";
    if (formData.size <= 0) newErrors.size = "Size must be greater than 0";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.area.trim()) newErrors.area = "Area is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.division.trim()) newErrors.division = "Division is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.ownerId.trim()) newErrors.ownerId = "Owner ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please fill in all required fields",
        }),
      );
      return;
    }

    try {
      await createProperty(formData).unwrap();
      dispatch(
        addNotification({
          type: "success",
          message: "Property created successfully!",
        }),
      );
      onClose();
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: 0,
        propertyType: "Apartment",
        bedrooms: 1,
        bathrooms: 1,
        size: 0,
        floor: "Ground",
        totalFloors: 1,
        furnishing: "Unfurnished",
        availableFrom: new Date().toISOString().split("T")[0],
        address: "",
        area: "",
        city: "",
        division: "",
        lat: 24.3745,
        lng: 88.6042,
        categoryId: "",
        ownerId: "",
        images: [],
        securityDeposit: 0,
        advanceRent: 0,
        features: [],
        amenities: [],
        rules: [],
        utilities: {
          gas: false,
          electricity: false,
          water: false,
          internet: false,
          generator: false,
        },
        parking: {
          available: false,
          type: "",
        },
      });
    } catch (err: any) {
      dispatch(
        addNotification({
          type: "error",
          message: err?.data?.message || "Failed to create property",
        }),
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Property" size="xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Overview */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Home className="w-5 h-5 text-cyan-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Property Overview</h3>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${errors.title ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="e.g., Spacious 3 BHK Apartment in Shaheb Bazar"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none ${errors.description ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="Describe the property features, amenities, and surrounding area..."
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.description}</p>
              )}
            </div>

            {/* Property Type & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${errors.categoryId ? "border-red-400" : "border-gray-200"
                    }`}
                >
                  <option value="">Select category</option>
                  {categoriesResponse?.data?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.categoryId}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <ImageIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Property Images</h3>
          </div>

          <div className="space-y-3">
            {formData.images?.map((image, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => updateArrayItem("images", index, e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("images", index)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("images")}
              className="w-full px-4 py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Image URL
            </button>
            <p className="text-xs text-gray-600 ml-1">
              Add property image URLs. First image will be the cover photo.
            </p>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Building className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Property Details</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Price */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Price (BDT/month) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.price ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="10000"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.price}</p>}
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Bed className="w-4 h-4 inline mr-1" />
                Bedrooms <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.bedrooms ? "border-red-400" : "border-gray-200"
                  }`}
              />
              {errors.bedrooms && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.bedrooms}</p>
              )}
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Bath className="w-4 h-4 inline mr-1" />
                Bathrooms <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.bathrooms ? "border-red-400" : "border-gray-200"
                  }`}
              />
              {errors.bathrooms && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.bathrooms}</p>
              )}
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Ruler className="w-4 h-4 inline mr-1" />
                Size (sq ft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.size ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="1200"
              />
              {errors.size && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.size}</p>}
            </div>

            {/* Floor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Floor</label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ground, 1st, 2nd..."
              />
            </div>

            {/* Total Floors */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Floors
              </label>
              <input
                type="number"
                name="totalFloors"
                value={formData.totalFloors}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Furnishing */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Furnishing <span className="text-red-500">*</span>
              </label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {furnishingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Available From */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Available From
              </label>
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Financial Details</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Security Deposit */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Security Deposit (BDT)
              </label>
              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="20000"
              />
            </div>

            {/* Advance Rent */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Advance Rent (months)
              </label>
              <input
                type="number"
                name="advanceRent"
                value={formData.advanceRent}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="2"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Location Details</h3>
          </div>

          <div className="space-y-4">
            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.address ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="House 123, Road 456"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.address}</p>
              )}
            </div>

            {/* Area, City, Division */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Area <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.area ? "border-red-400" : "border-gray-200"
                    }`}
                  placeholder="Shaheb Bazar"
                />
                {errors.area && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.area}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.city ? "border-red-400" : "border-gray-200"
                    }`}
                  placeholder="Rajshahi"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Division <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.division ? "border-red-400" : "border-gray-200"
                    }`}
                  placeholder="Rajshahi"
                />
                {errors.division && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.division}</p>
                )}
              </div>
            </div>

            {/* Map Location Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pin Location on Map
              </label>
              <MapLocationPicker
                latitude={formData.lat}
                longitude={formData.lng}
                onLocationChange={handleLocationChange}
                height="h-80"
              />
            </div>
          </div>
        </div>

        {/* Features & Amenities */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Features & Amenities</h3>
          </div>

          <div className="space-y-6">
            {/* Features */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Features
              </label>
              <div className="space-y-2">
                {formData.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateArrayItem("features", index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Balcony, Modern Kitchen, Spacious Rooms"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("features", index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("features")}
                  className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities</label>
              <div className="space-y-2">
                {formData.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={amenity}
                      onChange={(e) => updateArrayItem("amenities", index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Swimming Pool, Gym, 24/7 Security"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("amenities", index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("amenities")}
                  className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Amenity
                </button>
              </div>
            </div>

            {/* Utilities */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Zap className="w-4 h-4 inline mr-1" />
                Utilities Available
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["gas", "electricity", "water", "internet", "generator"].map((utility) => (
                  <label
                    key={utility}
                    className="flex items-center space-x-3 p-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={
                        formData.utilities?.[
                        utility as keyof NonNullable<CreateHouseRentRequest["utilities"]>
                        ] || false
                      }
                      onChange={() =>
                        handleUtilityChange(
                          utility as keyof NonNullable<CreateHouseRentRequest["utilities"]>,
                        )
                      }
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {utility}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <FileText className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Additional Information</h3>
          </div>

          <div className="space-y-6">
            {/* Parking */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Car className="w-4 h-4 inline mr-1" />
                Parking
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-rose-50 hover:border-rose-300 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.parking?.available || false}
                    onChange={(e) => handleParkingChange("available", e.target.checked)}
                    className="w-5 h-5 text-rose-600 rounded focus:ring-2 focus:ring-rose-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Parking Available</span>
                </label>

                {formData.parking?.available && (
                  <input
                    type="text"
                    value={formData.parking?.type || ""}
                    onChange={(e) => handleParkingChange("type", e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="e.g., Covered, Open, Underground"
                  />
                )}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">House Rules</label>
              <div className="space-y-2">
                {formData.rules?.map((rule, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) => updateArrayItem("rules", index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                      placeholder="e.g., No Smoking, No Pets, Quiet Hours 10 PM - 7 AM"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("rules", index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("rules")}
                  className="w-full px-4 py-3 border-2 border-dashed border-rose-300 rounded-xl text-rose-600 font-medium hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Rule
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Information */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Home className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Owner Information</h3>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Owner ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${errors.ownerId ? "border-red-400" : "border-gray-200"
                }`}
              placeholder="Enter owner user ID"
            />
            {errors.ownerId && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.ownerId}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t-2 border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Property...</span>
              </>
            ) : (
              <>
                <Home className="w-5 h-5" />
                <span>Create Property</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PropertyCreateModal;
