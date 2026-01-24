import React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading?: boolean;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isLoading = false,
    confirmText = "Delete",
    cancelText = "Cancel",
    variant = "danger",
}: ConfirmationModalProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case "danger":
                return {
                    iconBg: "bg-rose-50",
                    iconColor: "text-rose-500",
                    buttonBg: "bg-rose-500 hover:bg-rose-600",
                    buttonShadow: "shadow-rose-500/20",
                };
            case "warning":
                return {
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    buttonBg: "bg-amber-500 hover:bg-amber-600",
                    buttonShadow: "shadow-amber-500/20",
                };
            default:
                return {
                    iconBg: "bg-cyan-50",
                    iconColor: "text-[#008ca1]",
                    buttonBg: "bg-[#008ca1] hover:bg-[#007a8c]",
                    buttonShadow: "shadow-[#008ca1]/20",
                };
        }
    };

    const styles = getVariantStyles();

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
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-md w-full max-w-sm rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(255,255,255,0.5)] border border-white overflow-hidden"
                        >
                            <div className="p-6 text-center">
                                {/* Icon */}
                                <div className={`w-16 h-16 ${styles.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform`}>
                                    <AlertTriangle className={`w-8 h-8 ${styles.iconColor}`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">{message}</p>

                                {/* Buttons */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-colors active:scale-95 disabled:opacity-50"
                                    >
                                        {cancelText}
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        disabled={isLoading}
                                        className={`flex-[1.5] px-4 py-3 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 ${styles.buttonBg} ${styles.buttonShadow}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <span>{confirmText}</span>
                                        )}
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
