import React from 'react';

const PopularProducts: React.FC = () => {
  const products = [
    { id: 1, name: 'Nutella Overload', orders: '328 Orders', image: 'https://placehold.co/100x100?text=Waffle+1' },
    { id: 2, name: 'KitKat Waffle', orders: '271 Orders', image: 'https://placehold.co/100x100?text=Waffle+2' },
    { id: 3, name: 'Red Velvet Waffle', orders: '198 Orders', image: 'https://placehold.co/100x100?text=Waffle+3' },
    { id: 4, name: 'Chocolate Blast', orders: '164 Orders', image: 'https://placehold.co/100x100?text=Waffle+4' },
    { id: 5, name: 'Classic Butter Waffle', orders: '143 Orders', image: 'https://placehold.co/100x100?text=Waffle+5' },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">Popular Products</h2>
        <button className="text-sm font-semibold text-[#E85D21] hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4 mt-2">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-400 w-4 text-center">{product.id}</span>
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800">{product.name}</span>
              <span className="text-xs font-semibold text-[#E85D21]">{product.orders}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
