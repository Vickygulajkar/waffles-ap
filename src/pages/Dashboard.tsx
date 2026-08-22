import React from 'react';
import StatCard from '../components/common/StatCard';
import { Lock, IndianRupee, Users, Trophy } from 'lucide-react';
import OrderSummary from '../components/DashboardComponents/OrderSummary';
import SalesOverview from '../components/DashboardComponents/SalesOverview';
import PopularProducts from '../components/DashboardComponents/PopularProducts';
import RecentOrders from '../components/DashboardComponents/RecentOrders';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pb-8">
      
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value="1,248"
          icon={<Lock className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-[#E85D21]"
          trend={{ value: '18.4%', isUp: true, text: 'vs yesterday' }}
        />

        <StatCard
          title="Total Sales"
          value="₹1,248,50"
          icon={<IndianRupee className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-400"
          trend={{ value: '22.6%', isUp: true, text: 'vs yesterday' }}
        />

        <StatCard
          title="Total Customers"
          value="2,356"
          icon={<Users className="w-6 h-6" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
          trend={{ value: '16.5%', isUp: true, text: 'vs yesterday' }}
        />

        <StatCard
          title="Today's Winner"
          value="Rahul Sharma"
          icon={<Trophy className="w-6 h-6" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
          subtitle={
            <span className="text-gray-500 font-medium">
              Won back <span className="text-[#E85D21]">₹320</span>
            </span>
          }
          hasBgPattern={true}
        />
      </div>

      {/* Middle Section: Summary, Chart, Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <OrderSummary />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <SalesOverview />
        </div>
        <div className="col-span-1">
          <PopularProducts />
        </div>
      </div>

      {/* Bottom Section: Recent Orders Table */}
      <div className="w-full">
        <RecentOrders />
      </div>

    </div>
  );
};

export default Dashboard;
