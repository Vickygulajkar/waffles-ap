import React, { useState, useEffect, useCallback } from 'react';
import StatCard from '../components/common/StatCard';
import { ShoppingBag, CheckCircle2, MinusCircle } from 'lucide-react';
import ProductsList from '../components/ProductsComponents/ProductsList';
import ProductDetails from '../components/ProductsComponents/ProductDetails';
import { productService, type Product, type ProductFilters, type Pagination } from '../services/productService';
import { categoryService, type Category } from '../services/categoryService';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0, outOfStock: 0 });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: 'all',
    status: 'all',
    page: 1,
    limit: 10,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await productService.getProducts(filters);
      if (res.success && res.data) {
        setProducts(res.data);

        const activeCount = res.data.filter((p: Product) => p.isAvailable).length;
        const inactiveCount = res.data.filter((p: Product) => !p.isAvailable).length;

        if (res.pagination) {
          setPagination(res.pagination);
        }

        setCounts({
          total: res.pagination?.totalProducts || res.data.length,
          active: res.activeProducts || activeCount,
          inactive: res.inactiveProducts || inactiveCount,
          outOfStock: res.outOfStock || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await categoryService.getCategories();
        if (res.success && res.data) {
          setCategoriesList(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    // Add a slight debounce for search
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);
  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={counts.total}
          icon={<ShoppingBag className="w-6 h-6" />}
          iconBgColor="bg-orange-50"
          iconColor="text-[#E85D21]"
          subtitle="All products"
        />

        <StatCard
          title="Active Products"
          value={counts.active}
          icon={<CheckCircle2 className="w-6 h-6" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
          subtitle="Published"
        />

        <StatCard
          title="Inactive Products"
          value={counts.inactive}
          icon={<MinusCircle className="w-6 h-6" />}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-500"
          subtitle="Unpublished"
        />

        {/* <StatCard
          title="Out of Stock"
          value={counts.outOfStock}
          icon={<Package className="w-6 h-6" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
          subtitle="Not available"
        /> */}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <div className="flex-1 w-full overflow-hidden transition-all duration-300">
          <ProductsList
            products={products}
            categoriesList={categoriesList}
            isLoading={isLoading}
            pagination={pagination}
            onRefresh={fetchProducts}
            onSelectProduct={setSelectedProductId}
            selectedProductId={selectedProductId}
            filters={filters}
            onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters, page: newFilters.page ?? 1 }))}
          />
        </div>

        {selectedProductId && (
          <div className="w-full xl:w-[400px] flex-shrink-0 transition-all duration-300">
            <ProductDetails
              productId={selectedProductId}
              onClose={() => setSelectedProductId(null)}
              onSuccess={fetchProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
