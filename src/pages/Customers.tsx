import React, { useState, useEffect, useCallback } from 'react';
import { User, UserPlus, Wallet, Crown, IndianRupee } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import CustomersTable from '../components/CustomersComponents/CustomersTable';
import type { Customer } from '../components/CustomersComponents/CustomersTable';
import CustomerProfilePane from '../components/CustomersComponents/CustomerProfilePane';
import { getAllUsers } from '../services/authService';
import type { Pagination } from '../services/productService'; // Reuse Pagination interface

const Customers: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [stats, setStats] = useState({ total: 0, newThisMonth: 0, active: 0 });
  const [filters, setFilters] = useState({ search: '', page: 1, limit: 10 });

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getAllUsers(filters);
      if (res.success) {
        setStats({
          total: res.pagination?.totalUsers || 0,
          newThisMonth: res.newThisMonth || 0,
          active: res.activeUsers || 0
        });
        
        if (res.pagination) {
          setPagination(res.pagination);
        }

        const mappedCustomers: Customer[] = (res.data || []).map((u: any) => {
          const date = new Date(u.createdAt);
          const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
          return {
            id: u._id,
            name: u.name || 'Unknown',
            email: u.email || '',
            phone: u.mobile || '',
            avatar: (u.name || 'U').substring(0, 2).toUpperCase(),
            avatarImage: u.profileImage,
            orders: u.totalOrders || 0,
            totalSpent: `₹${u.totalSpent || 0}`,
            points: (u.rewardPoints || 0).toString(),
            joinDate: formattedDate,
            status: u.isActive ? 'Active' : 'Inactive'
          };
        });
        setCustomers(mappedCustomers);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Customers"
          value={stats.total.toString()}
          icon={<User className="w-6 h-6" />}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
          subtitle="All time"
        />
        <StatCard
          title="New This Month"
          value={stats.newThisMonth.toString()}
          icon={<UserPlus className="w-6 h-6" />}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
        />
        <StatCard
          title="Active Customers"
          value={stats.active.toString()}
          icon={<Wallet className="w-6 h-6" />}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
          subtitle="Verified users"
        />
        <StatCard
          title="Loyal Customers"
          value="0"
          icon={<Crown className="w-6 h-6" />}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-500"
          subtitle="Placed 5+ orders"
        />
        <StatCard
          title="Total Spent by Customers"
          value="₹0"
          icon={<IndianRupee className="w-6 h-6" />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
          subtitle="All time"
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Left Column - Main Content */}
        <div className="flex-1 w-full overflow-hidden">
          <CustomersTable 
            customers={customers}
            isLoading={isLoading}
            pagination={pagination}
            filters={filters}
            onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters, page: newFilters.page ?? 1 }))}
            onSelectCustomer={setSelectedCustomer} 
          />
        </div>

        {/* Right Column - Customer Profile Pane */}
        {selectedCustomer && (
          <div className="w-full xl:w-[320px] shrink-0 sticky top-4">
            <CustomerProfilePane
              customer={selectedCustomer}
              onClose={() => setSelectedCustomer(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
