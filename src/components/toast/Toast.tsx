"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { removeNotification } from "@/lib/redux/features/ui/uiSlice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    notifications.forEach((notification) => {
      const timeSinceCreation = Date.now() - notification.timestamp;
      const remainingTime = 5000 - timeSinceCreation;

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, remainingTime);

        return () => clearTimeout(timer);
      } else {
        dispatch(removeNotification(notification.id));
      }
    });
  }, [notifications, dispatch]);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 border-green-500",
          icon: "text-green-600",
          text: "text-green-800",
        };
      case "error":
        return {
          bg: "bg-red-50 border-red-500",
          icon: "text-red-600",
          text: "text-red-800",
        };
      case "warning":
        return {
          bg: "bg-yellow-50 border-yellow-500",
          icon: "text-yellow-600",
          text: "text-yellow-800",
        };
      case "info":
        return {
          bg: "bg-blue-50 border-blue-500",
          icon: "text-blue-600",
          text: "text-blue-800",
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-500",
          icon: "text-gray-600",
          text: "text-gray-800",
        };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => {
          const colors = getColors(notification.type);
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20, x: 100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className={`${colors.bg} border-l-4 rounded-lg shadow-lg p-4 min-w-[320px] max-w-md pointer-events-auto`}
            >
              <div className="flex items-start gap-3">
                <div className={colors.icon}>{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <p className={`${colors.text} text-sm font-medium`}>
                    {notification.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeNotification(notification.id))}
                  className={`${colors.icon} hover:opacity-70 transition`}
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
