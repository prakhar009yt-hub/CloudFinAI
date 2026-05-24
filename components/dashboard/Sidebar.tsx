'use client';

import { LayoutDashboard, Server, CreditCard, Activity, Settings, HelpCircle, Bot, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export function Sidebar({ isOpen, setIsOpen }: { isOpen?: boolean; setIsOpen?: (v: boolean) => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (setIsOpen) setIsOpen(false);
  }, [pathname, setIsOpen]);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Resources', href: '/resources', icon: Server },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Agent Activity', href: '/activity', icon: Activity },
    { name: 'Pricing & Plans', href: '/pricing', icon: ShoppingCart },
  ];

  const SidebarContent = (
    <>
      <div className="flex items-center justify-between h-16 border-b border-white/5 px-4 shrink-0">
        <div className="flex items-center">
          <Bot className="w-6 h-6 text-[#00FFC2] mr-2" />
          <span className="text-lg font-semibold text-white tracking-tight">CloudFinAI</span>
        </div>
        <button 
          className="md:hidden p-1 text-white/40 hover:text-white"
          onClick={() => setIsOpen && setIsOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                  isActive
                    ? 'bg-[#00FFC2]/10 text-[#00FFC2]'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon
                  className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${
                    isActive ? 'text-[#00FFC2]' : 'text-white/40 group-hover:text-white/80'
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-white/5 space-y-1 shrink-0">
        <Link href="/settings" prefetch={true} className={`group flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${pathname === '/settings' ? 'bg-[#00FFC2]/10 text-[#00FFC2]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <Settings className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${pathname === '/settings' ? 'text-[#00FFC2]' : 'text-white/40 group-hover:text-white/80'}`} />
          Settings
        </Link>
        <Link href="/support" prefetch={true} className={`group flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${pathname === '/support' ? 'bg-[#00FFC2]/10 text-[#00FFC2]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <HelpCircle className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${pathname === '/support' ? 'text-[#00FFC2]' : 'text-white/40 group-hover:text-white/80'}`} />
          Support
        </Link>
      </div>
    </>
  );

  return (
    <>
      <div className="hidden md:flex flex-col w-64 h-screen bg-[#090909] border-r border-white/5 shrink-0">
        {SidebarContent}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 md:hidden"
              onClick={() => setIsOpen && setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-[#090909] border-r border-white/5 flex flex-col md:hidden shadow-2xl"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
