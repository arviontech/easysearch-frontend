import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "yellow" | "red" | "purple" | "cyan";
}

const colorClasses = {
  blue: "from-blue-500 to-blue-700",
  green: "from-green-500 to-green-700",
  yellow: "from-yellow-500 to-orange-600",
  red: "from-red-500 to-red-700",
  purple: "from-purple-500 to-purple-700",
  cyan: "from-cyan-500 to-cyan-700",
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "cyan",
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-cyan-50/60 backdrop-blur-md rounded-2xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-3">
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  trend.isPositive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-600 ml-2 font-medium">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.2)] border-2 border-white`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
