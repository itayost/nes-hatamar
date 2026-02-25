'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateBookPrice, BOOK_PACKAGES } from '@/lib/book-pricing';
import { calculateShipping } from '@/lib/shipping-calculator';
import { isValidPhone } from '@/lib/phone-validation';
import { COUNTRIES, DEFAULT_COUNTRY_CODE } from '@/lib/countries';

type ProductType = 'book' | 'course';

interface PurchaseFormProps {
  product: ProductType;
  basePrice: number;
}

export default function PurchaseForm({ product, basePrice }: PurchaseFormProps) {
  const t = useTranslations('purchase');
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    couponCode: '',
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    apartmentFloor: '',
    city: '',
    postalCode: '',
    country: DEFAULT_COUNTRY_CODE,
  });

  const [quantity, setQuantity] = useState(1);

  const [couponState, setCouponState] = useState<{
    validated: boolean;
    valid: boolean;
    discount?: { type: 'percentage' | 'fixed'; value: number; finalPrice: number };
    error?: string;
  }>({ validated: false, valid: false });

  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Calculate price based on quantity (for books only)
  const priceInfo = useMemo(() => {
    if (product === 'book') {
      return calculateBookPrice(quantity);
    }
    return { totalPrice: basePrice, unitPrice: basePrice, savings: 0, quantity: 1 };
  }, [product, quantity, basePrice]);

  const currentBasePrice = priceInfo.totalPrice;

  // Calculate shipping (books only)
  const shippingResult = useMemo(() => {
    if (product === 'book') {
      return calculateShipping(quantity);
    }
    return { shippingCost: 0, isFreeShipping: true, threshold: 5 };
  }, [product, quantity]);

  const priceAfterDiscount = couponState.valid && couponState.discount
    ? couponState.discount.finalPrice
    : currentBasePrice;

  const finalPrice = priceAfterDiscount + shippingResult.shippingCost;

  const discountAmount = currentBasePrice - priceAfterDiscount;

  const validateCoupon = async () => {
    if (!formData.couponCode.trim()) return;

    setValidatingCoupon(true);
    setCouponState({ validated: false, valid: false });

    try {
      const res = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formData.couponCode,
          product,
          quantity: product === 'book' ? quantity : undefined,
        }),
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

  // Re-validate coupon when quantity changes (for books)
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    // Reset coupon state when quantity changes
    if (couponState.validated) {
      setCouponState({ validated: false, valid: false });
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
          shippingAddress: product === 'book' ? shippingAddress : undefined,
          couponCode: couponState.valid ? formData.couponCode : undefined,
          quantity: product === 'book' ? quantity : undefined,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quantity Selector (Books only) */}
      {product === 'book' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark mb-2">
            {t('form.quantity')} <span className="text-red-500">*</span>
          </label>
          <select
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors bg-white"
          >
            {BOOK_PACKAGES.map((pkg) => {
              const price = calculateBookPrice(pkg.quantity);
              const label = pkg.quantity === 1 ? t('form.quantityOne') : t('form.quantityMany', { count: pkg.quantity });
              return (
                <option key={pkg.quantity} value={pkg.quantity}>
                  {label} - ₪{price.totalPrice.toLocaleString()}
                  {price.savings > 0 && ` (${t('form.savings')} ₪${price.savings.toLocaleString()})`}
                </option>
              );
            })}
          </select>
          {priceInfo.savings > 0 && (
            <p className="text-sm text-green-600">
              {t('form.volumeDiscount', { savings: priceInfo.savings.toLocaleString() })}
            </p>
          )}
        </div>
      )}

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

      {/* Shipping Address (Books only) */}
      {product === 'book' && (
        <div className="pt-6 space-y-4 border-t border-gold/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-dark">
              {t('form.shippingAddress')}
            </h3>
            {!shippingResult.isFreeShipping && (
              <span className="text-sm text-gold font-medium">
                {t('form.freeShippingIncentive', { threshold: shippingResult.threshold })}
              </span>
            )}
          </div>

          {/* Street */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              {t('form.street')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={shippingAddress.street}
              onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
              placeholder={t('form.streetPlaceholder')}
              required
            />
          </div>

          {/* Apartment/Floor */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              {t('form.apartmentFloor')}
            </label>
            <input
              type="text"
              value={shippingAddress.apartmentFloor}
              onChange={(e) => setShippingAddress({ ...shippingAddress, apartmentFloor: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
              placeholder={t('form.apartmentFloorPlaceholder')}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              {t('form.country')} <span className="text-red-500">*</span>
            </label>
            <select
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors bg-white"
              required
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {locale === 'he' ? c.nameHe : c.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* City and Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                {t('form.city')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
                placeholder={t('form.cityPlaceholder')}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                {t('form.postalCode')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
                placeholder={t('form.postalCodePlaceholder')}
                required
                dir="ltr"
              />
            </div>
          </div>
        </div>
      )}

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
        {product === 'book' && quantity > 1 ? (
          <>
            <div className="flex justify-between text-dark">
              <span>{t('summary.unitPrice')}</span>
              <span>₪{priceInfo.unitPrice.toLocaleString()} × {quantity}</span>
            </div>
            <div className="flex justify-between text-dark">
              <span>{t('summary.subtotal')}</span>
              <span>₪{currentBasePrice.toLocaleString()}</span>
            </div>
            {priceInfo.savings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{t('summary.volumeSavings')}</span>
                <span>-₪{priceInfo.savings.toLocaleString()}</span>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-between text-dark">
            <span>{product === 'book' ? t('summary.bookPrice') : t('summary.coursePrice')}</span>
            <span>₪{currentBasePrice.toLocaleString()}</span>
          </div>
        )}

        {discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>{t('summary.couponDiscount')}</span>
            <span>-₪{discountAmount.toLocaleString()}</span>
          </div>
        )}

        {/* Shipping row (books only) */}
        {product === 'book' && (
          <div className="flex justify-between text-dark">
            <span>
              {t('summary.shipping')}
              {shippingResult.isFreeShipping && (
                <span className="mr-2 text-green-600 text-sm font-medium">
                  ✓ {t('summary.freeShipping')}
                </span>
              )}
            </span>
            <span>
              {shippingResult.isFreeShipping ? (
                <>
                  <span className="line-through text-gray-400 ml-2">₪40</span>
                  <span className="text-green-600 font-medium"> ₪0</span>
                </>
              ) : (
                `₪${shippingResult.shippingCost.toLocaleString()}`
              )}
            </span>
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
        disabled={
          submitting ||
          !formData.name ||
          !formData.email ||
          !isValidPhone(formData.phone) ||
          (product === 'book' && (
            !shippingAddress.street.trim() ||
            !shippingAddress.city.trim() ||
            shippingAddress.postalCode.trim().length < 3
          ))
        }
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
