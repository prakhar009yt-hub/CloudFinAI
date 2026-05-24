import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between bg-[#050505] border-b border-white/5 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 flex">
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
        <button
          type="button"
          className="bg-transparent p-1 rounded-sm text-white/40 hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FFC2]"
        >
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="relative">
          <button className="max-w-xs bg-transparent rounded-sm flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FFC2] p-1 border border-white/10">
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-sm bg-[#111] flex items-center justify-center">
              <User className="h-5 w-5 text-white/40" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
