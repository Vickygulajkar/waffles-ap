import React, { useEffect, useState } from 'react';
import StatCard from '../components/common/StatCard';
import { Tag, Gift, Clock, XCircle, Ticket } from 'lucide-react';
import OffersList from '../components/OffersComponents/OffersList';
import OfferDetails from '../components/OffersComponents/OfferDetails';
import { offerService, type Offer } from '../services/offerService';

const Offers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [counts, setCounts] = useState({
    totalOffers: 0,
    activeOffers: 0,
    expiredInactive: 0,
    totalCouponsUsed: 0
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalOffers: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  });
  
  const [filters, setFilters] = useState({
    search: '',
    offerType: 'All Types',
    status: 'All Status',
    startDate: '',
    endDate: ''
  });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await offerService.getOffers(page, limit, filters);
      if (response.success) {
        setOffers(response.data);
        if (response.counts) setCounts(response.counts);
        if (response.pagination) setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchOffers();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [page, limit, filters.search, filters.offerType, filters.status, filters.startDate, filters.endDate]);

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Offers"
          value={counts.totalOffers.toString()}
          icon={<Tag className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-[#E85D21]"
          subtitle="All time"
        />
        
        <StatCard
          title="Active Offers"
          value={counts.activeOffers.toString()}
          icon={<Gift className="w-6 h-6" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
          subtitle="Currently active"
        />
        
        <StatCard
          title="Scheduled"
          value="0"
          icon={<Clock className="w-6 h-6" />}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-500"
          subtitle="Upcoming offers"
        />
        
        <StatCard
          title="Expired / Inactive"
          value={counts.expiredInactive.toString()}
          icon={<XCircle className="w-6 h-6" />}
          iconBgColor="bg-red-50"
          iconColor="text-red-500"
          subtitle="Not active"
        />

        <StatCard
          title="Total Coupons Used"
          value={counts.totalCouponsUsed.toString()}
          icon={<Ticket className="w-6 h-6" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
          subtitle="All time"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <div className="flex-1 w-full overflow-hidden">
          <OffersList 
            offers={offers} 
            loading={loading} 
            pagination={pagination}
            filters={filters}
            onFilterChange={(key, value) => {
              setFilters(prev => ({ ...prev, [key]: value }));
              setPage(1); // Reset page when filters change
            }}
            onPageChange={(p) => setPage(p)}
            onLimitChange={(l) => { setLimit(l); setPage(1); }}
            onAddOfferClick={() => { setSelectedOffer(null); setIsAddOfferOpen(true); }}
            onEditOfferClick={(offer) => { setSelectedOffer(offer); setIsAddOfferOpen(true); }}
          />
        </div>
        {isAddOfferOpen && (
          <div className="w-full xl:w-[400px] flex-shrink-0">
            <OfferDetails 
              offer={selectedOffer}
              onClose={() => { setIsAddOfferOpen(false); setSelectedOffer(null); }} 
              onSuccess={fetchOffers}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
