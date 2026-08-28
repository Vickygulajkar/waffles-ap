import React from 'react';

import { type PopularProductData } from '../../services/dashboardService';

interface PopularProductsProps {
  products: PopularProductData[];
}

const PopularProducts: React.FC<PopularProductsProps> = ({ products }) => {

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">Popular Products</h2>
        <button className="text-sm font-semibold text-[#E85D21] hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4 mt-2">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-400 w-4 text-center">{index + 1}</span>
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={`https://placehold.co/100x100?text=Waffle+${index + 1}`} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800">{product.name}</span>
              <span className="text-xs font-semibold text-[#E85D21]">{product.orders} Orders</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
