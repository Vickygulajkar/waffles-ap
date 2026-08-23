import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, ChevronDown, Loader2 } from 'lucide-react';
import { productService, type Product } from '../../services/productService';
import { categoryService, type Category } from '../../services/categoryService';
import { uploadService } from '../../services/uploadService';
import { toast } from 'react-hot-toast';

interface ProductDetailsProps {
  productId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onClose, onSuccess }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState(''); // Current image URL
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // Fetch categories and product in parallel
        const [catRes, prodRes] = await Promise.all([
          categoryService.getCategories(),
          productService.getProductById(productId)
        ]);
        
        if (catRes.success && catRes.data) {
          setCategories(catRes.data);
        }

        if (prodRes.success && prodRes.data) {
          const p = prodRes.data;
          setProduct(p);
          setName(p.name || '');
          setDescription(p.description || '');
          setPrice(p.price || '');
          setCategory(p.category?._id || p.category || '');
          setSortOrder(p.sortOrder || 1);
          setIsAvailable(p.isAvailable ?? true);
          setImage(p.image || '');
          setImageFile(null); // reset file input on load
        }
      } catch (err: any) {
        console.error("Failed to fetch product details", err);
        setError(err.message || 'Failed to fetch details');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  const handleSave = async () => {
    if (!name || price === '' || !category) {
      setError('Name, Price, and Category are required.');
      return;
    }

    try {
      setIsSaving(true);
      setError('');
      
      let finalImageUrl = image;
      
      if (imageFile) {
        finalImageUrl = await uploadService.uploadImage(imageFile);
      }

      await productService.updateProduct(productId, {
        name,
        description,
        price: Number(price),
        category,
        sortOrder,
        isAvailable,
        image: finalImageUrl,
      });

      if (onSuccess) {
        onSuccess();
      }
      toast.success('Product updated successfully!');
      onClose(); // Optional: close pane on save, or just show success toast. We'll close it to follow the user's flow.
    } catch (err: any) {
      console.error("Failed to update product", err);
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to update product';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center h-[500px] sticky top-6">
        <Loader2 className="w-8 h-8 text-[#E85D21] animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  // Determine which image to show (preview of uploaded file, or existing URL)
  const displayImage = imageFile ? URL.createObjectURL(imageFile) : image;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-80px)] sticky top-6">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto scrollbar-hide">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* Image Area */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-50 mb-3 border border-gray-100 flex items-center justify-center relative group">
            {displayImage ? (
              <img src={displayImage} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm text-gray-400">No Image</span>
            )}
            
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
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
              <span className="text-white text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Change Image
              </span>
            </label>
          </div>
          <p className="text-xs text-gray-400">Hover over image to change</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] transition-all font-medium text-gray-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-800 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-medium cursor-pointer"
              >
                <option value="" disabled>Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] transition-all font-medium text-gray-800"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Sort Order
              </label>
              <input
                type="number"
                min="1"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] transition-all font-medium text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] transition-all font-medium text-gray-800 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Status
            </label>
            <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button 
                onClick={() => setIsAvailable(true)}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${isAvailable ? 'bg-[#E85D21] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Active
              </button>
              <button 
                onClick={() => setIsAvailable(false)}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${!isAvailable ? 'bg-gray-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-gray-100 flex gap-3 mt-auto bg-gray-50">
        <button 
          onClick={onClose}
          disabled={isSaving}
          className="flex-1 py-2.5 border border-gray-200 bg-white text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Close
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaving || !name || price === '' || !category}
          className="flex-1 py-2.5 bg-[#E85D21] text-white text-sm font-bold rounded-lg hover:bg-[#d6511a] transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
