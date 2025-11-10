"use client";

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { removeNotification } from "@/lib/redux/slices/uiSlice";

const NotificationCenter = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    for (const notification of notifications) {
      const age = Date.now() - notification.timestamp;
      if (age < 5000) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, 5000 - age);
        return () => clearTimeout(timer);
      }
    }
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section
      className="fixed top-20 right-4 z-50 space-y-2 max-w-sm"
      aria-label="Notifications"
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getColorClasses(notification.type)} p-4 rounded-lg shadow-lg flex items-start gap-3 animate-in slide-in-from-right duration-300`}
          role="alert"
          aria-live="polite"
        >
          <div className="flex-shrink-0">{getIcon(notification.type)}</div>
          <p className="flex-1 text-sm font-medium">{notification.message}</p>
          <button
            type="button"
            onClick={() => dispatch(removeNotification(notification.id))}
            className="flex-shrink-0 hover:opacity-80 transition"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </section>
  );
};

export default NotificationCenter;
