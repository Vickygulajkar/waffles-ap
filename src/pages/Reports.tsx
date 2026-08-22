import React from 'react';
import { IndianRupee, ShoppingBag, ShoppingCart, RefreshCcw, UserPlus, CalendarDays, Download } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import ReportsTabs from '../components/ReportsComponents/ReportsTabs';
import ReportsFilters from '../components/ReportsComponents/ReportsFilters';
import LineChartCard from '../components/ReportsComponents/LineChartCard';
import DonutChartCard from '../components/ReportsComponents/DonutChartCard';
import MonthlySummaryTable from '../components/ReportsComponents/MonthlySummaryTable';
import ReportsSidebar from '../components/ReportsComponents/ReportsSidebar';

const Reports: React.FC = () => {
  // Donut Chart Data
  const ordersByStatusData = [
    { label: 'Delivered', value: '842', percentage: 59, color: '#10B981' }, // Green
    { label: 'Completed', value: '312', percentage: 22, color: '#F59E0B' }, // Yellow
    { label: 'Preparing', value: '146', percentage: 10, color: '#3B82F6' }, // Blue
    { label: 'Cancelled', value: '86', percentage: 6, color: '#8B5CF6' }, // Purple
    { label: 'Refunded', value: '42', percentage: 3, color: '#EF4444' }, // Red
  ];

  const revenueByCategoryData = [
    { label: 'Waffles', value: '₹1,88,450', percentage: 55, color: '#F97316' }, // Orange
    { label: 'Shakes', value: '₹68,750', percentage: 20, color: '#3B82F6' }, // Blue
    { label: 'Beverages', value: '₹34,250', percentage: 10, color: '#10B981' }, // Green
    { label: 'Combo Offers', value: '₹28,600', percentage: 8, color: '#8B5CF6' }, // Purple
    { label: 'Others', value: '₹22,530', percentage: 7, color: '#EF4444' }, // Red
  ];

  const customersData = [
    { label: 'New Customers', value: '156', percentage: 11, color: '#10B981' }, // Green
    { label: 'Returning Customers', value: '1,272', percentage: 89, color: '#F97316' }, // Orange
  ];

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Reports</h1>
          <p className="text-sm text-gray-500">Dashboard &gt; Reports</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm font-semibold text-gray-600">21 Aug 2025 - 21 Sep 2025</span>
            <CalendarDays className="w-4 h-4 text-gray-400" />
          </div>
          
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors bg-white shadow-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Revenue"
          value="₹3,42,580"
          icon={<IndianRupee className="w-6 h-6" />}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
          trend={{ value: '18.6%', isUp: true, text: 'vs 21 Jul - 20 Aug' }}
        />
        <StatCard
          title="Total Orders"
          value="1,428"
          icon={<ShoppingBag className="w-6 h-6" />}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-500"
          trend={{ value: '15.3%', isUp: true, text: 'vs 21 Jul - 20 Aug' }}
        />
        <StatCard
          title="Average Order Value"
          value="₹240.15"
          icon={<ShoppingCart className="w-6 h-6" />}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
          trend={{ value: '6.8%', isUp: true, text: 'vs 21 Jul - 20 Aug' }}
        />
        <StatCard
          title="Refunds"
          value="₹4,250"
          icon={<RefreshCcw className="w-6 h-6" />}
          iconBgColor="bg-red-100"
          iconColor="text-red-500"
          trend={{ value: '12.4%', isUp: false, text: 'vs 21 Jul - 20 Aug' }}
        />
        <StatCard
          title="New Customers"
          value="156"
          icon={<UserPlus className="w-6 h-6" />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
          trend={{ value: '10.2%', isUp: true, text: 'vs 21 Jul - 20 Aug' }}
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Left Column - Main Content */}
        <div className="flex-1 w-full overflow-hidden">
          
          <ReportsTabs />
          <ReportsFilters />

          {/* Line Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <LineChartCard 
              title="Revenue Overview"
              value="₹3,42,580"
              trend="18.6% vs 21 Jul - 20 Aug"
              trendIsUp={true}
              currentPeriodLabel="21 Aug - 21 Sep 2025"
              previousPeriodLabel="21 Jul - 20 Aug 2025"
              yAxisLabels={['100k', '80k', '60k', '40k', '20k', '0']}
            />
            <LineChartCard 
              title="Orders Overview"
              value="1,428"
              trend="15.3% vs 21 Jul - 20 Aug"
              trendIsUp={true}
              currentPeriodLabel="21 Aug - 21 Sep 2025"
              previousPeriodLabel="21 Jul - 20 Aug 2025"
              yAxisLabels={['500', '400', '300', '200', '100', '0']}
            />
          </div>

          {/* Donut Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <DonutChartCard 
              title="Orders by Status"
              data={ordersByStatusData}
              centerLabel="Total"
              centerValue="1,428"
            />
            <DonutChartCard 
              title="Revenue by Category"
              data={revenueByCategoryData}
              centerLabel="Total"
              centerValue="₹3,42,580"
            />
            <DonutChartCard 
              title="New vs Returning Customers"
              data={customersData}
              centerLabel="Total"
              centerValue="1,428"
            />
          </div>

          {/* Monthly Summary Table */}
          <MonthlySummaryTable />

        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="w-full xl:w-[320px] shrink-0">
          <ReportsSidebar />
        </div>
      </div>
    </div>
  );
};

export default Reports;
