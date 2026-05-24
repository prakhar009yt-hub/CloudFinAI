'use client';

import { LayoutDashboard, Server, CreditCard, Activity, Settings, HelpCircle, Bot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Resources', href: '/resources', icon: Server },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Agent Activity', href: '/activity', icon: Activity },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-[#090909] border-r border-white/5">
      <div className="flex items-center justify-center h-16 border-b border-white/5 px-4">
        <Bot className="w-6 h-6 text-[#00FFC2] mr-2" />
        <span className="text-lg font-semibold text-white tracking-tight">CloudFinAI</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
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
      
      <div className="p-4 border-t border-white/5 space-y-1">
        <Link href="/settings" className={`group flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${pathname === '/settings' ? 'bg-[#00FFC2]/10 text-[#00FFC2]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <Settings className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${pathname === '/settings' ? 'text-[#00FFC2]' : 'text-white/40 group-hover:text-white/80'}`} />
          Settings
        </Link>
        <Link href="/support" className={`group flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${pathname === '/support' ? 'bg-[#00FFC2]/10 text-[#00FFC2]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <HelpCircle className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${pathname === '/support' ? 'text-[#00FFC2]' : 'text-white/40 group-hover:text-white/80'}`} />
          Support
        </Link>
      </div>
    </div>
  );
}
