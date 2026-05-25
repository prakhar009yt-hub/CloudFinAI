'use client';

import { Bell, Search, User, Menu, LogOut, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

export function Header({ setSidebarOpen }: { setSidebarOpen?: (v: boolean) => void }) {
  const { user, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Budget Alert",
      description: "Projected spend exceeds limit.",
      type: "alert",
      time: "2h ago"
    },
    {
      id: 2,
      title: "Optimization Complete",
      description: "Detached 5 unused EBS volumes.",
      type: "success",
      time: "5h ago"
    },
    {
      id: 3,
      title: "New Recommendation",
      description: "Right-size 3 RDS instances.",
      type: "info",
      time: "1d ago"
    }
  ];

  return (
    <header className="h-16 flex items-center justify-between bg-transparent border-b border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 flex items-center">
        <button
          type="button"
          className="mr-4 md:hidden p-1.5 -ml-1.5 rounded-xl text-white/40 hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-[#00FFC2]"
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <form className="w-full flex md:ml-0" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">Search</label>
          <div className="relative w-full text-white/40 focus-within:text-white/60 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <Search className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-[#e0e0e0] placeholder-white/40 focus:outline-none focus:placeholder-white/60 focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
              placeholder="Search resources, costs, alerts..."
              type="search"
              name="search"
            />
          </div>
        </form>
      </div>
      <div className="ml-4 flex items-center md:ml-6 space-x-4">
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            className="relative bg-transparent p-1 rounded-xl text-white/40 hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FFC2] focus:ring-offset-[#050505]"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-1 right-1 block items-center justify-center h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#050505]" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden text-left"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white tracking-tight">Notifications</h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto w-full">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer flex gap-4 w-full"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {notification.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                        {notification.type === 'success' && <CheckCircle2 className="h-4 w-4 text-[#00FFC2]" />}
                        {notification.type === 'info' && <Info className="h-4 w-4 text-white/40" />}
                      </div>
                      <div className="flex-1 w-0">
                        <div className="flex items-start justify-between w-full">
                          <p className="text-sm font-medium text-white/90 truncate">{notification.title}</p>
                          <p className="text-[10px] text-white/40 whitespace-nowrap ml-2 mt-0.5">{notification.time}</p>
                        </div>
                        <p className="mt-1 text-sm text-white/50">{notification.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/10 text-center bg-white/5">
                  <button className="text-[10px] uppercase tracking-widest font-bold text-[#00FFC2] hover:text-[#00FFC2]/80 transition-colors">
                    Mark all as read
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {user && (
          <div className="relative flex items-center space-x-3">
            <button 
              onClick={signOut}
              className="text-xs font-semibold text-white/40 hover:text-white uppercase tracking-wider flex items-center"
            >
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Sign Out
            </button>
            <div className="max-w-xs bg-transparent rounded-xl flex items-center text-sm p-1 border border-white/10">
              <span className="sr-only">User profile</span>
              <div className="h-8 w-8 rounded-xl bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden flex items-center justify-center relative">
                {user.photoURL ? (
                  <Image src={user.photoURL} alt="User" fill className="object-cover" referrerPolicy="no-referrer" sizes="32px" />
                ) : (
                  <User className="h-5 w-5 text-white/40" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
