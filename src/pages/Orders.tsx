import React from 'react';
import StatCard from '../components/common/StatCard';
import { Lock, Clock, Truck, XCircle } from 'lucide-react';
import OrdersList from '../components/OrdersComponents/OrdersList';
import OrderDetails from '../components/OrdersComponents/OrderDetails';

const Orders: React.FC = () => {
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
          title="Pending Orders"
          value="12"
          icon={<Clock className="w-6 h-6" />}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-500"
          trend={{ value: '8.3%', isUp: false, text: 'vs yesterday' }}
        />
        
        <StatCard
          title="Delivered Orders"
          value="986"
          icon={<Truck className="w-6 h-6" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
          trend={{ value: '12.6%', isUp: true, text: 'vs yesterday' }}
        />
        
        <StatCard
          title="Cancelled Orders"
          value="25"
          icon={<XCircle className="w-6 h-6" />}
          iconBgColor="bg-red-50"
          iconColor="text-red-500"
          trend={{ value: '5.2%', isUp: false, text: 'vs yesterday' }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 overflow-hidden">
          <OrdersList />
        </div>
        <div className="w-full xl:w-[400px] flex-shrink-0">
          <OrderDetails />
        </div>
      </div>
    </div>
  );
};

export default Orders;
