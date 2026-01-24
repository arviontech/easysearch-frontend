"use client";

import React from "react";
import { X, Tag, Calendar, Hash, FileText, Building2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CategoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    id: string;
    categoryName: string;
    categoryImage: string;
    description?: string;
    categoryOrder: number;
    createdAt: string;
    updatedAt: string;
  } | null;
  statistics?: {
    listings: number;
    properties: number;
    views: number;
  };
}

export default function CategoryDetailModal({ isOpen, onClose, category, statistics }: CategoryDetailModalProps) {
  if (!category) return null;

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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-cyan-100"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 border-b border-cyan-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* Category Image */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-cyan-100 border-2 border-white shadow-lg">
                      {category.categoryImage ? (
                        <Image
                          src={category.categoryImage}
                          alt={category.categoryName}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Tag className="w-10 h-10 text-cyan-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Category Info */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {category.categoryName}
                      </h2>
                      <p className="text-sm text-gray-500 font-mono">
                        ID: {category.id}
                      </p>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/50 rounded-xl transition-colors text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Description */}
                {category.description && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      <FileText className="w-5 h-5" />
                      <span>Description</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
                      {category.description}
                    </p>
                  </div>
                )}

                {/* Category Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Order Position */}
                  <div className="bg-cyan-50/60 backdrop-blur-sm rounded-2xl p-4 border border-cyan-100">
                    <div className="flex items-center gap-3 text-cyan-700 font-semibold mb-2">
                      <Hash className="w-5 h-5" />
                      <span>Order Position</span>
                    </div>
                    <p className="text-2xl font-bold text-cyan-900">
                      #{category.categoryOrder}
                    </p>
                    <p className="text-sm text-cyan-600 mt-1">
                      Lower numbers appear first
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-green-50/60 backdrop-blur-sm rounded-2xl p-4 border border-green-100">
                    <div className="flex items-center gap-3 text-green-700 font-semibold mb-2">
                      <Tag className="w-5 h-5" />
                      <span>Status</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">
                      Active
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      Category is currently active
                    </p>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Created Date */}
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Calendar className="w-5 h-5" />
                      <span>Created</span>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {new Date(category.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(category.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {/* Last Updated */}
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Calendar className="w-5 h-5" />
                      <span>Last Updated</span>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {new Date(category.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(category.updatedAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                    <Building2 className="w-5 h-5" />
                    <span>Usage Statistics</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-900">{statistics?.properties || 0}</p>
                      <p className="text-xs text-blue-600">Properties</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-900">{statistics?.listings || 0}</p>
                      <p className="text-xs text-blue-600">Listings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-900">{statistics?.views || 0}</p>
                      <p className="text-xs text-blue-600">Views</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
