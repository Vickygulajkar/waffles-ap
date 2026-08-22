import React, { useState, useEffect } from 'react';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import { uploadService } from '../../services/uploadService';
import { productService } from '../../services/productService';
import type { CreateProductPayload } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import type { Category } from '../../services/categoryService';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [isPopular, setIsPopular] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Fetch categories when modal opens
      const fetchCategories = async () => {
        try {
          const res = await categoryService.getCategories();
          if (res.success && res.data) {
            setCategories(res.data);
          }
        } catch (err) {
          console.error("Failed to fetch categories", err);
        }
      };
      fetchCategories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !category) {
      setError('Name, price, and category are required.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadService.uploadImage(imageFile);
      }

      const payload: CreateProductPayload = {
        name,
        description,
        price: Number(price),
        category,
        image: imageUrl,
        isPopular,
        isFeatured,
        isAvailable,
        sortOrder
      };

      await productService.createProduct(payload);
      onSuccess();
      onClose();
      
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setSortOrder(1);
      setIsPopular(false);
      setIsFeatured(false);
      setIsAvailable(true);
      setImageFile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto scrollbar-hide">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-800 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nutella Overload" 
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-800 mb-2">
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Crispy waffle loaded with Nutella and chocolate." 
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors resize-none"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors appearance-none bg-white"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2">
                  Sort Order
                </label>
                <input 
                  type="number" 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
                />
              </div>

              {/* Switches (Popular, Featured, Available) */}
              <div className="md:col-span-2 flex flex-wrap gap-8 py-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${isAvailable ? 'bg-[#E85D21]' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isAvailable ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Is Available</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${isPopular ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isPopular ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Is Popular</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${isFeatured ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isFeatured ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Is Featured</span>
                </label>
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-800 mb-2">
                  Product Image
                </label>
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer block relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                  />
                  {imageFile ? (
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-semibold text-[#E85D21] mb-1 truncate max-w-[200px]">{imageFile.name}</p>
                      <p className="text-[10px] text-gray-400">Click to change</p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm font-semibold text-gray-700 mb-1">Click to upload image</p>
                      <p className="text-[10px] text-gray-400">PNG, JPG, WEBP</p>
                    </>
                  )}
                </label>
              </div>

            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-100 flex gap-3 mt-auto bg-gray-50">
          <button 
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isLoading || !name || price === '' || !category}
            className="flex-1 py-2.5 bg-[#E85D21] hover:bg-[#D9551E] text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
