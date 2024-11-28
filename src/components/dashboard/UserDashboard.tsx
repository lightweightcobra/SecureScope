import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Shield } from 'lucide-react';

export default function UserDashboard() {
  const { user, groups } = useAuthStore();
  const userGroups = groups.filter(group => user?.groups.includes(group.id));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Dashboard</h2>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-16 w-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">My Groups</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userGroups.map(group => (
                <div key={group.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                    <h5 className="font-medium text-gray-900">{group.name}</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  <div className="space-y-1">
                    <h6 className="text-xs font-medium text-gray-700">Permissions:</h6>
                    <div className="flex flex-wrap gap-2">
                      {group.permissions.map(permission => (
                        <span
                          key={permission}
                          className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800"
                        >
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}