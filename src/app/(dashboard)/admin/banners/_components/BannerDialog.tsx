"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { BannerForm } from "./BannerForm";
import { IBanner } from "@/types/banner.types";

interface BannerDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    editingBanner: IBanner | null;
    onSubmit: (data: any) => Promise<void>;
    isLoading: boolean;
    onCancel: () => void;
}

export const BannerDialog = ({
    isOpen,
    onOpenChange,
    editingBanner,
    onSubmit,
    isLoading,
    onCancel
}: BannerDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {editingBanner ? "Edit Banner" : "Create New Banner"}
                    </DialogTitle>
                </DialogHeader>

                <BannerForm
                    initialData={editingBanner}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    onCancel={onCancel}
                />
            </DialogContent>
        </Dialog>
    );
};
