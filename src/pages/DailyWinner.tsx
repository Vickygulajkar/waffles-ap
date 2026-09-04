import React, { useState, useEffect } from 'react';
import { Trophy, ShieldCheck, Gift, Calendar } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import EligibleOrdersTable from '../components/DailyWinnerComponents/EligibleOrdersTable';
import WinnerCard from '../components/DailyWinnerComponents/WinnerCard';
// import RewardDetails from '../components/DailyWinnerComponents/RewardDetails';
import SelectionRules from '../components/DailyWinnerComponents/SelectionRules';
// import RecentWinners from '../components/DailyWinnerComponents/RecentWinners';
import { dailyWinnerService } from '../services/dailyWinnerService';
import toast from 'react-hot-toast';

const DailyWinner: React.FC = () => {
  const [summary, setSummary] = useState<any>({
    totalWinners: 0,
    rewardsGiven: 0,
    thisMonthWinners: 0,
    todaysOrders: 0
  });
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await dailyWinnerService.getAllWinners();
      if (res.success) {
        setSummary(res.data.summary || {});
        setWinners(res.data.winners || []);
      } else {
        toast.error(res.message || 'Failed to fetch data');
      }
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const currentMonth = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Winners"
          value={summary.totalWinners.toString()}
          icon={<Trophy className="w-6 h-6" />}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
          subtitle="All time"
        />
        <StatCard
          title="Rewards Given"
          value={`₹${summary.rewardsGiven.toLocaleString()}`}
          icon={<ShieldCheck className="w-6 h-6" />}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
          subtitle="Total value"
        />
        <StatCard
          title="This Month Winners"
          value={summary.thisMonthWinners.toString()}
          icon={<Gift className="w-6 h-6" />}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-500"
          subtitle={currentMonth}
        />
        <StatCard
          title="Today's Eligible Orders"
          value={summary.todaysOrders.toString()}
          icon={<Calendar className="w-6 h-6" />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
          subtitle={today}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Content */}
        <div className="flex-1">

          {/* Notice Banner */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center gap-3 mb-8">
            <Gift className="w-5 h-5 text-orange-500 shrink-0" />
            <p className="text-sm font-medium text-orange-900">
              Winner is selected from all completed orders of the day as per your reward rules.
            </p>
          </div>

          <EligibleOrdersTable winners={winners} loading={loading} onRefresh={fetchData} />
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <WinnerCard />
          {/* <RewardDetails /> */}
          <SelectionRules />
          {/* <RecentWinners /> */}
        </div>
      </div>
    </div>
  );
};

export default DailyWinner;
