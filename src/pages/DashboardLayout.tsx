import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Key, Coins, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/playground', label: 'Chat Playground', icon: MessageSquare },
  { path: '/keys', label: 'API Keys', icon: Key },
  { path: '/credits', label: 'Credits', icon: Coins },
  { path: '/usage', label: 'Usage', icon: BarChart3 },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link to="/dashboard" className="block px-5 py-5 border-b border-[#1E293B]/40">
        <span className="font-display font-bold text-xl tracking-wider">
          IND<span className="text-brand-orange">O</span>S
        </span>
      </Link>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-[#0B1120] text-white border-l-2 border-brand-orange'
                  : 'text-gray-400 hover:text-white hover:bg-[#0B1120] border-l-2 border-transparent'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="font-sans">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-5 py-4 border-t border-[#1E293B]/40 space-y-3">
        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#060913] flex">
      {/* Desktop sidebar — fixed */}
      <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 bg-[#090F1E] border-r border-[#1E293B]/40 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#090F1E] border-b border-[#1E293B]/40 px-4 py-3 flex items-center justify-between">
        <span className="font-display font-bold text-lg tracking-wider">
          IND<span className="text-brand-orange">O</span>S
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-400 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#090F1E] border-r border-[#1E293B]/40 pt-14 z-40">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 pt-14 lg:pt-0 p-6 lg:p-8 min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
