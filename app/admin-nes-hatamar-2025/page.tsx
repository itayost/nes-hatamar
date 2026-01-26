'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Coupon, CouponCreateInput } from '@/types/coupon';
import CouponTable from '@/components/admin/CouponTable';
import CouponForm from '@/components/admin/CouponForm';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Coupon | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadCoupons();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (!data.authenticated) {
        router.push('/admin-nes-hatamar-2025/login');
      }
    } catch {
      router.push('/admin-nes-hatamar-2025/login');
    }
  };

  const loadCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/coupons');
      if (!res.ok) throw new Error('Failed to load coupons');
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch {
      setError('שגיאה בטעינת קופונים');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin-nes-hatamar-2025/login');
    } catch {
      router.push('/admin-nes-hatamar-2025/login');
    }
  };

  const handleCreate = async (data: CouponCreateInput & { active?: boolean }) => {
    const res = await fetch('/api/admin/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create coupon');
    }

    setShowForm(false);
    await loadCoupons();
  };

  const handleUpdate = async (data: CouponCreateInput & { active?: boolean }) => {
    if (!editingCoupon) return;

    const res = await fetch('/api/admin/coupons', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingCoupon.id, ...data }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update coupon');
    }

    setEditingCoupon(null);
    await loadCoupons();
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteConfirm.id }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete coupon');
      }

      setDeleteConfirm(null);
      await loadCoupons();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete coupon');
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gold">ניהול נס התמר</h1>
              <p className="text-sm text-gray-500 mt-1">ניהול קופונים והזמנות</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-dark hover:bg-gold/10 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              יציאה
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
            <button onClick={() => setError('')} className="float-left text-red-500 hover:text-red-700">×</button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gold/20 flex justify-between items-center">
            <h2 className="text-xl font-bold text-dark">קופונים</h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-gold to-gold-light text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              קופון חדש
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-gold border-t-transparent"></div>
              </div>
            ) : (
              <CouponTable
                coupons={coupons}
                onEdit={(coupon) => setEditingCoupon(coupon)}
                onDelete={(coupon) => setDeleteConfirm(coupon)}
              />
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl font-bold text-gold">{coupons.length}</div>
            <div className="text-sm text-gray-500 mt-1">סה״כ קופונים</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl font-bold text-green-600">
              {coupons.filter(c => c.active && new Date(c.expirationDate) > new Date()).length}
            </div>
            <div className="text-sm text-gray-500 mt-1">קופונים פעילים</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl font-bold text-dark">
              {coupons.reduce((sum, c) => sum + c.currentUses, 0)}
            </div>
            <div className="text-sm text-gray-500 mt-1">סה״כ שימושים</div>
          </div>
        </div>
      </main>

      {showForm && (
        <CouponForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingCoupon && (
        <CouponForm
          coupon={editingCoupon}
          onSubmit={handleUpdate}
          onCancel={() => setEditingCoupon(null)}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-dark mb-2">מחיקת קופון</h3>
            <p className="text-gray-600 mb-6">
              האם אתה בטוח שברצונך למחוק את הקופון <span className="font-mono font-bold text-gold">{deleteConfirm.code}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 border-2 border-gold/20 text-dark rounded-lg hover:bg-gold/5 transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                מחק
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
