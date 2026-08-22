import React, { useState } from 'react';
import { Search, Plus, Edit2, MoreVertical, ChevronDown, Loader2 } from 'lucide-react';
import DataTable, { type Column } from '../common/DataTable';
import AddCategoryModal from './AddCategoryModal';
import type { Category } from '../../services/categoryService';

interface CategoriesListProps {
  categories: Category[];
  isLoading: boolean;
  selectedType: string;
  onTypeChange: (type: string) => void;
  onRefresh: () => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ 
  categories, 
  isLoading, 
  selectedType,
  onTypeChange,
  onRefresh 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {status}
      </span>
    );
  };

  const columns: Column<Category>[] = [
    { header: '#', cell: (_, idx) => <span className="text-sm font-semibold text-gray-800">{idx + 1}</span>, headerClassName: 'w-12' },
    { header: 'Category Name', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.name}</span> },
    { 
      header: 'Image', 
      cell: (item) => (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
          )}
        </div>
      )
    },
    { 
      header: 'Type', 
      cell: (item) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
          item.type === 'home' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
        }`}>
          {item.type}
        </span>
      )
    },
    { header: 'Status', cell: (item) => getStatusBadge(item.isActive ? 'Active' : 'Inactive') },
    { 
      header: 'Created At', 
      cell: (item) => {
        const date = new Date(item.createdAt);
        return <span className="text-sm font-medium text-gray-800">
          {isNaN(date.getTime()) ? item.createdAt : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>;
      } 
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      ),
      headerClassName: 'text-center',
      cellClassName: 'text-center'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Top Bar: Search & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <select 
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg outline-none focus:border-[#E85D21] text-sm font-medium cursor-pointer w-full md:w-[140px]"
            >
              <option value="all">All Types</option>
              <option value="home">Home</option>
              <option value="menu">Menu</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E85D21] text-white text-sm font-semibold rounded-lg hover:bg-[#d6511a] transition-colors h-[38px] flex-1 md:flex-none"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 text-[#E85D21] animate-spin" />
        </div>
      ) : (
        <DataTable 
          columns={columns}
          data={categories}
          keyExtractor={(item) => item._id}
          minWidth="900px"
        />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">Showing 1 to 10 of 12 categories</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E85D21] text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">&gt;</button>
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-medium cursor-pointer">
              <option>10 / page</option>
              <option>20 / page</option>
              <option>50 / page</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <AddCategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          onRefresh();
        }} 
      />
    </div>
  );
};

export default CategoriesList;
