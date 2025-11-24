"use client";

import { useLytics } from '@/components/context/LyticsContext';
import { useEffect, useState } from 'react';

/**
 * Lytics Example Component
 * 
 * Demonstrates how to use the Lytics SDK in your components.
 * This example shows:
 * - Tracking custom events
 * - Identifying users
 * - Getting user ID
 * - Loading user profile
 */
export default function LyticsExample() {
  const lytics = useLytics();
  const [userId, setUserId] = useState<string>('');
  const [userProfile, setUserProfile] = useState<any>(null);

  // Get Lytics User ID on mount
  useEffect(() => {
    if (lytics) {
      lytics.getid((id) => {
        setUserId(id);
        console.log('Lytics User ID:', id);
      });
    }
  }, [lytics]);

  // Track a custom event
  const trackCustomEvent = () => {
    if (lytics) {
      lytics.send('example_button_clicked', {
        button_name: 'Example Button',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
      alert('Event tracked! Check your browser console and Lytics dashboard.');
    }
  };

  // Identify a user
  const identifyUser = () => {
    if (lytics) {
      lytics.identify({
        email: 'user@example.com',
        name: 'John Doe',
        user_type: 'premium',
        interests: ['technology', 'web development'],
      });
      alert('User identified! Check your Lytics dashboard.');
    }
  };

  // Track CTA click
  const trackCTAClick = () => {
    if (lytics) {
      lytics.send('cta_clicked', {
        cta_name: 'Get Started',
        cta_location: 'hero_banner',
        page: window.location.pathname,
      });
      alert('CTA click tracked!');
    }
  };

  // Track form submission
  const trackFormSubmit = () => {
    if (lytics) {
      lytics.send('form_submitted', {
        form_name: 'contact_form',
        form_type: 'lead_generation',
      });
      alert('Form submission tracked!');
    }
  };

  // Load user profile
  const loadUserProfile = () => {
    if (lytics) {
      lytics.loadEntity('user', (profile) => {
        setUserProfile(profile);
        console.log('User Profile:', profile);
      });
    }
  };

  // Manual page view tracking
  const trackPageView = () => {
    if (lytics) {
      lytics.pageView({
        page_title: 'Example Page',
        page_type: 'demo',
        category: 'examples',
      });
      alert('Page view tracked!');
    }
  };

  if (!lytics) {
    return (
      <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-xl font-bold mb-2">⚠️ Lytics Not Configured</h2>
        <p>
          Add <code className="bg-yellow-100 px-2 py-1 rounded">NEXT_PUBLIC_LYTICS_ACCOUNT_ID</code> to your <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code> file.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎯 Lytics Integration Example</h1>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800">✅ Lytics SDK is loaded and ready!</p>
        {userId && (
          <p className="text-sm text-green-700 mt-2">
            User ID: <code className="bg-green-100 px-2 py-1 rounded">{userId}</code>
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Event Tracking Examples */}
        <section className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📊 Event Tracking</h2>
          <p className="text-gray-600 mb-4">
            Track custom events to understand user behavior and measure conversions.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={trackCustomEvent}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Track Custom Event
            </button>
            
            <button
              onClick={trackCTAClick}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Track CTA Click
            </button>
            
            <button
              onClick={trackFormSubmit}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Track Form Submission
            </button>
            
            <button
              onClick={trackPageView}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Track Page View
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm font-mono text-gray-700">
              💡 <strong>Tip:</strong> Open your browser's Developer Tools → Network tab to see the tracking calls.
            </p>
          </div>
        </section>

        {/* User Identification */}
        <section className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">👤 User Identification</h2>
          <p className="text-gray-600 mb-4">
            Identify users to build rich profiles and enable personalization.
          </p>
          
          <button
            onClick={identifyUser}
            className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Identify User
          </button>

          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm font-mono text-gray-700">
              This sends user attributes to Lytics. In production, use real user data from your auth system.
            </p>
          </div>
        </section>

        {/* User Profile */}
        <section className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📋 User Profile</h2>
          <p className="text-gray-600 mb-4">
            Load and display the user's Lytics profile.
          </p>
          
          <button
            onClick={loadUserProfile}
            className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition mb-4"
          >
            Load User Profile
          </button>

          {userProfile && (
            <div className="p-4 bg-gray-50 rounded overflow-auto">
              <pre className="text-sm">
                {JSON.stringify(userProfile, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* Code Examples */}
        <section className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">💻 Code Examples</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Track an Event:</h3>
              <pre className="bg-white p-4 rounded border overflow-x-auto text-sm">
{`import { useLytics } from '@/components/context/LyticsContext';

function MyComponent() {
  const lytics = useLytics();

  const handleClick = () => {
    if (lytics) {
      lytics.send('button_clicked', {
        button_name: 'CTA',
        page: window.location.pathname
      });
    }
  };

  return <button onClick={handleClick}>Click Me</button>;
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold mb-2">Identify a User:</h3>
              <pre className="bg-white p-4 rounded border overflow-x-auto text-sm">
{`if (lytics) {
  lytics.identify({
    email: user.email,
    name: user.name,
    user_type: user.subscription
  });
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold mb-2">Get User ID:</h3>
              <pre className="bg-white p-4 rounded border overflow-x-auto text-sm">
{`lytics.getid((id) => {
  console.log('Lytics User ID:', id);
});`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


