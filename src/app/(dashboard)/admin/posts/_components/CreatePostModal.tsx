"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, Save, Image as ImageIcon, Type, User, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IBlog, CreateBlogRequest, UpdateBlogRequest } from "@/types/blog.types";

const blogSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    author: z.string().optional(),
    tags: z.string().optional(), // We'll parse this string into an array
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateBlogRequest | UpdateBlogRequest) => void;
    isLoading: boolean;
    editPost?: IBlog | null;
}

export default function CreatePostModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    editPost,
}: CreatePostModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            content: "",
            featuredImage: "",
            author: "",
            tags: "",
        },
    });

    useEffect(() => {
        if (editPost) {
            setValue("title", editPost.title);
            setValue("content", editPost.content);
            setValue("featuredImage", editPost.featuredImage || "");
            setValue("author", editPost.author || "");
            setValue("tags", editPost.tags?.join(", ") || "");
        } else {
            reset({
                title: "",
                content: "",
                featuredImage: "",
                author: "",
                tags: "",
            });
        }
    }, [editPost, setValue, reset, isOpen]);

    const handleFormSubmit = (data: BlogFormValues) => {
        const formattedData: CreateBlogRequest | UpdateBlogRequest = {
            title: data.title,
            content: data.content,
            featuredImage: data.featuredImage || undefined,
            author: data.author || undefined,
            tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "") : [],
        };
        onSubmit(formattedData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-md w-full max-w-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(255,255,255,0.5)] border border-white overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-cyan-50 rounded-2xl text-[#008ca1]">
                                        {editPost ? <Type className="w-6 h-6" /> : <Save className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                            {editPost ? "Edit Post" : "Create New Post"}
                                        </h2>
                                        <p className="text-sm text-gray-500 font-medium">
                                            {editPost ? "Update existing blog post details" : "Add a new blog post to the system"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <form id="post-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Title</label>
                                        <div className="relative group">
                                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#008ca1] transition-colors" />
                                            <input
                                                {...register("title")}
                                                type="text"
                                                placeholder="e.g., Top 10 Travel Tips"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-transparent focus:border-[#008ca1]/30 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900 hover:bg-gray-50"
                                            />
                                        </div>
                                        {errors.title && (
                                            <p className="text-xs text-rose-500 font-bold ml-1">{errors.title.message}</p>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Content</label>
                                        <textarea
                                            {...register("content")}
                                            rows={6}
                                            placeholder="Write your post content here..."
                                            className="w-full p-4 bg-gray-50/50 border-2 border-transparent focus:border-[#008ca1]/30 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900 hover:bg-gray-50 resize-y"
                                        />
                                        {errors.content && (
                                            <p className="text-xs text-rose-500 font-bold ml-1">{errors.content.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Featured Image */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Featured Image URL</label>
                                            <div className="relative group">
                                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#008ca1] transition-colors" />
                                                <input
                                                    {...register("featuredImage")}
                                                    type="text"
                                                    placeholder="https://example.com/image.jpg"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-transparent focus:border-[#008ca1]/30 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900 hover:bg-gray-50"
                                                />
                                            </div>
                                            {errors.featuredImage && (
                                                <p className="text-xs text-rose-500 font-bold ml-1">{errors.featuredImage.message}</p>
                                            )}
                                        </div>

                                        {/* Author */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Author</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#008ca1] transition-colors" />
                                                <input
                                                    {...register("author")}
                                                    type="text"
                                                    placeholder="Author Name"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-transparent focus:border-[#008ca1]/30 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900 hover:bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Tags (comma separated)</label>
                                        <div className="relative group">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#008ca1] transition-colors" />
                                            <input
                                                {...register("tags")}
                                                type="text"
                                                placeholder="travel, tips, lifestyle"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-transparent focus:border-[#008ca1]/30 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900 hover:bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    disabled={isLoading}
                                    className="px-6 py-3.5 text-gray-600 font-bold hover:bg-gray-200/50 rounded-2xl transition-all disabled:opacity-50 active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    form="post-form"
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-8 py-3.5 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-cyan-600/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>{editPost ? "Updating..." : "Creating..."}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            <span>{editPost ? "Save Changes" : "Create Post"}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
