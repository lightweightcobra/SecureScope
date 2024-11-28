import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { usePermissionStore } from '../../store/permissionStore';
import { Shield, Plus } from 'lucide-react';
import CreatePermission from '../permissions/CreatePermission';
import PermissionsList from '../permissions/PermissionsList';
import { Permission } from '../../types/permissions';

export default function AdminDashboard() {
  const { users, groups, createGroup } = useAuthStore();
  const { permissions, addPermission } = usePermissionStore();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCreatePermission, setShowCreatePermission] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    createGroup(newGroup);
    setNewGroup({ name: '', description: '', permissions: [] });
    setShowCreateGroup(false);
  };

  const handleCreatePermission = (permission: Omit<Permission, 'id'>) => {
    addPermission(permission);
    setShowCreatePermission(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <div className="space-x-3">
          <button
            onClick={() => setShowCreatePermission(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Permission
          </button>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            Create Group
          </button>
        </div>
      </div>

      {showCreatePermission && (
        <CreatePermission
          onCreatePermission={handleCreatePermission}
          onCancel={() => setShowCreatePermission(false)}
        />
      )}

      {showCreateGroup && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleCreateGroup}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Group Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Permissions</label>
                  <div className="mt-2">
                    <PermissionsList
                      permissions={permissions}
                      selectedPermissions={newGroup.permissions}
                      onTogglePermission={(permissionId) => {
                        const newPermissions = newGroup.permissions.includes(permissionId)
                          ? newGroup.permissions.filter(p => p !== permissionId)
                          : [...newGroup.permissions, permissionId];
                        setNewGroup({ ...newGroup, permissions: newPermissions });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-x-3">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Create Group
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateGroup(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Groups</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">{groups.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Permissions</h3>
          <p className="mt-2 text-3xl font-semibold text-purple-600">{permissions.length}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">All Permissions</h3>
          <PermissionsList
            permissions={permissions}
            selectedPermissions={[]}
            onTogglePermission={() => {}}
            showDescription={true}
          />
        </div>
      </div>
    </div>
  );
}