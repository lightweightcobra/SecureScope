import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { Permission } from '../../types/permissions';

interface CreatePermissionProps {
  onCreatePermission: (permission: Omit<Permission, 'id'>) => void;
  onCancel: () => void;
}

export default function CreatePermission({ onCreatePermission, onCancel }: CreatePermissionProps) {
  const [permission, setPermission] = useState<Omit<Permission, 'id'>>({
    name: '',
    description: '',
    category: 'system'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePermission(permission);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Create New Permission</h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Permission Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={permission.name}
              onChange={(e) => setPermission({ ...permission, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              required
              value={permission.description}
              onChange={(e) => setPermission({ ...permission, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={permission.category}
              onChange={(e) => setPermission({ ...permission, category: e.target.value as Permission['category'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="user">User Management</option>
              <option value="content">Content Management</option>
              <option value="system">System</option>
              <option value="analytics">Analytics</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create Permission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}