import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  LayoutGrid,
  Folder,
  Tag,
  Trophy,
  Star,
  Users,
  Bell,
  Image as ImageIcon,
  BarChart2,
  Settings,
  Headphones
} from 'lucide-react';
import logo from '../assets/image.png';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Orders', path: '/orders', icon: ShoppingBag },
  { name: 'Products', path: '/products', icon: LayoutGrid },
  { name: 'Categories', path: '/categories', icon: Folder },
  { name: 'Offers & Coupons', path: '/offers', icon: Tag },
  { name: 'Daily Winner', path: '/daily-winner', icon: Trophy },
  { name: 'Rewards & Loyalty', path: '/rewards', icon: Star },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Banners', path: '/banners', icon: ImageIcon },
  { name: 'Reports', path: '/reports', icon: BarChart2 },
  { name: 'Notifications', path: '/notifications', icon: Bell, locked: true },
  { name: 'Settings', path: '/settings', icon: Settings, locked: true },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen bg-[#2D1A13] text-white flex flex-col flex-shrink-0 overflow-y-auto scrollbar-hide relative z-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waffle" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0,20 h40 M20,0 v40" stroke="#E85D21" strokeWidth="2" fill="none" />
              <rect x="2" y="2" width="16" height="16" stroke="#E85D21" strokeWidth="1" fill="none" rx="2" />
              <rect x="22" y="2" width="16" height="16" stroke="#E85D21" strokeWidth="1" fill="none" rx="2" />
              <rect x="2" y="22" width="16" height="16" stroke="#E85D21" strokeWidth="1" fill="none" rx="2" />
              <rect x="22" y="22" width="16" height="16" stroke="#E85D21" strokeWidth="1" fill="none" rx="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waffle)" />
        </svg>
      </div>

      {/* Logo Area */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <img src={logo} alt="WaffleNest Logo" className="h-12 object-contain mb-2" />
        <span className="text-[10px] tracking-[0.2em] font-semibold text-[#D4C3B3] uppercase">Admin Panel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.name}
              onClick={() => !item.locked && navigate(item.path)}
              title={item.locked ? 'under development' : ''}
              disabled={item.locked}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${isActive
                ? 'bg-[#E85D21] text-white shadow-md'
                : item.locked
                  ? 'text-gray-400 cursor-not-allowed opacity-50'
                  : 'text-white hover:bg-[#3D261C]'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.locked ? 'text-gray-400' : 'text-[#E85D21]'}`} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Support Card */}
      <div className="p-4 mt-auto">
        <div className="bg-[#3A2218] border border-[#4A2F22] rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:bg-[#43271D] transition-colors">
          <Headphones className="w-8 h-8 text-[#E85D21]" />
          <div>
            <p className="text-xs font-semibold text-white">Need Help?</p>
            <p className="text-[10px] text-[#D4C3B3]">Contact Support</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
