import React, { useState } from 'react';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import { uploadService } from '../../services/uploadService';
import { toast } from 'react-hot-toast';
import { categoryService } from '../../services/categoryService';
import type { CreateCategoryPayload } from '../../services/categoryService';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('home');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let imageUrl = '';
      let iconUrl = '';

      // Upload image if selected
      if (imageFile) {
        imageUrl = await uploadService.uploadImage(imageFile);
      }

      // Upload icon if selected
      if (iconFile) {
        iconUrl = await uploadService.uploadImage(iconFile);
      }

      const payload: CreateCategoryPayload = {
        name,
        type,
        sortOrder,
        image: imageUrl,
        icon: iconUrl,
      };

      await categoryService.createCategory(payload);
      toast.success('Category created successfully!');
      onSuccess();
      onClose();
      
      // Reset form
      setName('');
      setType('home');
      setSortOrder(1);
      setImageFile(null);
      setIconFile(null);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to create category';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Add New Category</h2>
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
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Belgian Waffles" 
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="categoryType" 
                    value="home"
                    checked={type === 'home'}
                    onChange={() => setType('home')}
                    className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                  />
                  <span className="text-sm font-semibold text-gray-700">Home</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="categoryType" 
                    value="menu"
                    checked={type === 'menu'}
                    onChange={() => setType('menu')}
                    className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                  />
                  <span className="text-sm font-medium text-gray-700">Menu</span>
                </label>
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Sort Order <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                min="1"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Category Image <span className="text-red-500">*</span>
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

            {/* Icon Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Category Icon <span className="text-gray-400 font-normal ml-1">(Optional)</span>
              </label>
              <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer block relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setIconFile(e.target.files[0]);
                    }
                  }}
                />
                {iconFile ? (
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold text-[#E85D21] mb-1 truncate max-w-[200px]">{iconFile.name}</p>
                    <p className="text-[10px] text-gray-400">Click to change</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-sm font-semibold text-gray-700 mb-1">Click to upload icon</p>
                    <p className="text-[10px] text-gray-400">SVG, PNG, transparent background recommended</p>
                  </>
                )}
              </label>
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
            disabled={isLoading || !name}
            className="flex-1 py-2.5 bg-[#E85D21] hover:bg-[#D9551E] text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
