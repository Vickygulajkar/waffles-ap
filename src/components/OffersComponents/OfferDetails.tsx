import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { offerService, type Offer } from '../../services/offerService';

interface OfferDetailsProps {
  offer?: Offer | null;
  onClose?: () => void;
  onSuccess?: () => void;
}

const OfferDetails: React.FC<OfferDetailsProps> = ({ offer, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    offerType: '',
    name: '',
    couponCode: '',
    discountType: '',
    discountValue: '',
    minimumOrderValue: '',
    startDate: '',
    endDate: '',
    status: 'Active',
    buyQuantity: '',
    getQuantity: ''
  });

  useEffect(() => {
    if (offer) {
      let mappedOfferType = offer.offerType;
      if (offer.offerType === 'discount') {
        mappedOfferType = offer.discountType === 'percentage' ? 'percentage' : 'flat';
      }
      
      setFormData({
        offerType: mappedOfferType,
        name: offer.name || '',
        couponCode: offer.couponCode || '',
        discountType: offer.discountType === 'percentage' ? 'Percentage' : (offer.discountType === 'fixed_amount' ? 'Fixed Amount' : ''),
        discountValue: offer.discountValue?.toString() || '',
        minimumOrderValue: offer.minimumOrderValue?.toString() || '',
        startDate: offer.startDate ? new Date(offer.startDate).toISOString().split('T')[0] : '',
        endDate: offer.endDate ? new Date(offer.endDate).toISOString().split('T')[0] : '',
        status: offer.isActive ? 'Active' : 'Scheduled', // Simple map
        buyQuantity: offer.buyQuantity?.toString() || '',
        getQuantity: offer.getQuantity?.toString() || ''
      });
    } else {
      setFormData({
        offerType: '',
        name: '',
        couponCode: '',
        discountType: '',
        discountValue: '',
        minimumOrderValue: '',
        startDate: '',
        endDate: '',
        status: 'Active',
        buyQuantity: '',
        getQuantity: ''
      });
    }
  }, [offer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name) {
        toast.error('Offer name is required');
        return;
      }
      setLoading(true);
      const payload: any = {
        name: formData.name,
        couponCode: formData.couponCode || undefined,
        minimumOrderValue: Number(formData.minimumOrderValue) || 0,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : new Date().toISOString(),
        isActive: formData.status === 'Active'
      };

      if (formData.offerType === 'buy_get') {
        payload.offerType = 'buy_get';
        payload.discountType = 'buy_get';
        payload.buyQuantity = Number(formData.buyQuantity) || 0;
        payload.getQuantity = Number(formData.getQuantity) || 0;
      } else {
        payload.offerType = 'discount';
        
        if (formData.offerType === 'percentage' || formData.discountType === 'Percentage') {
           payload.discountType = 'percentage';
        } else {
           payload.discountType = 'fixed_amount';
        }
        
        payload.discountValue = Number(formData.discountValue) || 0;
      }

      const res = offer ? await offerService.updateOffer(offer._id, payload) : await offerService.createOffer(payload);
      if (res.success) {
        toast.success(offer ? 'Offer updated successfully!' : 'Offer created successfully!');
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        toast.error(res.message || 'Failed to save offer');
      }
    } catch (error: any) {
      console.error("Error saving offer:", error);
      toast.error(error?.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full sticky top-6">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">{offer ? 'Edit Offer' : 'Add New Offer'}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Offer Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select name="offerType" value={formData.offerType} onChange={handleChange} className="w-full appearance-none bg-white border border-gray-200 text-gray-800 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] text-sm font-medium cursor-pointer">
              <option value="">Select offer type</option>
              <option value="buy_get">Buy X Get Y</option>
              <option value="flat">Flat Discount</option>
              <option value="percentage">Percentage</option>
              <option value="discount">Discount</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Offer Name <span className="text-red-500">*</span>
          </label>
          <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Enter offer name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Coupon Code (Optional)</label>
          <input name="couponCode" value={formData.couponCode} onChange={handleChange} type="text" placeholder="Enter code" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800" />
          <p className="text-[10px] text-gray-500 mt-1 font-medium">Leave empty for auto-generated code</p>
        </div>

        {formData.offerType === 'buy_get' ? (
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Buy Quantity <span className="text-red-500">*</span></label>
              <input name="buyQuantity" value={formData.buyQuantity} onChange={handleChange} type="number" placeholder="Buy Qty" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Get Quantity <span className="text-red-500">*</span></label>
              <input name="getQuantity" value={formData.getQuantity} onChange={handleChange} type="number" placeholder="Get Qty" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800" />
            </div>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select name="discountType" value={formData.discountType} onChange={handleChange} className="w-full appearance-none bg-white border border-gray-200 text-gray-800 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] text-sm font-medium cursor-pointer">
                  <option value="">Select discount type</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <input name="discountValue" value={formData.discountValue} onChange={handleChange} type="number" placeholder="Enter discount value" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800" />
              <p className="text-[10px] text-gray-500 mt-1 font-medium">For percentage: enter value between 1-100</p>
            </div>
          </>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Minimum Order Value (Optional)</label>
          <input name="minimumOrderValue" value={formData.minimumOrderValue} onChange={handleChange} type="number" placeholder="Enter minimum order value" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Validity Period <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input name="startDate" value={formData.startDate} onChange={handleChange} type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800" />
            </div>
            <span className="text-xs font-semibold text-gray-500">to</span>
            <div className="flex-1 relative">
              <input name="endDate" value={formData.endDate} onChange={handleChange} type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Status</label>
          <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1">
            <button onClick={() => setFormData({...formData, status: 'Active'})} className={`flex-1 py-1.5 text-sm font-semibold rounded-md shadow-sm transition-colors ${formData.status === 'Active' ? 'bg-[#E85D21] text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-white border border-transparent hover:border-gray-200'}`}>
              Active
            </button>
            <button onClick={() => setFormData({...formData, status: 'Scheduled'})} className={`flex-1 py-1.5 text-sm font-semibold rounded-md shadow-sm transition-colors ${formData.status === 'Scheduled' ? 'bg-[#E85D21] text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-white border border-transparent hover:border-gray-200'}`}>
              Scheduled
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-gray-100 flex gap-3">
        <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={handleSubmit} disabled={loading} className="flex-1 py-2.5 bg-[#E85D21] text-white text-sm font-bold rounded-lg hover:bg-[#d6511a] transition-colors disabled:opacity-50">
          {loading ? (offer ? 'Updating...' : 'Creating...') : (offer ? 'Update Offer' : 'Create Offer')}
        </button>
      </div>
    </div>
  );
};

export default OfferDetails;
