import React, { useState } from 'react';
import { Image as ImageIcon, CheckCircle, Clock, XCircle, CalendarDays } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import BannersTable from '../components/BannersComponents/BannersTable';
import BannerFormPane from '../components/BannersComponents/BannerFormPane';
import { bannerService, type Banner } from '../services/bannerService';

const Banners: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [banners, setBanners] = useState<Banner[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [counts, setCounts] = useState({
    totalBanners: 0,
    activeBanners: 0,
    expiredInactive: 0
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalBanners: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  });
  
  const [filters, setFilters] = useState({
    search: '',
    bannerType: 'All Types',
    status: 'All Status'
  });

  const fetchBanners = async () => {
    try {
      const res = await bannerService.getBanners(page, limit, filters);
      if (res.success && res.data) {
        setBanners(res.data);
        if (res.counts) setCounts(res.counts);
        if (res.pagination) setPagination(res.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch banners:", err);
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBanners();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [page, limit, filters.search, filters.bannerType, filters.status]);

  const handleAddBanner = () => {
    setEditingBanner(null);
    setShowForm(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBanner(null);
  };

  // Default to showing the form for the mockup as in screenshot
  // Wait, let's just make it initially true with no banner selected to match screenshot "Add New Banner" state
  // I will use an effect or just initial state true.
  const [isFormOpen, setIsFormOpen] = useState(true);
  
  const activePane = showForm || isFormOpen;

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Page Header (Title + Date Picker) */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Banners</h1>
          <p className="text-sm text-gray-500">Dashboard &gt; Banners</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
          <span className="text-sm font-semibold text-gray-600">21 Aug 2025 - 21 Sep 2025</span>
          <CalendarDays className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Banners"
          value={counts.totalBanners.toString()}
          icon={<ImageIcon className="w-6 h-6" />}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
          subtitle="All time"
        />
        <StatCard
          title="Active Banners"
          value={counts.activeBanners.toString()}
          icon={<CheckCircle className="w-6 h-6" />}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
          subtitle="Currently live"
        />
        <StatCard
          title="Scheduled Banners"
          value="0"
          icon={<Clock className="w-6 h-6" />}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-500"
          subtitle="Upcoming"
        />
        <StatCard
          title="Expired / Inactive"
          value={counts.expiredInactive.toString()}
          icon={<XCircle className="w-6 h-6" />}
          iconBgColor="bg-red-100"
          iconColor="text-red-500"
          subtitle="Past banners"
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Left Column - Main Content */}
        <div className="flex-1 w-full overflow-hidden">
          <BannersTable 
            banners={banners}
            pagination={pagination}
            filters={filters}
            onFilterChange={(key, value) => {
              setFilters(prev => ({ ...prev, [key]: value }));
              setPage(1);
            }}
            onPageChange={(p) => setPage(p)}
            onLimitChange={(l) => { setLimit(l); setPage(1); }}
            onAddBanner={() => { setIsFormOpen(true); handleAddBanner(); }} 
            onEditBanner={(banner) => { setIsFormOpen(true); handleEditBanner(banner); }} 
          />
        </div>

        {/* Right Column - Banner Form Pane */}
        {activePane && (
          <div className="w-full xl:w-[360px] shrink-0 sticky top-4">
            <BannerFormPane 
              banner={editingBanner} 
              onClose={() => { setIsFormOpen(false); handleCloseForm(); }} 
              onSuccess={fetchBanners}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banners;
