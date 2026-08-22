import React from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/dashboard': return { title: 'Dashboard', breadcrumb: 'Dashboard' };
      case '/orders': return { title: 'Orders', breadcrumb: 'Dashboard > Orders' };
      case '/products': return { title: 'Products', breadcrumb: 'Dashboard > Products' };
      case '/categories': return { title: 'Categories', breadcrumb: 'Dashboard > Categories' };
      case '/offers': return { title: 'Offers & Coupons', breadcrumb: 'Dashboard > Offers & Coupons' };
      case '/daily-winner': return { title: 'Daily Winner ✨', breadcrumb: 'Dashboard > Daily Winner' };
      case '/rewards': return { title: 'Rewards & Loyalty', breadcrumb: 'Dashboard > Rewards & Loyalty' };
      case '/customers': return { title: 'Customers', breadcrumb: 'Dashboard > Customers' };
      case '/banners': return { title: 'Banners', breadcrumb: 'Dashboard > Banners' };
      case '/reports': return { title: 'Reports', breadcrumb: 'Dashboard > Reports' };
      default: return { title: 'Dashboard', breadcrumb: 'Dashboard' };
    }
  };

  const { title, breadcrumb } = getPageInfo();

  return (
    <header className="h-20 bg-transparent flex items-center justify-between px-8">
      {/* Left section: Title & Menu */}
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 text-[#3E2723] hover:bg-black/5 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#3E2723] leading-none">{title}</h1>
          <p className="text-xs font-semibold text-gray-500 mt-1">{breadcrumb}</p>
        </div>
      </div>

      {/* Right section: Search, Notifications, Profile */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search orders, customers..." 
            className="w-64 pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#E85D21] transition-shadow"
          />
          <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:shadow transition-shadow">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#E85D21] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
            8
          </span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-3 hover:bg-black/5 p-1.5 pr-2 rounded-xl transition-colors">
          <img 
            src="https://ui-avatars.com/api/?name=Admin&background=E85D21&color=fff" 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div className="flex items-center gap-3">
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-[#3E2723] leading-tight">Admin</p>
              <p className="text-[11px] text-gray-500 font-medium">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
