'use client';

import React, { useState, useEffect } from 'react';
import { usePersonalize } from '@/components/context/PersonalizeContext';

export default function TestPersonalizeClient() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentCountry, setCurrentCountry] = useState<string | null>(null);
  const [enrolledUser, setEnrolledUser] = useState<boolean>(false);
  const [currentEnrolledUser, setCurrentEnrolledUser] = useState<boolean>(false);
  const personalizeSdk = usePersonalize();

  useEffect(() => {
    // Load current settings from localStorage
    const savedCountry = localStorage.getItem('test_country_client');
    if (savedCountry) {
      setCurrentCountry(savedCountry);
      setSelectedCountry(savedCountry);
    }

    const savedEnrolled = localStorage.getItem('test_enrolled_user_client');
    if (savedEnrolled) {
      const isEnrolled = savedEnrolled === 'true';
      setCurrentEnrolledUser(isEnrolled);
      setEnrolledUser(isEnrolled);
    }
  }, []);

  const applySettings = async () => {
    if (!personalizeSdk) {
      console.error('Personalize SDK not initialized');
      return;
    }

    try {
      const attributes: any = {};
      
      if (selectedCountry) {
        attributes.COUNTRY = selectedCountry;
        console.log('🌍 Setting COUNTRY attribute:', selectedCountry);
      }
      
      // Always set Enrolled User attribute (true/false)
      attributes['Enrolled User'] = enrolledUser;
      console.log('👤 Setting "Enrolled User" attribute:', enrolledUser);
      
      // Set both attributes using Personalize SDK
      await personalizeSdk.set(attributes);
      
      // Save to localStorage
      if (selectedCountry) {
        localStorage.setItem('test_country_client', selectedCountry);
        setCurrentCountry(selectedCountry);
      }
      localStorage.setItem('test_enrolled_user_client', String(enrolledUser));
      setCurrentEnrolledUser(enrolledUser);
      
      console.log('✅ Attributes set successfully:', attributes);
      console.log('🔄 Reloading page to apply changes...');
      
      // Reload to apply personalization
      window.location.reload();
    } catch (error) {
      console.error('❌ Error setting attributes:', error);
    }
  };

  const clearSettings = async () => {
    if (!personalizeSdk) {
      console.error('Personalize SDK not initialized');
      return;
    }

    try {
      console.log('🗑️ Clearing all attributes');
      
      // Clear the attributes
      await personalizeSdk.set({
        COUNTRY: '',
        'Enrolled User': false,
      });
      
      // Remove from localStorage
      localStorage.removeItem('test_country_client');
      localStorage.removeItem('test_enrolled_user_client');
      setCurrentCountry(null);
      setSelectedCountry('');
      setCurrentEnrolledUser(false);
      setEnrolledUser(false);
      
      console.log('✅ Attributes cleared');
      console.log('🔄 Reloading page to apply changes...');
      
      // Reload to apply changes
      window.location.reload();
    } catch (error) {
      console.error('❌ Error clearing attributes:', error);
    }
  };

  const countries = [
    'Canada',
    'United States of America',
    'United Kingdom',
    'Germany',
    'France',
    'Japan',
    'Australia',
    'Mexico',
  ];

  return (
    <div className="container flex-grow max-w-[800px] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Test Personalization (Client-Side)</h1>
      <p className="text-gray-600 mb-8">
        This page uses the client-side Personalize SDK to set the COUNTRY attribute.
      </p>

      {!personalizeSdk && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800">⚠️ Personalize SDK is not initialized yet. Please wait...</p>
        </div>
      )}

      {(currentCountry || currentEnrolledUser) && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-3">Current Settings</h2>
          {currentCountry && (
            <div className="mb-2">
              <span className="text-green-700 font-medium">Country: </span>
              <span className="font-mono bg-green-100 px-2 py-1 rounded">{currentCountry}</span>
            </div>
          )}
          <div className="mb-2">
            <span className="text-green-700 font-medium">Enrolled User: </span>
            <span className="font-mono bg-green-100 px-2 py-1 rounded">
              {currentEnrolledUser ? 'Yes ✅' : 'No'}
            </span>
          </div>
          <p className="text-sm text-green-600 mt-3">
            You should see personalized content based on these settings on the ContactUs page.
          </p>
        </div>
      )}

      {!currentCountry && !currentEnrolledUser && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">No Settings Applied</h2>
          <p className="text-blue-700">
            Select a country and/or enrollment status below to test personalized content.
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Select Country
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!personalizeSdk}
          >
            <option value="">-- Select a Country --</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enrolledUser}
              onChange={(e) => setEnrolledUser(e.target.checked)}
              disabled={!personalizeSdk}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <span className="text-sm font-medium text-gray-700">
              Enrolled User
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-8">
            Check this box to mark the user as enrolled
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={applySettings}
            disabled={!personalizeSdk}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Apply Settings
          </button>

          {(currentCountry || currentEnrolledUser) && (
            <button
              onClick={clearSettings}
              disabled={!personalizeSdk}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Clear All Settings
            </button>
          )}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
            <li>Select a country from the dropdown above</li>
            <li>Check/uncheck the "Enrolled User" checkbox</li>
            <li>Click "Apply Settings" to set the attributes</li>
            <li>The page will reload automatically</li>
            <li>
              Navigate to{' '}
              <a href="/contactus" className="text-blue-600 hover:underline font-mono">
                /contactus
              </a>{' '}
              to see personalized content
            </li>
            <li>Check the browser console for debug logs</li>
          </ol>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Expected Behavior:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
            <li>
              <strong>Canada:</strong> Should show Canada-specific variants
            </li>
            <li>
              <strong>United States of America:</strong> Should show US-specific variants
            </li>
            <li>
              <strong>Enrolled User = Yes:</strong> Should show enrolled user variants
            </li>
            <li>
              <strong>Other Settings:</strong> Should show base entries (default content)
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Test Presets:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setSelectedCountry('Canada'); setEnrolledUser(false); setTimeout(applySettings, 100); }}
            disabled={!personalizeSdk}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            🇨🇦 Canada
          </button>
          <button
            onClick={() => { setSelectedCountry('United States of America'); setEnrolledUser(false); setTimeout(applySettings, 100); }}
            disabled={!personalizeSdk}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            🇺🇸 United States of America
          </button>
          <button
            onClick={() => { setSelectedCountry(''); setEnrolledUser(true); setTimeout(applySettings, 100); }}
            disabled={!personalizeSdk}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ✅ Enrolled User
          </button>
          <button
            onClick={() => { setSelectedCountry('Canada'); setEnrolledUser(true); setTimeout(applySettings, 100); }}
            disabled={!personalizeSdk}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            🇨🇦 + ✅ Canada + Enrolled
          </button>
        </div>
      </div>
    </div>
  );
}

