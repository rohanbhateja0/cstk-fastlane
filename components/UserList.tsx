'use client';

import React, { useState, useEffect } from 'react';
import { CMSLink } from '@/core/atoms/Link';
import { UserListFields, User } from '@/core/types/components/UserList';
import { BaseComponent } from '@/core/types/components/BaseComponent';
import { generateSlug } from '@/core/lib/utils';

type UserListProps = BaseComponent & {
  userList: UserListFields;
};

export default function UserList({ userList, page }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const { content, rendering_options } = userList;
  const { title, description } = content;
  const { 
    layout = 'grid', 
    items_per_row = '3', 
    show_company = true, 
    show_address = false, 
    show_contact = true 
  } = rendering_options;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        setUsers(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getGridCols = () => {
    const cols = parseInt(items_per_row) || 3;
    const colMap: { [key: number]: string } = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };
    return colMap[cols] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  const renderUserCard = (user: User) => (
    <CMSLink 
      key={user.id} 
      href={`/providers/${generateSlug(user.name)}`}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">@{user.username}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        
        {show_contact && (
          <p className="text-sm text-gray-700">
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
        )}
        
        {show_contact && (
          <p className="text-sm text-gray-700">
            <span className="font-medium">Website:</span> 
            <span className="text-blue-600 ml-1">
              {user.website}
            </span>
          </p>
        )}
        
        {show_company && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.company.name}</p>
            <p className="text-xs text-gray-600 italic">"{user.company.catchPhrase}"</p>
          </div>
        )}
        
        {show_address && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Address:</span>
            </p>
            <p className="text-xs text-gray-600">
              {user.address.street} {user.address.suite}<br />
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        )}
      </div>
      
      {/* View Details indicator */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-sm text-blue-600 font-medium text-center">
          View Details →
        </p>
      </div>
    </CMSLink>
  );

  const renderUserListItem = (user: User) => (
    <CMSLink 
      key={user.id} 
      href={`/providers/${generateSlug(user.name)}`}
      className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">@{user.username} • {user.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          {show_company && (
            <div className="text-right mr-4">
              <p className="text-sm font-medium text-gray-900">{user.company.name}</p>
              <p className="text-xs text-gray-600">{user.phone}</p>
            </div>
          )}
          <div className="text-blue-600 font-medium">
            View Details →
          </div>
        </div>
      </div>
    </CMSLink>
  );

  if (loading) {
    return (
      <div className="py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">Error Loading Users</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            )}
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        )}
        
        <div className={layout === 'grid' ? `grid ${getGridCols()} gap-6` : 'space-y-4'}>
          {users.map(user => 
            layout === 'grid' ? renderUserCard(user) : renderUserListItem(user)
          )}
        </div>
      </div>
    </div>
  );
}
