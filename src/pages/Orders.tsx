import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import { Lock, Clock, Truck, XCircle } from 'lucide-react';
import OrdersList from '../components/OrdersComponents/OrdersList';
import OrderDetails from '../components/OrdersComponents/OrderDetails';
import { orderService, type OrderCounts } from '../services/orderService';

const Orders: React.FC = () => {
  const [counts, setCounts] = useState<OrderCounts>({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0
  });
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchOrdersStats();
  }, [refreshTrigger]);

  const fetchOrdersStats = async () => {
    try {
      const res = await orderService.getAllOrders(1, 1);
      if (res.success && res.data && res.data.counts) {
        setCounts(res.data.counts);
      }
    } catch (error) {
      console.error("Failed to fetch order stats", error);
    }
  };

  const handleStatusUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={counts.totalOrders.toString()}
          icon={<Lock className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-[#E85D21]"
          trend={{ value: '0%', isUp: true, text: 'vs yesterday' }}
        />
        
        <StatCard
          title="Pending Orders"
          value={counts.pendingOrders.toString()}
          icon={<Clock className="w-6 h-6" />}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-500"
          trend={{ value: '0%', isUp: false, text: 'vs yesterday' }}
        />
        
        <StatCard
          title="Completed Orders"
          value={counts.completedOrders.toString()}
          icon={<Truck className="w-6 h-6" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
          trend={{ value: '0%', isUp: true, text: 'vs yesterday' }}
        />
        
        <StatCard
          title="Cancelled Orders"
          value={counts.cancelledOrders.toString()}
          icon={<XCircle className="w-6 h-6" />}
          iconBgColor="bg-red-50"
          iconColor="text-red-500"
          trend={{ value: '0%', isUp: false, text: 'vs yesterday' }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 overflow-hidden w-full">
          <OrdersList 
            onOrderSelect={(id) => setSelectedOrderId(selectedOrderId === id ? null : id)} 
            selectedOrderId={selectedOrderId} 
            refreshTrigger={refreshTrigger}
          />
        </div>
        {selectedOrderId && (
          <div className="w-full xl:w-[400px] flex-shrink-0">
            <OrderDetails orderId={selectedOrderId} onStatusUpdated={handleStatusUpdated} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
