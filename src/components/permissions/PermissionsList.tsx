import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { Permission } from '../../types/permissions';

interface PermissionsListProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onTogglePermission: (permissionId: string) => void;
  showDescription?: boolean;
}

export default function PermissionsList({
  permissions,
  selectedPermissions,
  onTogglePermission,
  showDescription = true
}: PermissionsListProps) {
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 capitalize">{category} Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoryPermissions.map((permission) => (
              <label
                key={permission.id}
                className={`relative flex items-start p-3 rounded-lg border ${
                  selectedPermissions.includes(permission.id)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                } cursor-pointer`}
              >
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => onTogglePermission(permission.id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <Shield className={`h-4 w-4 mr-1 ${
                      selectedPermissions.includes(permission.id)
                        ? 'text-indigo-500'
                        : 'text-gray-400'
                    }`} />
                    <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                  </div>
                  {showDescription && (
                    <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}