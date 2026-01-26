'use client';

import { useState, useEffect } from 'react';
import { Coupon, CouponCreateInput, ProductType } from '@/types/coupon';

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
    applicableProducts: [] as ProductType[],
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
        applicableProducts: coupon.applicableProducts || [],
      });
    }
  }, [coupon]);

  const handleProductToggle = (product: ProductType) => {
    setFormData(prev => {
      const products = prev.applicableProducts.includes(product)
        ? prev.applicableProducts.filter(p => p !== product)
        : [...prev.applicableProducts, product];
      return { ...prev, applicableProducts: products };
    });
  };

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
        applicableProducts: formData.applicableProducts.length > 0 ? formData.applicableProducts : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשמירת הקופון');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gold/20">
          <h2 className="text-xl font-bold text-gold">
            {coupon ? 'עריכת קופון' : 'יצירת קופון'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              קוד קופון
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none uppercase"
              placeholder="לדוגמה: SUMMER20"
              required
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              סוג הנחה
            </label>
            <select
              value={formData.discountType}
              onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
              className="w-full px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none"
            >
              <option value="percentage">אחוזים (%)</option>
              <option value="fixed">סכום קבוע (₪)</option>
            </select>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              ערך הנחה {formData.discountType === 'percentage' ? '(%)' : '(₪)'}
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

          {/* Applicable Products */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              מוצרים מתאימים
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.applicableProducts.includes('book')}
                  onChange={() => handleProductToggle('book')}
                  className="w-5 h-5 text-gold rounded focus:ring-gold/20"
                />
                <span className="text-sm text-dark">ספר (₪550)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.applicableProducts.includes('course')}
                  onChange={() => handleProductToggle('course')}
                  className="w-5 h-5 text-gold rounded focus:ring-gold/20"
                />
                <span className="text-sm text-dark">קורס (₪1,600)</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              השאר ריק לכל המוצרים
            </p>
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              תאריך תפוגה
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
              מספר שימושים מקסימלי
            </label>
            <input
              type="number"
              value={formData.maxUses}
              onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none"
              placeholder="-1 ללא הגבלה"
              min="-1"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              הזן -1 לשימוש ללא הגבלה
            </p>
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
                פעיל
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
              ביטול
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-gradient-to-r from-gold to-gold-light text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'שומר...' : (coupon ? 'עדכן' : 'צור')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
