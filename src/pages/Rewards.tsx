import React from 'react';
import { Gift, Coins, Award, Wallet, Star } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import RewardsTabs from '../components/RewardsComponents/RewardsTabs';
import PointsHistoryTable from '../components/RewardsComponents/PointsHistoryTable';
import LoyaltySummary from '../components/RewardsComponents/LoyaltySummary';
import TopMembers from '../components/RewardsComponents/TopMembers';
import PointsExpiring from '../components/RewardsComponents/PointsExpiring';

const Rewards: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Members"
          value="1,254"
          icon={<Gift className="w-6 h-6" />}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-500"
          subtitle="All time"
        />
        <StatCard
          title="Total Points Issued"
          value="78,650"
          icon={<Coins className="w-6 h-6" />}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
          trend={{ value: '12.5%', isUp: true, text: 'from last month' }}
        />
        <StatCard
          title="Total Points Redeemed"
          value="32,480"
          icon={<Award className="w-6 h-6" />}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
          trend={{ value: '8.3%', isUp: true, text: 'from last month' }}
        />
        <StatCard
          title="Total Points Expired"
          value="2,150"
          icon={<Wallet className="w-6 h-6" />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
          trend={{ value: '5.6%', isUp: false, text: 'from last month' }}
        />
        <StatCard
          title="Total Amount Saved"
          value="₹1,24,300"
          icon={<Star className="w-6 h-6" />}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-500"
          subtitle="By customers"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Content */}
        <div className="flex-1 overflow-hidden">
          <RewardsTabs />
          <PointsHistoryTable />
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6 shrink-0">
          <LoyaltySummary />
          <TopMembers />
          <PointsExpiring />
        </div>
      </div>
    </div>
  );
};

export default Rewards;
