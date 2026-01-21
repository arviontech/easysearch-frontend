"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X, Upload } from "lucide-react";
import { IBanner } from "@/types/banner.types";

const bannerSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional().or(z.literal("")),
    altText: z.string().min(1, "Alt text is required"),
    description: z.string().optional().or(z.literal("")),
    linkUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    priority: z.number().min(1).max(10),
    isActive: z.boolean(),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

interface BannerFormProps {
    initialData?: IBanner | null;
    onSubmit: (data: BannerFormValues & { image: File | null }) => Promise<void>;
    isLoading: boolean;
    onCancel: () => void;
}

export const BannerForm = ({
    initialData,
    onSubmit,
    isLoading,
    onCancel
}: BannerFormProps) => {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<BannerFormValues>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            title: initialData?.title || "",
            subtitle: initialData?.subtitle || "",
            altText: initialData?.altText || "",
            description: initialData?.description || "",
            linkUrl: initialData?.linkUrl || "",
            priority: initialData?.priority || 1,
            isActive: initialData?.isActive ?? true,
        }
    });

    const isActive = watch("isActive");

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                subtitle: initialData.subtitle,
                altText: initialData.altText,
                description: initialData.description,
                linkUrl: initialData.linkUrl,
                priority: initialData.priority,
                isActive: initialData.isActive,
            });
            setImagePreview(initialData.imageUrl);
        } else {
            reset({
                title: "",
                subtitle: "",
                altText: "",
                description: "",
                linkUrl: "",
                priority: 1,
                isActive: true,
            });
            setImagePreview(null);
        }
        setImage(null);
    }, [initialData, reset]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFormSubmit = async (values: BannerFormValues) => {
        await onSubmit({ ...values, image });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        {...register("title")}
                        placeholder="Enter banner title"
                    />
                    {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                        id="subtitle"
                        {...register("subtitle")}
                        placeholder="Enter banner subtitle"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="altText">Alt Text *</Label>
                    <Input
                        id="altText"
                        {...register("altText")}
                        placeholder="Enter alt text for accessibility"
                    />
                    {errors.altText && <p className="text-xs text-red-500">{errors.altText.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Enter banner description (optional)"
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="linkUrl">Link URL</Label>
                    <Input
                        id="linkUrl"
                        {...register("linkUrl")}
                        placeholder="https://example.com"
                    />
                    {errors.linkUrl && <p className="text-xs text-red-500">{errors.linkUrl.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Input
                        id="priority"
                        type="number"
                        {...register("priority", { valueAsNumber: true })}
                        placeholder="Priority (1-10)"
                    />
                    {errors.priority && <p className="text-xs text-red-500">{errors.priority.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Banner Image {initialData ? "" : "*"}</Label>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="cursor-pointer"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Supported formats: JPG, PNG, WEBP. Recommended size: 1200x400px
                        </p>
                    </div>

                    {imagePreview && (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-20 h-14 object-cover rounded-md border shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImage(null);
                                    setImagePreview(null);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="isActive"
                        checked={isActive}
                        onCheckedChange={(checked) => setValue("isActive", checked)}
                    />
                    <Label htmlFor="isActive">Active</Label>
                </div>

                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-yellow-600 hover:bg-yellow-700 font-semibold"
                    >
                        {isLoading ? "Saving..." : initialData ? "Update Banner" : "Create Banner"}
                    </Button>
                </div>
            </div>
        </form>
    );
};
