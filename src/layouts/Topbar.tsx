import { Search, Bell, Sun } from 'lucide-react'

function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 w-72 transition hover:border-slate-300">
        <Search className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
        <span className="flex-1 text-[13px] text-slate-400">Search anything...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
          ⌘K
        </kbd>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700">
          <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700">
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 ml-1">
          <img
            src="https://ui-avatars.com/api/?name=BC&background=2563eb&color=fff&size=32&font-size=0.4&bold=true"
            alt="Profile"
            className="h-9 w-9 rounded-xl"
          />
        </div>
      </div>
    </header>
  )
}

export default Topbar
