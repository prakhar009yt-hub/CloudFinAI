'use client';

import { Server, Zap, Search, Filter, MoreVertical, Play, Square, RefreshCw, Layers } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import { infrastructureData } from '@/lib/mock-data';
import { useState } from 'react';

export default function ResourcesPage() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredResources = infrastructureData.resourceInstances.filter(res => 
    res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    res.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Active Resources</h1>
            <p className="mt-1 text-sm text-white/40">
              Infrastructure topology and current utilization metrics.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button 
              onClick={() => addToast('Resource scan initiated. This may take a few minutes.', 'info')}
              className="px-4 py-2 border border-white/10 text-[10px] uppercase font-bold text-[#00FFC2] rounded-xl hover:bg-[#00FFC2]/10 transition-colors flex items-center bg-black/30 backdrop-blur-2xl border-white/10"
            >
              <RefreshCw className="h-3 w-3 mr-2" /> Force Resync
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 p-4 rounded-xl">
            <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Total Instances</div>
            <div className="text-2xl font-light text-white">{infrastructureData.resources.totalInstances}</div>
          </div>
          <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 p-4 rounded-xl">
            <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Underutilized</div>
            <div className="text-2xl font-light text-yellow-500">{infrastructureData.resources.underutilizedInstances}</div>
          </div>
          <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 p-4 rounded-xl">
            <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Unattached Volumes</div>
            <div className="text-2xl font-light text-red-400">{infrastructureData.resources.unattachedVolumes}</div>
          </div>
          <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 p-4 rounded-xl">
            <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Active DBs</div>
            <div className="text-2xl font-light text-white">{infrastructureData.resources.activeDatabases}</div>
          </div>
        </div>

        {/* Resources Table */}
        <div className="mt-8 bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-white/40" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 backdrop-blur-xl shadow-2xl text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#00FFC2]/50 focus:border-[#00FFC2]/50 sm:text-sm transition-colors"
              />
            </div>
            <button className="px-4 py-2 border border-white/10 text-[10px] uppercase font-bold text-white/60 rounded-xl hover:text-white transition-colors bg-white/5 backdrop-blur-xl shadow-2xl flex items-center self-start sm:self-auto">
              <Filter className="h-3 w-3 mr-2" /> Filter
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5 backdrop-blur-xl shadow-2xl">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Resource</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Type / Region</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Cost/Hr</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Utilization</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black/30 backdrop-blur-2xl border-white/10 divide-y divide-white/5">
                {filteredResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 rounded-xl flex items-center justify-center">
                          {resource.type === 'Compute' && <Server className="h-4 w-4 text-white/60" />}
                          {resource.type === 'Database' && <Layers className="h-4 w-4 text-white/60" />}
                          {resource.type === 'Cache' && <Zap className="h-4 w-4 text-white/60" />}
                          {resource.type === 'Storage' && <Server className="h-4 w-4 text-white/60" />}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{resource.name}</div>
                          <div className="text-xs text-white/40 font-mono">{resource.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/80">{resource.type}</div>
                      <div className="text-xs text-white/40">{resource.region}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-[10px] leading-4 font-semibold uppercase tracking-widest rounded-xl ${
                        resource.status === 'Running' ? 'bg-[#00FFC2]/10 text-[#00FFC2]' : 
                        resource.status === 'Stopped' ? 'bg-white/10 text-white/60' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {resource.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                      ${resource.costPerHour.toFixed(3)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-white/5 backdrop-blur-xl shadow-2xl rounded-full h-1.5 mr-2">
                          <div 
                            className={`h-1.5 rounded-full ${resource.utilization > 70 ? 'bg-red-400' : resource.utilization < 20 ? 'bg-yellow-400' : 'bg-[#00FFC2]'}`} 
                            style={{ width: `${resource.utilization}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">{resource.utilization}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {resource.status === 'Running' ? (
                          <button 
                            onClick={() => addToast(`Stopping ${resource.name}...`, 'info')}
                            className="text-white/40 hover:text-white transition-colors" title="Stop">
                            <Square className="h-4 w-4" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => addToast(`Starting ${resource.name}...`, 'info')}
                            className="text-white/40 hover:text-[#00FFC2] transition-colors" title="Start">
                            <Play className="h-4 w-4" />
                          </button>
                        )}
                        <button className="text-white/40 hover:text-white transition-colors" title="More">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredResources.length === 0 && (
              <div className="p-8 text-center text-white/40 text-sm">
                No resources found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
