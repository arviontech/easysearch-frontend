"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Edit,
    Trash2,
    FileText,
    Plus,
    Eye,
    EyeOff,
    Calendar,
    User,
    Globe,
    FileEdit,
    CheckCircle,
    XCircle,
    Loader2
} from "lucide-react";
import Image from "next/image";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import {
    useGetBlogsQuery,
    useDeleteBlogMutation,
    usePublishBlogMutation,
    useCreateBlogMutation,
    useUpdateBlogMutation
} from "@/lib/redux/features/blog/blogApi";
import DataTable from "../../_component/table/DataTable";
import CreatePostModal from "./_components/CreatePostModal";
import ConfirmationModal from "../categories/_components/ConfirmationModal";
import { IBlog, CreateBlogRequest, UpdateBlogRequest } from "@/types/blog.types";

const PostsPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { data: blogsData, isLoading, isError } = useGetBlogsQuery({ page, limit: 10 });
    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
    const [publishBlog, { isLoading: isPublishing }] = usePublishBlogMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editPost, setEditPost] = useState<IBlog | null>(null);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    const posts = blogsData?.data || [];
    const meta = blogsData?.meta;

    const handleCreateOrUpdate = async (data: CreateBlogRequest | UpdateBlogRequest) => {
        try {
            if (editPost) {
                await updateBlog({ id: editPost.id, data: data as UpdateBlogRequest }).unwrap();
                dispatch(addNotification({ message: "Post updated successfully", type: "success" }));
            } else {
                await createBlog(data as CreateBlogRequest).unwrap();
                dispatch(addNotification({ message: "Post created successfully", type: "success" }));
            }
            setIsModalOpen(false);
            setEditPost(null);
        } catch (error: any) {
            dispatch(addNotification({
                message: error?.data?.message || "Failed to save post",
                type: "error"
            }));
        }
    };

    const handleDelete = (id: string) => {
        setPostToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (postToDelete) {
            try {
                await deleteBlog(postToDelete).unwrap();
                dispatch(addNotification({ message: "Post deleted successfully", type: "success" }));
                setIsDeleteModalOpen(false);
                setPostToDelete(null);
            } catch (error: any) {
                dispatch(addNotification({
                    message: error?.data?.message || "Failed to delete post",
                    type: "error"
                }));
            }
        }
    };

    const handleTogglePublish = async (post: IBlog) => {
        try {
            await publishBlog({
                id: post.id,
                data: { isPublished: !post.isPublished }
            }).unwrap();
            dispatch(addNotification({
                message: `Post ${!post.isPublished ? 'published' : 'unpublished'} successfully`,
                type: "success"
            }));
        } catch (error: any) {
            dispatch(addNotification({
                message: error?.data?.message || "Failed to update publish status",
                type: "error"
            }));
        }
    };

    const columns = [
        {
            key: "title",
            label: "Post Details",
            render: (post: IBlog) => (
                <div className="flex items-center gap-3 max-w-sm">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cyan-50 border border-white shadow-sm flex-shrink-0">
                        {post.featuredImage ? (
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <FileText className="w-5 h-5 text-cyan-300" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-base truncate" title={post.title}>{post.title}</p>
                        <p className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {post.id.slice(0, 8)}...</p>
                    </div>
                </div>
            ),
        },
        {
            key: "author",
            label: "Author",
            render: (post: IBlog) => (
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-3 h-3 text-cyan-500" />
                    {post.author || "Unknown"}
                </span>
            ),
        },
        {
            key: "isPublished",
            label: "Status",
            render: (post: IBlog) => (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${post.isPublished
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}>
                    {post.isPublished ? (
                        <>
                            <Globe className="w-3 h-3 mr-1" />
                            Published
                        </>
                    ) : (
                        <>
                            <FileEdit className="w-3 h-3 mr-1" />
                            Draft
                        </>
                    )}
                </span>
            ),
        },
        {
            key: "tags",
            label: "Tags",
            render: (post: IBlog) => (
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {post.tags && post.tags.length > 0 ? (
                        post.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[10px] font-medium border border-gray-200">
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400 italic">No tags</span>
                    )}
                    {post.tags && post.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md text-[10px] border border-gray-100">
                            +{post.tags.length - 2}
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: "createdAt",
            label: "Created",
            render: (post: IBlog) => (
                <span className="text-sm text-gray-600 font-medium italic flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {new Date(post.createdAt).toLocaleDateString()}
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
                        Blog <span className="text-cyan-600">Posts</span>
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Manage articles, news, and updates</p>
                </div>
                <button
                    onClick={() => {
                        setEditPost(null);
                        setIsModalOpen(true);
                    }}
                    type="button"
                    className="px-6 py-3.5 bg-[#008ca1] hover:bg-[#007a8c] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#008ca1]/20 active:scale-95 flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create New Post</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { label: "Total Posts", value: meta?.total || 0, icon: FileText, color: "cyan" },
                    { label: "Published", value: posts.filter((p: IBlog) => p.isPublished).length, icon: Globe, color: "emerald" },
                    { label: "Drafts", value: posts.filter((p: IBlog) => !p.isPublished).length, icon: FileEdit, color: "amber" },
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
                    data={posts}
                    columns={columns}
                    searchPlaceholder="Search posts by title..."
                    actions={(post: IBlog) => (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handleTogglePublish(post)}
                                type="button"
                                className={`p-2 rounded-xl transition-all active:scale-90 ${post.isPublished
                                        ? "text-amber-500 hover:bg-amber-50"
                                        : "text-emerald-500 hover:bg-emerald-50"
                                    }`}
                                title={post.isPublished ? "Unpublish" : "Publish"}
                                disabled={isPublishing}
                            >
                                {post.isPublished ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => {
                                    setEditPost(post);
                                    setIsModalOpen(true);
                                }}
                                type="button"
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                                title="Edit Post"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                type="button"
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                                title="Delete Post"
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
                        <p className="text-red-500 font-bold">Failed to load posts. Please try again.</p>
                    </div>
                )}
            </div>

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditPost(null);
                }}
                onSubmit={handleCreateOrUpdate}
                isLoading={isCreating || isUpdating}
                editPost={editPost}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Post?"
                message="Are you sure you want to delete this post? This action cannot be undone."
                isLoading={isDeleting}
                confirmText="Delete Post"
                variant="danger"
            />
        </div>
    );
};

export default PostsPage;
