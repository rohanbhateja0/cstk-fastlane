'use client';

import React, { useState } from 'react';
import { usePersonalize } from '@/components/context/PersonalizeContext';

export default function TestPersonalizeClient() {
  const [enrolledUser, setEnrolledUser] = useState<boolean>(false);
  const [userGroup, setUserGroup] = useState<string>('');
  const personalizeSdk = usePersonalize();

  const applySettings = async () => {
    if (!personalizeSdk) {
      console.error('Personalize SDK not initialized');
      return;
    }

    try {
      const attributes: Record<string, any> = {
        'IsEnrolledUser': enrolledUser
      };

      if (userGroup) {
        attributes['UserGroup'] = userGroup;
      }
      
      console.log('👤 Setting attributes:', attributes);
      
      await personalizeSdk.set(attributes);
      
      // Trigger conversion event for setting attributes
      await personalizeSdk.triggerEvent('attributes_applied');
      
      console.log('✅ Attributes set successfully:', attributes);
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
      
      await personalizeSdk.set({
        'IsEnrolledUser': false,
        'UserGroup': 'None'
      });
      
      // Trigger conversion event for clearing attributes
      await personalizeSdk.triggerEvent('attributes_cleared');
      
      setEnrolledUser(false);
      setUserGroup('');
      
      console.log('✅ Attributes cleared');
    } catch (error) {
      console.error('❌ Error clearing attributes:', error);
    }
  };

  return (
    <div className="container flex-grow max-w-[800px] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Test Personalization - Client Side</h1>
      <p className="text-gray-600 mb-8">
        This page uses the client-side Personalize SDK to set the <strong>IsEnrolledUser</strong> and <strong>UserGroup</strong> attributes.
      </p>

      {!personalizeSdk && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800">⚠️ Personalize SDK is not initialized yet. Please wait...</p>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold text-green-800 mb-3">Current Selection</h2>
        <div className="mb-2">
          <span className="text-green-700 font-medium">IsEnrolledUser: </span>
          <span className="font-mono bg-green-100 px-3 py-1 rounded text-lg">
            {enrolledUser ? '✅ true' : '❌ false'}
          </span>
        </div>
        <div className="mb-2">
          <span className="text-green-700 font-medium">UserGroup: </span>
          <span className="font-mono bg-green-100 px-3 py-1 rounded text-lg">
            {userGroup ? `👥 ${userGroup}` : '❌ Not set'}
          </span>
        </div>
        <p className="text-sm text-green-600 mt-3">
          Click "Apply" to set these attributes and personalize content.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <label className="flex items-center space-x-4 cursor-pointer">
            <input
              type="checkbox"
              checked={enrolledUser}
              onChange={(e) => setEnrolledUser(e.target.checked)}
              disabled={!personalizeSdk}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <div>
              <span className="text-lg font-medium text-gray-900">
                Is Enrolled User
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Check this box to mark the user as enrolled and see personalized content
              </p>
            </div>
          </label>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <div className="mb-3">
            <span className="text-lg font-medium text-gray-900">User Group</span>
            <p className="text-sm text-gray-500 mt-1">
              Select the user group to see group-specific personalized content
            </p>
          </div>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="userGroup"
                value="clinicians"
                checked={userGroup === 'clinicians'}
                onChange={(e) => setUserGroup(e.target.value)}
                disabled={!personalizeSdk}
                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <span className="text-gray-900">👨‍⚕️ Clinicians</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="userGroup"
                value="patients"
                checked={userGroup === 'patients'}
                onChange={(e) => setUserGroup(e.target.value)}
                disabled={!personalizeSdk}
                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <span className="text-gray-900">🧑‍🦱 Patients</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="userGroup"
                value=""
                checked={userGroup === ''}
                onChange={(e) => setUserGroup(e.target.value)}
                disabled={!personalizeSdk}
                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <span className="text-gray-500">None (No group)</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={applySettings}
            disabled={!personalizeSdk}
            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
          >
            {enrolledUser ? '✅ Set as Enrolled User' : 'Set as Non-Enrolled User'}
          </button>

          <button
            onClick={clearSettings}
            disabled={!personalizeSdk}
            className="px-6 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
          >
            Reset
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
            <li>Select "Is Enrolled User" checkbox and/or choose a "User Group"</li>
            <li>Click the button to apply the settings</li>
            <li>
              Navigate to{' '}
              <a href="/en-us/contactus" className="text-blue-600 hover:underline font-mono">
                /en-us/contactus
              </a>{' '}
              to see personalized content
            </li>
            <li>Check the browser console for logs showing the applied attributes</li>
          </ol>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Expected Behavior:</h3>
          <ul className="list-disc list-inside space-y-2 text-blue-700 text-sm">
            <li>
              <strong>IsEnrolledUser = true:</strong> Display personalized content for enrolled users
            </li>
            <li>
              <strong>IsEnrolledUser = false:</strong> Display base content (non-enrolled)
            </li>
            <li>
              <strong>UserGroup = clinicians:</strong> Display clinician-specific content
            </li>
            <li>
              <strong>UserGroup = patients:</strong> Display patient-specific content
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">📊 Event Tracking:</h3>
          <ul className="list-disc list-inside space-y-2 text-purple-700 text-sm">
            <li>
              <strong>Impressions:</strong> Automatically triggered when personalized content is shown on ContactUs page
            </li>
            <li>
              <strong>Conversions:</strong> Triggered when you apply or clear attributes
              <ul className="list-circle list-inside ml-4 mt-1">
                <li><code className="bg-purple-100 px-1 rounded">attributes_applied</code> - When settings are applied</li>
                <li><code className="bg-purple-100 px-1 rounded">attributes_cleared</code> - When settings are reset</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions:</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { setEnrolledUser(true); setTimeout(applySettings, 100); }}
            disabled={!personalizeSdk}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
          >
            ✅ Set Enrolled (true)
          </button>
          <button
            onClick={() => { setEnrolledUser(false); setTimeout(applySettings, 100); }}
            disabled={!personalizeSdk}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
          >
            ❌ Set Not Enrolled (false)
          </button>
        </div>
      </div>
    </div>
  );
}

