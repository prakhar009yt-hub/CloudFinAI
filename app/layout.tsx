import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Cloud Cost Optimizer',
  description: 'AI agent for monitoring and optimizing cloud infrastructure costs.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-[#e0e0e0] bg-[#050505]" suppressHydrationWarning>
        <div className="flex h-screen bg-[#050505] overflow-hidden font-sans">
          <Sidebar />
          <div className="flex flex-col flex-1 w-0 overflow-hidden">
            <Header />
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
