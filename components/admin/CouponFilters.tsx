'use client';

export type StatusFilter = 'all' | 'active' | 'inactive' | 'expired' | 'exhausted';
export type ProductFilter = 'all' | 'book' | 'course';

interface CouponFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  productFilter: ProductFilter;
  onProductFilterChange: (product: ProductFilter) => void;
}

export default function CouponFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  productFilter,
  onProductFilterChange,
}: CouponFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <input
            type="text"
            placeholder="חיפוש לפי קוד..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pe-10 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none"
          />
          <svg
            className="absolute top-1/2 end-3 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
        className="px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none bg-white min-w-[140px]"
      >
        <option value="all">כל הסטטוסים</option>
        <option value="active">פעיל</option>
        <option value="inactive">לא פעיל</option>
        <option value="expired">פג תוקף</option>
        <option value="exhausted">מוצה</option>
      </select>

      {/* Product Filter */}
      <select
        value={productFilter}
        onChange={(e) => onProductFilterChange(e.target.value as ProductFilter)}
        className="px-4 py-2 border-2 border-gold/20 rounded-lg focus:border-gold focus:outline-none bg-white min-w-[140px]"
      >
        <option value="all">כל המוצרים</option>
        <option value="book">ספר</option>
        <option value="course">קורס</option>
      </select>

      {/* Clear Filters Button */}
      {(searchQuery || statusFilter !== 'all' || productFilter !== 'all') && (
        <button
          onClick={() => {
            onSearchChange('');
            onStatusFilterChange('all');
            onProductFilterChange('all');
          }}
          className="px-4 py-2 text-sm text-gray-600 hover:text-dark hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          נקה סינון
        </button>
      )}
    </div>
  );
}
