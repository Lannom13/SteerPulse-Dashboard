// File: /src/components/Topbar.tsx
import { useState } from 'react';
import { Bell, Sparkles } from 'lucide-react';

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showInsights, setShowInsights] = useState<boolean>(false);

  // Dummy alert logic (eventually tied to Supabase notifications/insights)
  const hasAlerts = true;
  const hasInsights = true;

  return (
    <div className="flex items-center justify-end space-x-4 px-4 py-2 border-b border-gray-800 relative">
      {/* Notification Bell */}
      <div
        className="relative cursor-pointer"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="text-white hover:text-brand-500" />
        {hasAlerts && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        )}
      </div>

      {/* Insights Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setShowInsights(!showInsights)}
      >
        <Sparkles className="text-white hover:text-brand-500" />
        {hasInsights && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        )}
      </div>

      {/* Slide-out Panels */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-gray-900 border border-gray-700 p-4 rounded-lg z-50 shadow-xl">
          <h2 className="text-white text-lg font-semibold mb-2">Notifications</h2>
          <p className="text-sm text-gray-400">
            You have 2 upcoming bills and a new feature update 🎉
          </p>
        </div>
      )}

      {showInsights && (
        <div className="absolute top-16 right-4 w-96 bg-gray-900 border border-gray-700 p-4 rounded-lg z-50 shadow-xl">
          <h2 className="text-white text-lg font-semibold mb-2">SteerPulse Insights</h2>
          <p className="text-sm text-gray-400">
            Your dining budget is up 32% compared to last month. Consider reallocating $100 from entertainment.
          </p>
        </div>
      )}
    </div>
  );
}
