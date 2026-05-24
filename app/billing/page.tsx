'use client';

import { CreditCard, Download, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  const invoices = [
    { id: 'INV-2026-05', date: 'May 01, 2026', plan: 'Pro', amount: 249, status: 'Paid' },
    { id: 'INV-2026-04', date: 'Apr 01, 2026', plan: 'Pro', amount: 249, status: 'Paid' },
    { id: 'INV-2026-03', date: 'Mar 01, 2026', plan: 'Pro', amount: 249, status: 'Paid' },
    { id: 'INV-2026-02', date: 'Feb 01, 2026', plan: 'Starter', amount: 0, status: 'Paid' },
    { id: 'INV-2026-01', date: 'Jan 01, 2026', plan: 'Starter', amount: 0, status: 'Paid' },
    { id: 'INV-2025-12', date: 'Dec 01, 2025', plan: 'Starter', amount: 0, status: 'Paid' },
  ];

  const exportToCSV = () => {
    const headers = ['Date', 'Invoice ID', 'Plan', 'Amount', 'Status'];
    const csvRows = [headers.join(',')];

    for (const row of invoices) {
      const values = [
        `"${row.date}"`,
        `"${row.id}"`,
        `"${row.plan}"`,
        row.amount,
        `"${row.status}"`
      ];
      csvRows.push(values.join(','));
    }

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'invoices.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Header section w/ breadcrumb */}
      <nav className="flex items-center text-xs text-white/40 mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
        <ChevronRight className="h-3 w-3 mx-2" />
        <span className="text-white">Billing</span>
      </nav>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Billing & Cost Management</h1>
          <p className="mt-1 text-sm text-white/40">
            Invoices, budgets, and cost allocation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Plan Summary */}
        <div className="bg-[#111] border border-[#00FFC2]/30 rounded-sm p-6 relative col-span-1 md:col-span-2 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-[#00FFC2] flex items-center">
              <CreditCard className="h-4 w-4 mr-2" /> Current Plan: Pro
            </h3>
            <span className="bg-[#00FFC2]/10 text-[#00FFC2] text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">Active</span>
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-4xl font-light text-white">$249</span>
            <span className="text-sm text-white/40 ml-2">/ month</span>
          </div>
          <p className="text-sm text-white/60 mb-6 max-w-md">
            Your next billing cycle will begin on June 01, 2026.
          </p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-base font-semibold text-white">Invoice History</h2>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center px-3 py-1.5 border border-white/10 shadow-sm text-[10px] uppercase tracking-widest font-bold rounded-sm text-white bg-white/5 hover:bg-white/10 focus:outline-none transition-colors"
        >
          <Download className="h-3 w-3 mr-2" />
          Export CSV
        </button>
      </div>
      <div className="bg-[#090909] border border-white/5 rounded-sm overflow-hidden">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-[#111]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-white/40">
                Date
              </th>
              <th scope="col" className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-white/40">
                Plan
              </th>
              <th scope="col" className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-medium text-white/40">
                Amount
              </th>
              <th scope="col" className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-medium text-white/40">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#090909]">
            {invoices.map((invoice, index) => (
              <tr key={invoice.id} className="hover:bg-[#111] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-white/20 mr-3 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-white">{invoice.date}</div>
                      <div className="text-[10px] text-white/40 font-mono mt-0.5">{invoice.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-widest font-medium ${
                    invoice.plan === 'Pro' ? 'bg-[#00FFC2]/10 text-[#00FFC2]' : 'bg-white/5 text-white/60'
                  }`}>
                    {invoice.plan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => {
                      const headers = ['Date', 'Invoice ID', 'Plan', 'Amount', 'Status'];
                      const csvRows = [headers.join(',')];
                      csvRows.push([`"${invoice.date}"`, `"${invoice.id}"`, `"${invoice.plan}"`, invoice.amount, `"${invoice.status}"`].join(','));
                      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                      link.setAttribute('download', `${invoice.id}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="inline-flex items-center text-white/60 hover:text-white transition-colors group"
                  >
                    <Download className="h-4 w-4 mr-1.5 group-hover:text-[#00FFC2] transition-colors" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
