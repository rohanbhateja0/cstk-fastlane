"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@/core/types/components/UserList';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building } from 'lucide-react';
import { generateSlug } from '@/core/lib/utils';

export default function ProviderDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        
        // Find user by slug (matching either name or username)
        const foundUser = users.find((u: User) => 
          generateSlug(u.name) === slug || generateSlug(u.username) === slug
        );
        
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError('Provider not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchUser();
    }
  }, [slug]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <div className="ml-6 space-y-2">
                  <div className="h-6 bg-gray-300 rounded w-64"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/providers" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Providers
          </Link>
          <div className="text-center py-12">
            <div className="text-red-500 text-xl font-semibold mb-2">
              {error || 'Provider not found'}
            </div>
            <p className="text-gray-600 mb-4">
              The provider you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/providers"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Providers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/providers" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Providers
        </Link>

        {/* Provider Detail Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div className="ml-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-blue-100 text-lg">@{user.username}</p>
                <p className="text-blue-200 text-sm mt-1">{user.company.name}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <a 
                      href={`mailto:${user.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-3" />
                    <a 
                      href={`tel:${user.phone}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {user.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-gray-400 mr-3" />
                    <a 
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  Company Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">{user.company.name}</p>
                    <p className="text-sm text-gray-600 italic">"{user.company.catchPhrase}"</p>
                    <p className="text-xs text-gray-500 mt-1">{user.company.bs}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Address
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  {user.address.street} {user.address.suite}<br />
                  {user.address.city}, {user.address.zipcode}
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Coordinates: {user.address.geo.lat}, {user.address.geo.lng}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
              <a 
                href={`mailto:${user.email}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
              <a 
                href={`tel:${user.phone}`}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              <a 
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
