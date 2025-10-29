'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsletterSubscribePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      });

      // Redirect to news page after 3 seconds
      setTimeout(() => {
        router.push('/news');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-sky-600"
            >
              <path
                d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="font-['Zodiak'] text-3xl font-bold text-zinc-950 mb-2">
            Subscribe to Newsletter
          </h1>
          <p className="font-['Satoshi'] text-zinc-600 text-sm">
            Stay updated with the latest news and updates
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <p className="font-['Satoshi'] font-medium text-green-800 text-sm">
                  Thank you for subscribing!
                </p>
                <p className="font-['Satoshi'] text-green-700 text-xs mt-1">
                  Redirecting you back to news page...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="font-['Satoshi'] text-red-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block font-['Satoshi'] font-medium text-sm text-zinc-700 mb-1.5"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={loading || success}
              className="w-full px-4 py-2.5 font-['Satoshi'] text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:bg-zinc-100 disabled:cursor-not-allowed"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block font-['Satoshi'] font-medium text-sm text-zinc-700 mb-1.5"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={loading || success}
              className="w-full px-4 py-2.5 font-['Satoshi'] text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:bg-zinc-100 disabled:cursor-not-allowed"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-['Satoshi'] font-medium text-sm text-zinc-700 mb-1.5"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading || success}
              className="w-full px-4 py-2.5 font-['Satoshi'] text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:bg-zinc-100 disabled:cursor-not-allowed"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block font-['Satoshi'] font-medium text-sm text-zinc-700 mb-1.5"
            >
              Phone Number <span className="text-zinc-400 text-xs">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={loading || success}
              className="w-full px-4 py-2.5 font-['Satoshi'] text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:bg-zinc-100 disabled:cursor-not-allowed"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-['Satoshi'] font-medium text-sm py-3 px-4 rounded-lg transition-all disabled:bg-zinc-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
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
                Subscribing...
              </>
            ) : success ? (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Subscribed!
              </>
            ) : (
              'Subscribe to Newsletter'
            )}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => router.push('/news')}
            disabled={loading}
            className="w-full bg-white hover:bg-zinc-50 text-zinc-700 font-['Satoshi'] font-medium text-sm py-3 px-4 rounded-lg border border-zinc-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </form>

        {/* Privacy Notice */}
        <p className="font-['Satoshi'] text-xs text-zinc-500 text-center mt-6">
          We respect your privacy. Your information will only be used to send you updates and news.
        </p>
      </div>
    </div>
  );
}

