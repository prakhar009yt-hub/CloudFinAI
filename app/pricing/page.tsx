'use client';

import { Check, Star, Zap, CreditCardIcon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ToastProvider';

export default function PricingPage() {
  const { addToast } = useToast();
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Pricing & Plans</h1>
        <p className="mt-1 text-sm text-white/40">
          Upgrade your agent capabilities or renew your existing subscription.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 rounded-xl p-6 flex flex-col">
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white mb-2">Starter</h3>
            <div className="text-3xl font-light text-white mb-4">$0<span className="text-sm text-white/40">/mo</span></div>
            <p className="text-sm text-white/40 mb-6 flex-1">Up to $10k monitored spend. Basic insights and manual action execution.</p>
            <ul className="space-y-3 mb-8 text-sm text-white/60">
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> 24-hour sync intervals</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> Basic visualizations</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> Community support</li>
            </ul>
            <button className="w-full py-2 border border-white/10 text-[10px] uppercase font-bold text-white/60 rounded-xl hover:text-white transition-colors cursor-not-allowed opacity-50" disabled>
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white/5 backdrop-blur-xl shadow-2xl border border-[#00FFC2]/30 rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#00FFC2]/10 text-[#00FFC2] text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-sm">Recommended</div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-[#00FFC2] mb-2 flex items-center">
              <Star className="h-4 w-4 mr-2" /> Pro
            </h3>
            <div className="text-3xl font-light text-white mb-4">$249<span className="text-sm text-white/40">/mo</span></div>
            <p className="text-sm text-white/40 mb-6 flex-1">Up to $100k monitored spend. Autonomous execution and real-time alerts.</p>
            <ul className="space-y-3 mb-8 text-sm text-white/60">
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> 1-hour sync intervals</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> 1-click Auto-Apply actions</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> Slack/Teams integration</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> Standard support</li>
            </ul>
            <button 
              onClick={() => addToast('Redirecting to secure checkout...', 'info')}
              className="w-full py-2 bg-[#00FFC2]/10 border border-[#00FFC2]/20 text-[10px] uppercase font-bold text-[#00FFC2] rounded-xl hover:bg-[#00FFC2]/20 transition-colors flex items-center justify-center"
            >
              <Zap className="h-3 w-3 mr-2" /> Upgrade to Pro
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 rounded-xl p-6 flex flex-col">
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white mb-2">Enterprise</h3>
            <div className="text-3xl font-light text-white mb-4">Custom</div>
            <p className="text-sm text-white/40 mb-6 flex-1">Unlimited monitored spend. Full autonomous lifecycle management.</p>
            <ul className="space-y-3 mb-8 text-sm text-white/60">
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> Multi-cloud autonomous rules</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> Real-time anomaly detection</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> CI/CD native integration</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-[#00FFC2] mr-2" /> Dedicated account manager</li>
            </ul>
            <button 
              onClick={() => addToast('Opening sales inquiry form...')}
              className="w-full py-2 border border-white/10 text-[10px] uppercase font-bold text-white/60 rounded-xl hover:text-white transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h4 className="text-sm font-medium text-white">Subscription Management & Renewals</h4>
            <p className="text-sm text-white/40 mt-1 max-w-xl">Update your billing details, view past invoices, or renew your subscription proactively to ensure uninterrupted autonomous optimization.</p>
          </div>
          <Link href="/billing" className="flex items-center px-4 py-2 bg-white text-black border border-transparent text-[10px] uppercase font-bold rounded-xl hover:bg-white/80 transition-colors whitespace-nowrap">
            <CreditCardIcon className="h-3 w-3 mr-2" /> Manage Billing
          </Link>
        </div>
      </div>
    </div>
  );
}
