'use client';

import { useState, useEffect } from 'react';
import { Coupon, CouponCreateInput } from '@/types/coupon';

interface CouponFormProps {
  coupon?: Coupon | null;
  onSubmit: (data: CouponCreateInput & { active?: boolean }) => Promise<void>;
  onCancel: () => void;
}

export default function CouponForm({ coupon, onSubmit, onCancel }: CouponFormProps) {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    expirationDate: '',
    maxUses: '',
    active: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: String(coupon.discountValue),
        expirationDate: coupon.expirationDate.split('T')[0],
        maxUses: coupon.maxUses === -1 ? '-1' : String(coupon.maxUses),
        active: coupon.active,
      });
    }
  }, [coupon]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit({
        code: formData.code,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        expirationDate: new Date(formData.expirationDate).toISOString(),
        maxUses: formData.maxUses === '-1' ? -1 : Number(formData.maxUses),
        active: formData.active,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gold/20">
          <h2 className="text-xl font-bold text-gold">
            {coupon ? 'Edit Coupon' : 'Create Coupon'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Coupon Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none uppercase"
              placeholder="e.g., SUMMER20"
              required
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Discount Type
            </label>
            <select
              value={formData.discountType}
              onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
              className="w-full px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₪)</option>
            </select>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Discount Value {formData.discountType === 'percentage' ? '(%)' : '(₪)'}
            </label>
            <input
              type="number"
              value={formData.discountValue}
              onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none"
              placeholder={formData.discountType === 'percentage' ? '10' : '100'}
              min="1"
              max={formData.discountType === 'percentage' ? '100' : '10000'}
              required
            />
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Expiration Date
            </label>
            <input
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Max Uses */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Max Uses (-1 for unlimited)
            </label>
            <input
              type="number"
              value={formData.maxUses}
              onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none"
              placeholder="-1"
              min="-1"
              required
            />
          </div>

          {/* Active Toggle (only for edit) */}
          {coupon && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-5 h-5 text-gold rounded focus:ring-gold/20"
              />
              <label htmlFor="active" className="text-sm font-medium text-dark">
                Active
              </label>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 border-2 border-gold/20 text-dark rounded-lg hover:bg-gold/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-gradient-to-r from-gold to-gold-light text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Saving...' : (coupon ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
