'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type ProductType = 'book' | 'course';

interface PurchaseFormProps {
  product: ProductType;
  basePrice: number;
}

export default function PurchaseForm({ product, basePrice }: PurchaseFormProps) {
  const t = useTranslations('purchase');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    couponCode: '',
  });

  const [couponState, setCouponState] = useState<{
    validated: boolean;
    valid: boolean;
    discount?: { type: 'percentage' | 'fixed'; value: number; finalPrice: number };
    error?: string;
  }>({ validated: false, valid: false });

  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const finalPrice = couponState.valid && couponState.discount
    ? couponState.discount.finalPrice
    : basePrice;

  const discountAmount = basePrice - finalPrice;

  const validateCoupon = async () => {
    if (!formData.couponCode.trim()) return;

    setValidatingCoupon(true);
    setCouponState({ validated: false, valid: false });

    try {
      const res = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: formData.couponCode, product }),
      });

      const data = await res.json();

      if (data.valid) {
        setCouponState({
          validated: true,
          valid: true,
          discount: data.discount,
        });
      } else {
        setCouponState({
          validated: true,
          valid: false,
          error: data.error || t('form.couponInvalid'),
        });
      }
    } catch {
      setCouponState({
        validated: true,
        valid: false,
        error: t('form.couponError'),
      });
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          couponCode: couponState.valid ? formData.couponCode : undefined,
        }),
      });

      const data = await res.json();

      if (data.success && data.paymentUrl) {
        // Redirect to payment page
        window.location.href = data.paymentUrl;
      } else {
        setError(data.error || t('form.submitError'));
      }
    } catch {
      setError(t('form.submitError'));
    } finally {
      setSubmitting(false);
    }
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^05[0-9](\d{7}|\d{3}-\d{4})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            {t('form.name')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
            placeholder={t('form.namePlaceholder')}
            required
            minLength={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            {t('form.email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
            placeholder={t('form.emailPlaceholder')}
            required
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            {t('form.phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
            placeholder={t('form.phonePlaceholder')}
            required
            dir="ltr"
          />
          {formData.phone && !isValidPhone(formData.phone) && (
            <p className="text-sm text-red-500 mt-1">{t('form.phoneInvalid')}</p>
          )}
        </div>
      </div>

      {/* Coupon Code */}
      <div className="pt-4 border-t border-gold/20">
        <label className="block text-sm font-medium text-dark mb-2">
          {t('form.couponCode')}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.couponCode}
            onChange={(e) => {
              setFormData({ ...formData, couponCode: e.target.value.toUpperCase() });
              setCouponState({ validated: false, valid: false });
            }}
            className="flex-1 px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors uppercase"
            placeholder={t('form.couponPlaceholder')}
            dir="ltr"
          />
          <button
            type="button"
            onClick={validateCoupon}
            disabled={!formData.couponCode.trim() || validatingCoupon}
            className="px-6 py-3 bg-gold/10 text-gold font-medium rounded-xl hover:bg-gold/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {validatingCoupon ? '...' : t('form.applyCoupon')}
          </button>
        </div>

        {couponState.validated && (
          <div className={`mt-2 text-sm ${couponState.valid ? 'text-green-600' : 'text-red-500'}`}>
            {couponState.valid
              ? t('form.couponApplied', {
                  discount: couponState.discount?.type === 'percentage'
                    ? `${couponState.discount.value}%`
                    : `₪${couponState.discount?.value}`
                })
              : couponState.error}
          </div>
        )}
      </div>

      {/* Price Summary */}
      <div className="bg-gold/5 rounded-xl p-6 space-y-3">
        <div className="flex justify-between text-dark">
          <span>{product === 'book' ? t('summary.bookPrice') : t('summary.coursePrice')}</span>
          <span>₪{basePrice.toLocaleString()}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>{t('summary.discount')}</span>
            <span>-₪{discountAmount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-lg font-bold text-dark pt-3 border-t border-gold/20">
          <span>{t('summary.total')}</span>
          <span className="text-gold">₪{finalPrice.toLocaleString()}</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting || !formData.name || !formData.email || !isValidPhone(formData.phone)}
        className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-white text-lg font-bold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg"
      >
        {submitting ? t('form.processing') : t('form.submit')}
      </button>

      <p className="text-center text-sm text-gray-500">
        {t('form.securePayment')}
      </p>
    </form>
  );
}
