import React, { useState, useEffect } from 'react';
import { ChefHat, Phone, MapPin, ChevronDown, CheckCircle2, CheckCircle, XCircle } from 'lucide-react';
import { orderService, type Order } from '../../services/orderService';

interface OrderDetailsProps {
  orderId: string;
  onStatusUpdated?: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onStatusUpdated }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const res = await orderService.getOrderById(orderId);
      if (res.success && res.data) {
        setOrder(res.data);
        setSelectedStatus(res.data.orderStatus);
      }
    } catch (error) {
      console.error("Failed to fetch order details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!orderId || !selectedStatus) return;
    setUpdating(true);
    try {
      const res = await orderService.updateOrderStatus(orderId, selectedStatus);
      if (res.success && res.data) {
        setOrder(res.data);
        setSelectedStatus(res.data.orderStatus);
        if (onStatusUpdated) onStatusUpdated();
        // We could also show a toast notification here
      }
    } catch (error) {
      console.error("Failed to update order status", error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_payment':
        return <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-600 text-sm font-semibold">Pending Payment</span>;
      case 'confirmed':
        return <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-500 text-sm font-semibold"><CheckCircle2 className="w-4 h-4" /> Confirmed</span>;
      case 'preparing':
        return <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-500 text-sm font-semibold"><ChefHat className="w-4 h-4" /> Preparing</span>;
      case 'ready':
        return <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-500 text-sm font-semibold">Ready</span>;
      case 'completed':
        return <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-semibold"><CheckCircle className="w-4 h-4" /> Completed</span>;
      case 'cancelled':
        return <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-sm font-semibold"><XCircle className="w-4 h-4" /> Cancelled</span>;
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 text-sm font-semibold">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full items-center justify-center min-h-[500px]">
        <div className="w-8 h-8 border-4 border-[#E85D21] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full items-center justify-center min-h-[500px] text-gray-500">
        Order not found
      </div>
    );
  }

  const customerInitial = order.user?.name ? order.user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full sticky top-6">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
        {getStatusBadge(order.orderStatus)}
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {/* Customer Info */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl flex-shrink-0">
                {customerInitial}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{order.user?.name || 'Unknown'}</h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
                  <Phone className="w-3.5 h-3.5" /> {order.user?.email || 'N/A'}
                </div>
              </div>
            </div>
            <button className="px-3 py-1.5 border border-[#E85D21] text-[#E85D21] text-xs font-bold rounded-lg hover:bg-orange-50 transition-colors">
              View Profile
            </button>
          </div>
          <div className="flex gap-2 text-gray-500 text-sm bg-gray-50 p-3 rounded-xl">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="leading-tight">Order Type: {order.orderType === 'pickup' ? 'Pickup' : 'Delivery'}</p>
          </div>
        </div>

        {/* Order Info Row */}
        <div className="flex items-center justify-between border-y border-gray-100 py-4 mb-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold mb-1">Order ID</span>
            <span className="text-sm font-bold text-gray-800" title={order.orderNumber}>#{order.orderNumber.substring(0, 8)}</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold mb-1">Order Date</span>
            <span className="text-sm font-bold text-gray-800">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold mb-1">Order Time</span>
            <span className="text-sm font-bold text-gray-800">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Items */}
        <h3 className="font-bold text-gray-800 mb-4">Items ({order.items.length})</h3>
        <div className="space-y-4 mb-6">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={item.image || "https://placehold.co/100x100"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                  <div className="text-right">
                    <span className="font-bold text-sm text-gray-800 block">₹{item.price}</span>
                    <span className="text-xs text-gray-500 font-medium">x {item.quantity}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Total: ₹{item.total}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Item Total</span>
            <span className="font-bold text-gray-800">₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Discount</span>
            <span className="font-bold text-green-500">- ₹{order.discount}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl mb-6">
          <span className="font-bold text-gray-800">Total Amount</span>
          <span className="font-bold text-xl text-gray-900">₹{order.totalAmount}</span>
        </div>

        {/* Update Status */}
        <div className="border-t border-gray-100 pt-5">
          <h3 className="font-bold text-gray-800 mb-3">Update Order Status</h3>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <select 
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-10 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer" 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="pending_payment">Pending Payment</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChefHat className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button 
              onClick={handleUpdateStatus}
              disabled={updating || order.orderStatus === selectedStatus}
              className="bg-[#E85D21] hover:bg-[#d6511a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center gap-2 flex-shrink-0 text-sm"
            >
              {updating ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
