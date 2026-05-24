import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/dashboard/AppShell';
import { AuthProvider } from '@/components/AuthProvider';
import { ToastProvider } from '@/components/ToastProvider';

export const metadata: Metadata = {
  title: 'Cloud Cost Optimizer',
  description: 'AI agent for monitoring and optimizing cloud infrastructure costs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505] text-[#e0e0e0] font-sans" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
