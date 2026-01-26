'use client';

import { Coupon } from '@/types/coupon';

export type SortField = 'code' | 'createdAt' | 'expirationDate' | 'currentUses';

interface CouponTableProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
  sortField?: SortField;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: SortField) => void;
}

export default function CouponTable({
  coupons,
  onEdit,
  onDelete,
  sortField,
  sortDirection,
  onSort
}: CouponTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const getStatusBadge = (coupon: Coupon) => {
    if (!coupon.active) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">לא פעיל</span>;
    }
    if (isExpired(coupon.expirationDate)) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">פג תוקף</span>;
    }
    if (coupon.maxUses !== -1 && coupon.currentUses >= coupon.maxUses) {
      return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full">מוצה</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">פעיל</span>;
  };

  const getProductsText = (coupon: Coupon) => {
    if (!coupon.applicableProducts || coupon.applicableProducts.length === 0) {
      return 'הכל';
    }
    return coupon.applicableProducts
      .map(p => p === 'book' ? 'ספר' : 'קורס')
      .join(', ');
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => {
    const isActive = sortField === field;
    return (
      <th
        onClick={() => onSort?.(field)}
        className={`text-right py-3 px-4 text-sm font-semibold text-dark cursor-pointer hover:bg-gold/5 transition-colors select-none ${
          onSort ? 'cursor-pointer' : ''
        }`}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          {isActive && (
            <svg
              className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </span>
      </th>
    );
  };

  if (coupons.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg className="w-16 h-16 mx-auto mb-4 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <p className="text-lg font-medium">אין קופונים עדיין</p>
        <p className="text-sm mt-1">צור קופון חדש כדי להתחיל</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gold/20">
            <SortHeader field="code">קוד</SortHeader>
            <th className="text-right py-3 px-4 text-sm font-semibold text-dark">הנחה</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-dark">מוצרים</th>
            <SortHeader field="expirationDate">תוקף</SortHeader>
            <SortHeader field="currentUses">שימושים</SortHeader>
            <th className="text-right py-3 px-4 text-sm font-semibold text-dark">סטטוס</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-dark">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
              <td className="py-3 px-4">
                <span className="font-mono font-bold text-gold">{coupon.code}</span>
              </td>
              <td className="py-3 px-4">
                {coupon.discountType === 'percentage'
                  ? `${coupon.discountValue}%`
                  : `₪${coupon.discountValue}`}
              </td>
              <td className="py-3 px-4 text-sm">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  !coupon.applicableProducts || coupon.applicableProducts.length === 0
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {getProductsText(coupon)}
                </span>
              </td>
              <td className="py-3 px-4 text-sm">
                <span className={isExpired(coupon.expirationDate) ? 'text-red-500' : ''}>
                  {formatDate(coupon.expirationDate)}
                </span>
              </td>
              <td className="py-3 px-4 text-sm">
                {coupon.maxUses === -1
                  ? `${coupon.currentUses} / ∞`
                  : `${coupon.currentUses} / ${coupon.maxUses}`}
              </td>
              <td className="py-3 px-4">
                {getStatusBadge(coupon)}
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(coupon)}
                    className="p-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
                    title="עריכה"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(coupon)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="מחיקה"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
