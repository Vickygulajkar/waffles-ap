import React from 'react';
import { Trophy, ShieldCheck, Gift, Calendar } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import DailyWinnerTabs from '../components/DailyWinnerComponents/DailyWinnerTabs';
import EligibleOrdersTable from '../components/DailyWinnerComponents/EligibleOrdersTable';
import WinnerCard from '../components/DailyWinnerComponents/WinnerCard';
import RewardDetails from '../components/DailyWinnerComponents/RewardDetails';
import SelectionRules from '../components/DailyWinnerComponents/SelectionRules';
import RecentWinners from '../components/DailyWinnerComponents/RecentWinners';

const DailyWinner: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Winners"
          value="365"
          icon={<Trophy className="w-6 h-6" />}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
          subtitle="All time"
        />
        <StatCard
          title="Rewards Given"
          value="₹1,24,500"
          icon={<ShieldCheck className="w-6 h-6" />}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
          subtitle="Total value"
        />
        <StatCard
          title="This Month Winners"
          value="28"
          icon={<Gift className="w-6 h-6" />}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-500"
          subtitle="August 2025"
        />
        <StatCard
          title="Today's Eligible Orders"
          value="142"
          icon={<Calendar className="w-6 h-6" />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
          subtitle="21 Aug 2025"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Content */}
        <div className="flex-1">
          <DailyWinnerTabs />

          {/* Notice Banner */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center gap-3 mb-8">
            <Gift className="w-5 h-5 text-orange-500 shrink-0" />
            <p className="text-sm font-medium text-orange-900">
              Winner is selected from all completed orders of the day as per your reward rules.
            </p>
          </div>

          <EligibleOrdersTable />
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <WinnerCard />
          <RewardDetails />
          <SelectionRules />
          <RecentWinners />
        </div>
      </div>
    </div>
  );
};

export default DailyWinner;
