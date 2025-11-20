'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface FormData {
  email: string;
  phone: string;
  bookInterest: boolean;
  courseInterest: boolean;
}

export default function LeadCaptureForm() {
  const t = useTranslations('footer.leadForm');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    bookInterest: false,
    courseInterest: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  // Validate Israeli phone number format (05X-XXX-XXXX)
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional if email is provided
    const phoneRegex = /^05\d-?\d{3}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional if phone is provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation: At least email or phone required
    if (!formData.email && !formData.phone) {
      setErrorMessage(t('errorEmailOrPhone'));
      setStatus('error');
      return;
    }

    // Validation: At least one checkbox must be checked
    if (!formData.bookInterest && !formData.courseInterest) {
      setErrorMessage(t('errorCheckbox'));
      setStatus('error');
      return;
    }

    // Validate email format
    if (formData.email && !validateEmail(formData.email)) {
      setErrorMessage(t('errorEmailFormat'));
      setStatus('error');
      return;
    }

    // Validate phone format
    if (formData.phone && !validatePhone(formData.phone)) {
      setErrorMessage(t('errorPhoneFormat'));
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      // Clear form
      setFormData({
        email: '',
        phone: '',
        bookInterest: false,
        courseInterest: false,
      });

      // Auto-hide success message after 5 seconds
      // Clear any existing timeout first
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      successTimeoutRef.current = setTimeout(() => {
        setStatus('idle');
        successTimeoutRef.current = null;
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(t('error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Input */}
      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-dark mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          id="lead-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 border-2 border-border rounded-md focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder={t('emailPlaceholder')}
        />
      </div>

      {/* Phone Input */}
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-medium text-dark mb-2">
          {t('phone')}
        </label>
        <input
          type="tel"
          id="lead-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 border-2 border-border rounded-md focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder={t('phonePlaceholder')}
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="lead-book-interest"
            name="bookInterest"
            checked={formData.bookInterest}
            onChange={handleChange}
            disabled={status === 'loading'}
            className="mt-1 w-5 h-5 text-gold border-border rounded focus:ring-gold/20 focus:ring-2 disabled:cursor-not-allowed"
          />
          <label htmlFor="lead-book-interest" className="text-sm text-dark cursor-pointer">
            {t('bookInterest')}
          </label>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="lead-course-interest"
            name="courseInterest"
            checked={formData.courseInterest}
            onChange={handleChange}
            disabled={status === 'loading'}
            className="mt-1 w-5 h-5 text-gold border-border rounded focus:ring-gold/20 focus:ring-2 disabled:cursor-not-allowed"
          />
          <label htmlFor="lead-course-interest" className="text-sm text-dark cursor-pointer">
            {t('courseInterest')}
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-gold text-white font-semibold rounded-md hover:bg-gold/90 disabled:bg-gold/50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{t('submitting')}</span>
          </>
        ) : (
          t('submit')
        )}
      </button>

      {/* Success Message */}
      {status === 'success' && (
        <div role="alert" className="p-4 bg-green-50 border-2 border-green-200 rounded-md text-green-800 text-sm animate-fadeIn">
          {t('success')}
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div role="alert" className="p-4 bg-red-50 border-2 border-red-200 rounded-md text-red-800 text-sm animate-fadeIn">
          {errorMessage || t('error')}
        </div>
      )}
    </form>
  );
}
