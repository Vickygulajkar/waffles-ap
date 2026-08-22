import React, { useState } from 'react';
import { X, UploadCloud, ChevronDown, Calendar, Clock } from 'lucide-react';
import type { Banner } from './BannersTable';

interface BannerFormPaneProps {
  banner?: Banner | null;
  onClose: () => void;
}

const BannerFormPane: React.FC<BannerFormPaneProps> = ({ banner, onClose }) => {
  const [bannerType, setBannerType] = useState(banner ? banner.type : 'Image');
  const [status, setStatus] = useState(banner ? banner.status : 'Active');

  const isEditing = !!banner;

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
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="bannerType" 
                className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                checked={bannerType === 'Image'}
                onChange={() => setBannerType('Image')}
              />
              <span className="text-sm font-semibold text-gray-700">Image</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="bannerType" 
                className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                checked={bannerType === 'Video'}
                onChange={() => setBannerType('Video')}
              />
              <span className="text-sm text-gray-500 font-medium">Video</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="bannerType" 
                className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                checked={bannerType === 'Web'}
                onChange={() => setBannerType('Web')}
              />
              <span className="text-sm text-gray-500 font-medium">Web</span>
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Title (Internal) <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="Enter banner title" 
            defaultValue={banner?.title || ''}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E85D21] transition-colors"
          />
          <p className="text-[10px] text-gray-400 text-right mt-1">0/100</p>
        </div>

        {/* Upload */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Upload Banner <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
            <p className="text-sm font-semibold text-gray-700 mb-1">Click to upload</p>
            <p className="text-[10px] text-gray-400">PNG, JPG, WEBP up to 2MB</p>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">Recommended size: 1920 x 600px</p>
        </div>

        {/* Link Type */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">Link Type</label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21] bg-white text-gray-700">
              <option>Internal Page</option>
              <option>External URL</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Select Page */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Select Page <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21] bg-white text-gray-400">
              <option value="" disabled selected>Select page</option>
              <option value="home">Home Page</option>
              <option value="offers">Offers Page</option>
              <option value="products">Products List</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Position <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21] bg-white text-gray-400">
              <option value="" disabled selected>Select position</option>
              <option value="home">Home Carousel</option>
              <option value="top">Top Banner</option>
              <option value="category">Category Banner</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Publish Date & Time */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Publish Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue={banner ? banner.publishDate : '21 Aug 2025'}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21]"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="w-28">
            <label className="block text-xs font-bold text-gray-800 mb-2">&nbsp;</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue={banner ? banner.publishTime : '10:00 AM'}
                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21]"
              />
              <Clock className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* End Date & Time */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-800 mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue={banner ? banner.endDate : '21 Sep 2025'}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21]"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="w-28">
            <label className="block text-xs font-bold text-gray-800 mb-2">&nbsp;</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue={banner ? banner.endTime : '11:59 PM'}
                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#E85D21]"
              />
              <Clock className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
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
                name="status" 
                className="w-4 h-4 text-[#E85D21] border-gray-300 focus:ring-[#E85D21]" 
                checked={status === 'Active'}
                onChange={() => setStatus('Active')}
              />
              <span className="text-sm font-semibold text-gray-700">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="status" 
                className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-[#E85D21]" 
                checked={status === 'Scheduled'}
                onChange={() => setStatus('Scheduled')}
              />
              <span className="text-sm text-gray-500 font-medium">Scheduled</span>
            </label>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            Priority <span className="text-gray-400 font-normal ml-1">ⓘ</span>
          </label>
          <input 
            type="number" 
            defaultValue={banner?.priority || 1}
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
        <button className="flex-[2] py-2 bg-[#E85D21] hover:bg-[#D9551E] text-white rounded-lg text-sm font-bold transition-colors">
          Save Banner
        </button>
      </div>
    </div>
  );
};

export default BannerFormPane;
