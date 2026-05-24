import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { SpendTimelineChart } from '@/components/dashboard/SpendTimelineChart';
import { ServicesBreakdownChart } from '@/components/dashboard/ServicesBreakdownChart';
import { RecommendationFeed } from '@/components/dashboard/RecommendationFeed';
import { CumulativeSavingsChart } from '@/components/dashboard/CumulativeSavingsChart';

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Infrastructure Dashboard</h1>
          <p className="mt-1 text-sm text-white/40">
            Continuous monitoring of your cloud footprint and costs.
          </p>
        </div>
        <div className="text-sm text-white/40">
          Data refreshed 2 minutes ago
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        
        <MetricsCards />
        
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:h-[350px]">
          <div className="lg:col-span-2">
            <SpendTimelineChart />
          </div>
          <div>
            <ServicesBreakdownChart />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 h-[500px]">
          <div className="lg:col-span-2 h-full">
            <RecommendationFeed />
          </div>
          <div className="h-full">
            <CumulativeSavingsChart />
          </div>
        </div>
        
      </div>
    </div>
  );
}
