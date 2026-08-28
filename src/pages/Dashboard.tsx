import React from 'react';
import StatCard from '../components/common/StatCard';
import { Lock, IndianRupee, Users, Trophy } from 'lucide-react';
import OrderSummary from '../components/DashboardComponents/OrderSummary';
import SalesOverview from '../components/DashboardComponents/SalesOverview';
import PopularProducts from '../components/DashboardComponents/PopularProducts';
import RecentOrders from '../components/DashboardComponents/RecentOrders';
import { dashboardService, type DashboardStats } from '../services/dashboardService';

const Dashboard: React.FC = () => {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);

  React.useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await dashboardService.getDashboardStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats', error);
    }
  };

  if (!stats) {
    return <div className="flex h-full items-center justify-center p-10"><p className="text-gray-500 font-semibold">Loading dashboard...</p></div>;
  }

  return (
    <div className="flex flex-col gap-6 pb-8">

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={stats.topLevelStats.totalOrders.value.toString()}
          icon={<Lock className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-[#E85D21]"
          trend={{
            value: `${Math.abs(stats.topLevelStats.totalOrders.growth)}%`,
            isUp: stats.topLevelStats.totalOrders.growth >= 0,
            text: 'vs last week'
          }}
        />

        <StatCard
          title="Total Sales"
          value={`₹${stats.topLevelStats.totalSales.value.toLocaleString()}`}
          icon={<IndianRupee className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-400"
          trend={{
            value: `${Math.abs(stats.topLevelStats.totalSales.growth)}%`,
            isUp: stats.topLevelStats.totalSales.growth >= 0,
            text: 'vs last week'
          }}
        />

        <StatCard
          title="Total Customers"
          value={stats.topLevelStats.totalCustomers.value.toString()}
          icon={<Users className="w-6 h-6" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
          trend={{
            value: `${Math.abs(stats.topLevelStats.totalCustomers.growth)}%`,
            isUp: stats.topLevelStats.totalCustomers.growth >= 0,
            text: 'vs last week'
          }}
        />

        <StatCard
          title="Today's Winner"
          value={stats.topLevelStats.todaysWinner?.name || 'No winner yet'}
          icon={<Trophy className="w-6 h-6" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
          subtitle={
            stats.topLevelStats.todaysWinner ? (
              <span className="text-gray-500 font-medium">
                Won back <span className="text-[#E85D21]">₹{stats.topLevelStats.todaysWinner.spent}</span>
              </span>
            ) : undefined
          }
          hasBgPattern={true}
        />
      </div>

      {/* Middle Section: Summary, Chart, Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <OrderSummary data={stats.orderSummary} />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <SalesOverview data={stats.salesOverview} />
        </div>
        <div className="col-span-1">
          <PopularProducts products={stats.popularProducts} />
        </div>
      </div>

      {/* Bottom Section: Recent Orders Table */}
      <div className="w-full">
        <RecentOrders orders={stats.recentOrders} />
      </div>

    </div>
  );
};

export default Dashboard;
