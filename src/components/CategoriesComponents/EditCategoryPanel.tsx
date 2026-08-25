import React, { useState, useEffect } from 'react';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import { uploadService } from '../../services/uploadService';
import { toast } from 'react-hot-toast';
import { categoryService, type CreateCategoryPayload } from '../../services/categoryService';

interface EditCategoryPanelProps {
  categoryId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const EditCategoryPanel: React.FC<EditCategoryPanelProps> = ({ categoryId, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('home');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(true);
  
  const [existingImage, setExistingImage] = useState('');
  const [existingIcon, setExistingIcon] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        setIsFetching(true);
        const res = await categoryService.getCategory(categoryId);
        if (res.success && res.data) {
          const cat = res.data;
          setName(cat.name || '');
          setType(cat.type || 'home');
          setSortOrder(cat.sortOrder || 1);
          setIsActive(cat.isActive !== false);
          setExistingImage(cat.image || '');
          setExistingIcon(cat.icon || '');
        }
      } catch (err: any) {
        toast.error('Failed to load category details');
        onClose();
      } finally {
        setIsFetching(false);
      }
    };
    if (categoryId) {
      fetchCategoryDetails();
    }
  }, [categoryId, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let imageUrl = existingImage;
      let iconUrl = existingIcon;

      // Upload image if selected
      if (imageFile) {
        imageUrl = await uploadService.uploadImage(imageFile);
      }

      // Upload icon if selected
      if (iconFile) {
        iconUrl = await uploadService.uploadImage(iconFile);
      }

      const payload: Partial<CreateCategoryPayload> & { isActive?: boolean } = {
        name,
        type,
        sortOrder,
        image: imageUrl,
        icon: iconUrl,
        isActive,
      };

      await categoryService.updateCategory(categoryId, payload);
      toast.success('Category updated successfully!');
      onSuccess();
      onClose();
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to update category';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Loader2 className="w-8 h-8 text-[#E85D21] animate-spin" />
        <p className="mt-2 text-sm text-gray-500">Loading details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-900">Edit Category</h2>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Status Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-sm font-bold text-gray-800">Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E85D21]"></div>
              <span className="ml-3 text-sm font-semibold text-gray-700">
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
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

          {/* Type & Sort Order Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Type <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="editCategoryType" 
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
                    name="editCategoryType" 
                    value="menu"
                    checked={type === 'menu'}
                    onChange={() => setType('menu')}
                    className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                  />
                  <span className="text-sm font-semibold text-gray-700">Menu</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
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
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Category Image <span className="text-red-500">*</span>
            </label>
            <label className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer block relative min-h-[120px]">
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
                  <p className="text-sm font-semibold text-[#E85D21] mb-1 truncate max-w-[150px]">{imageFile.name}</p>
                  <p className="text-[10px] text-gray-400">Click to change</p>
                </div>
              ) : existingImage ? (
                <div className="flex flex-col items-center">
                  <img src={existingImage} alt="Category" className="h-12 w-12 object-cover rounded mb-2" />
                  <p className="text-[10px] text-gray-500">Click to replace</p>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-xs font-semibold text-gray-700 mb-1">Upload new image</p>
                </>
              )}
            </label>
          </div>

          {/* Icon Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Category Icon <span className="text-gray-400 font-normal ml-1">(Optional)</span>
            </label>
            <label className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer block relative min-h-[120px]">
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
                  <p className="text-sm font-semibold text-[#E85D21] mb-1 truncate max-w-[150px]">{iconFile.name}</p>
                  <p className="text-[10px] text-gray-400">Click to change</p>
                </div>
              ) : existingIcon ? (
                <div className="flex flex-col items-center">
                  <img src={existingIcon} alt="Icon" className="h-10 w-10 object-contain rounded mb-2 bg-gray-200" />
                  <p className="text-[10px] text-gray-500">Click to replace</p>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-xs font-semibold text-gray-700 mb-1">Upload new icon</p>
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
          className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-white transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          disabled={isLoading || !name}
          className="flex-1 py-2 bg-[#E85D21] hover:bg-[#D9551E] text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Category'}
        </button>
      </div>
    </div>
  );
};

export default EditCategoryPanel;
