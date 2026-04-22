"use client";

import { getNotifications, getUnreadCount, markAllRead, markNotificationRead } from "@/services/notification/notificationActions";
import { Bell } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const [notifRes, countRes] = await Promise.all([getNotifications(), getUnreadCount()]);
    setNotifications(notifRes?.data || []);
    setUnread(countRes?.data?.unreadCount || 0);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMarkRead = async (id: string) => {
    await markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
    setUnread((p) => Math.max(0, p - 1));
  };

  const handleMarkAll = async () => {
    await markAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnread(0);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 rounded-2xl bg-slate-100 hover:bg-violet-100 flex items-center justify-center transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-black rounded-full flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 z-50 overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-black text-slate-800 text-sm">Notifications</h3>
            {unread > 0 && (
              <button onClick={handleMarkAll} className="text-xs text-violet-600 font-bold hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.isRead && handleMarkRead(n.id)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${!n.isRead ? "bg-violet-50/60" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.isRead ? "bg-violet-500" : "bg-slate-200"}`} />
                    <div>
                      <p className="text-xs font-black text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                      <p className="text-xs text-slate-300 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
