import React from 'react';
import StatCard from '../components/common/StatCard';
import { Tag, Gift, Clock, XCircle, Ticket } from 'lucide-react';
import OffersList from '../components/OffersComponents/OffersList';
import OfferDetails from '../components/OffersComponents/OfferDetails';

const Offers: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Offers"
          value="24"
          icon={<Tag className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-[#E85D21]"
          subtitle="All time"
        />
        
        <StatCard
          title="Active Offers"
          value="12"
          icon={<Gift className="w-6 h-6" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
          subtitle="Currently active"
        />
        
        <StatCard
          title="Scheduled"
          value="5"
          icon={<Clock className="w-6 h-6" />}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-500"
          subtitle="Upcoming offers"
        />
        
        <StatCard
          title="Expired / Inactive"
          value="7"
          icon={<XCircle className="w-6 h-6" />}
          iconBgColor="bg-red-50"
          iconColor="text-red-500"
          subtitle="Not active"
        />

        <StatCard
          title="Total Coupons Used"
          value="1,842"
          icon={<Ticket className="w-6 h-6" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
          subtitle="All time"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <div className="flex-1 w-full overflow-hidden">
          <OffersList />
        </div>
        <div className="w-full xl:w-[400px] flex-shrink-0">
          <OfferDetails />
        </div>
      </div>
    </div>
  );
};

export default Offers;
