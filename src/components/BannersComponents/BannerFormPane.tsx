import React, { useState, useEffect } from 'react';
import { X, UploadCloud, ChevronDown } from 'lucide-react';
import type { Banner } from '../../services/bannerService';
import { bannerService } from '../../services/bannerService';
import { uploadService } from '../../services/uploadService';
import toast from 'react-hot-toast';

interface BannerFormPaneProps {
  banner?: Banner | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const BannerFormPane: React.FC<BannerFormPaneProps> = ({ banner, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    bannerType: 'carousel',
    buttonText: '',
    actionType: 'screen',
    isActive: true,
    sortOrder: 1
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const isEditing = !!banner;

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        image: banner.image || '',
        bannerType: banner.bannerType || 'carousel',
        buttonText: banner.buttonText || '',
        actionType: banner.actionType || 'screen',
        isActive: banner.isActive ?? true,
        sortOrder: banner.sortOrder || 1
      });
      setImagePreview(banner.image || '');
    } else {
      setFormData({
        title: '',
        subtitle: '',
        image: '',
        bannerType: 'carousel',
        buttonText: '',
        actionType: 'screen',
        isActive: true,
        sortOrder: 1
      });
      setImagePreview('');
    }
    setImageFile(null);
  }, [banner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'sortOrder' ? Number(value) : value }));
  };

  const handleToggleActive = (active: boolean) => {
    setFormData(prev => ({ ...prev, isActive: active }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!formData.title) {
        toast.error('Title is required');
        setLoading(false);
        return;
      }

      let uploadedImageUrl = formData.image;
      if (imageFile) {
        try {
          uploadedImageUrl = await uploadService.uploadImage(imageFile);
        } catch (uploadError) {
          toast.error('Failed to upload image');
          setLoading(false);
          return;
        }
      }

      if (!uploadedImageUrl) {
        toast.error('Please upload an image');
        setLoading(false);
        return;
      }

      const payload = { ...formData, image: uploadedImageUrl };

      let res;
      if (isEditing) {
        res = await bannerService.updateBanner(banner._id, payload);
      } else {
        res = await bannerService.createBanner(payload);
      }

      if (res.success || res) { // Adjusted for typical variations in response mapping
        toast.success(isEditing ? 'Banner updated successfully' : 'Banner created successfully');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to save banner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full max-h-[850px] relative">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">{isEditing ? 'Edit Banner' : 'Add New Banner'}</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto scrollbar-hide space-y-6">
        
        {/* Banner Type */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Banner Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="bannerType"
                value="carousel"
                className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                checked={formData.bannerType === 'carousel'}
                onChange={handleChange}
              />
              <span className="text-sm font-semibold text-gray-700">Carousel</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="bannerType" 
                value="offer"
                className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                checked={formData.bannerType === 'offer'}
                onChange={handleChange}
              />
              <span className="text-sm text-gray-500 font-medium">Offer</span>
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="title"
            placeholder="Enter banner title" 
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Subtitle
          </label>
          <input 
            type="text" 
            name="subtitle"
            placeholder="Enter subtitle" 
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
          />
        </div>

        {/* Upload */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Upload Banner Image <span className="text-red-500">*</span>
          </label>
          <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group min-h-[140px]">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-bold">Change Image</p>
                </div>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
                <p className="text-sm font-semibold text-gray-700 mb-1">Click to upload</p>
                <p className="text-[10px] text-gray-400">PNG, JPG, WEBP up to 2MB</p>
              </>
            )}
            <input 
              type="file" 
              accept="image/*"
              className="hidden" 
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Button Text */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Button Text
          </label>
          <input 
            type="text" 
            name="buttonText"
            placeholder="e.g. Explore Now" 
            value={formData.buttonText}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
          />
        </div>

        {/* Action Type */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Action Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select 
              name="actionType"
              value={formData.actionType}
              onChange={handleChange}
              className="w-full appearance-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21] bg-white text-gray-700"
            >
              <option value="screen">App Screen</option>
              <option value="url">External URL</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="isActive" 
                className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                checked={formData.isActive === true}
                onChange={() => handleToggleActive(true)}
              />
              <span className="text-sm font-semibold text-gray-700">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="isActive" 
                className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-[#E85D21]" 
                checked={formData.isActive === false}
                onChange={() => handleToggleActive(false)}
              />
              <span className="text-sm text-gray-500 font-medium">Inactive</span>
            </label>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Priority / Sort Order <span className="text-gray-400 font-normal ml-1">ⓘ</span>
          </label>
          <input 
            type="number" 
            name="sortOrder"
            value={formData.sortOrder}
            onChange={handleChange}
            min={1} 
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21]"
          />
        </div>

      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-100 flex gap-3 mt-auto bg-white">
        <button 
          onClick={onClose}
          className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex-[2] py-2 bg-[#E85D21] hover:bg-[#D9551E] disabled:opacity-70 text-white rounded-lg text-sm font-bold transition-colors"
        >
          {loading ? 'Saving...' : 'Save Banner'}
        </button>
      </div>
    </div>
  );
};

export default BannerFormPane;
