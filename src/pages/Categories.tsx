import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import { LayoutGrid, CheckCircle2, EyeOff, Package } from 'lucide-react';
import CategoriesList from '../components/CategoriesComponents/CategoriesList';
import { categoryService, type Category } from '../services/categoryService';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0 });
  const [selectedType, setSelectedType] = useState('all');

  const fetchCategories = async (type: string) => {
    try {
      setIsLoading(true);
      const res = await categoryService.getCategories(type);
      if (res.success && res.data) {
        setCategories(res.data);
        setCounts({
          total: res.totalCategories || 0,
          active: res.activeCategories || 0,
          inactive: res.inactiveCategories || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(selectedType);
  }, [selectedType]);
  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Categories"
          value={counts.total}
          icon={<LayoutGrid className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-[#E85D21]"
          subtitle="All categories"
        />
        
        <StatCard
          title="Active Categories"
          value={counts.active}
          icon={<CheckCircle2 className="w-6 h-6" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
          subtitle="Published"
        />
        
        <StatCard
          title="Inactive Categories"
          value={counts.inactive}
          icon={<EyeOff className="w-6 h-6" />}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-500"
          subtitle="Unpublished"
        />
        
        <StatCard
          title="Total Products"
          value="128"
          icon={<Package className="w-6 h-6" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
          subtitle="Across all categories"
        />
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        <CategoriesList 
          categories={categories} 
          isLoading={isLoading} 
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onRefresh={() => fetchCategories(selectedType)} 
        />
      </div>
    </div>
  );
};

export default Categories;
