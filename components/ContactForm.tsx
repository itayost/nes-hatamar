'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('purchase.form');
  const tMessages = useTranslations('purchase');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '1',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission - replace with actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', quantity: '1', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
          {t('name')} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-border rounded-md focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
          {t('email')} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-border rounded-md focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
          {t('phone')} *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-border rounded-md focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
        />
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-dark mb-2">
          {t('quantity')} *
        </label>
        <select
          id="quantity"
          name="quantity"
          required
          value={formData.quantity}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-border rounded-md focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors bg-white"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-border rounded-md focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-4 bg-gold text-white font-semibold text-lg rounded-md hover:bg-gold/90 disabled:bg-gold/50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
      >
        {status === 'loading' ? '...' : t('submit')}
      </button>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-md text-green-800 text-center">
          {tMessages('success')}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-md text-red-800 text-center">
          {tMessages('error')}
        </div>
      )}
    </form>
  );
}
