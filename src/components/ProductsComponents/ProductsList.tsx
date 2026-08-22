import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, MoreVertical, ChevronDown, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import DataTable, { type Column } from '../common/DataTable';
import type { Product, ProductFilters, Pagination } from '../../services/productService';
import type { Category } from '../../services/categoryService';
import AddProductModal from './AddProductModal';

interface ProductsListProps {
  products: Product[];
  categoriesList: Category[];
  isLoading: boolean;
  pagination: Pagination | null;
  selectedProductId: string | null;
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
  onSelectProduct: (id: string) => void;
  onRefresh: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  categoriesList,
  isLoading,
  pagination,
  selectedProductId,
  filters,
  onFilterChange,
  onSelectProduct,
  onRefresh
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Belgian Waffles':
        return <span className="text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full text-xs font-semibold">{category}</span>;
      case 'Pancakes':
        return <span className="text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-semibold">{category}</span>;
      case 'Beverages':
        return <span className="text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-semibold">{category}</span>;
      default:
        return <span>{category}</span>;
    }
  };

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

  const columns: Column<Product>[] = [
    {
      header: 'Product',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No img</div>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{item.name}</p>
            <p className="text-[10px] font-medium text-gray-500 uppercase">ID: #{item._id.slice(-6)}</p>
          </div>
        </div>
      ),
      headerClassName: 'w-[250px]'
    },
    {
      header: 'Category',
      cell: (item) => getCategoryBadge(item.category?.name || 'Uncategorized')
    },
    {
      header: 'Price',
      cell: (item) => <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
    },
    {
      header: 'Status',
      cell: (item) => getStatusBadge(item.isAvailable ? 'Active' : 'Inactive')
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(item._id);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
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
      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Category</span>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer h-[38px] min-w-[140px]"
            >
              <option value="all">All Categories</option>
              {categoriesList.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Status</span>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ status: e.target.value })}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer h-[38px] min-w-[120px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative hidden md:block">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Sort By</span>
            <select
              value={filters.popular ? 'popular' : filters.featured ? 'featured' : 'latest'}
              onChange={(e) => {
                const val = e.target.value;
                onFilterChange({
                  popular: val === 'popular' ? true : undefined,
                  featured: val === 'featured' ? true : undefined
                });
              }}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer h-[38px] min-w-[120px]"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="featured">Featured</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors h-[38px]">
            <Filter className="w-4 h-4" /> Filters
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E85D21] text-white text-sm font-semibold rounded-lg hover:bg-[#d6511a] transition-colors h-[38px]"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 text-[#E85D21] animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          keyExtractor={(item) => item._id}
          minWidth="900px"
          rowClassName={(item) => item._id === selectedProductId ? 'bg-orange-50/30' : ''}
        />
      )}

      {pagination && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 flex-wrap gap-4">
          <span className="text-sm text-gray-500">
            Showing {((pagination.currentPage - 1) * pagination.limit) + (products.length > 0 ? 1 : 0)} to {((pagination.currentPage - 1) * pagination.limit) + products.length} of {pagination.totalProducts} products
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button
                onClick={() => onFilterChange({ page: pagination.currentPage - 1 })}
                disabled={!pagination.hasPreviousPage}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                const page = idx + 1;
                // Simple logic to show first, last, current, and surrounding pages
                if (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => onFilterChange({ page })}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium ${page === pagination.currentPage
                        ? 'bg-[#E85D21] text-white'
                        : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  );
                }

                // Show ellipsis if there's a gap
                if (
                  (page === 2 && pagination.currentPage > 3) ||
                  (page === pagination.totalPages - 1 && pagination.currentPage < pagination.totalPages - 2)
                ) {
                  return <span key={page} className="px-1 text-gray-400">...</span>;
                }

                return null;
              })}

              <button
                onClick={() => onFilterChange({ page: pagination.currentPage + 1 })}
                disabled={!pagination.hasNextPage}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <select
                value={filters.limit || 10}
                onChange={(e) => onFilterChange({ limit: Number(e.target.value), page: 1 })}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-medium cursor-pointer"
              >
                <option value={20}>record per page 20 </option>
                <option value={50}>record per page 50 </option>
                <option value={10}>record per page 10 </option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => onRefresh()}
      />
    </div>
  );
};

export default ProductsList;
