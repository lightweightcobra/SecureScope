import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Shield, Users } from 'lucide-react';

const availablePermissions = [
  { id: 'manage_users', name: 'Manage Users' },
  { id: 'manage_roles', name: 'Manage Roles' },
  { id: 'manage_content', name: 'Manage Content' },
  { id: 'view_analytics', name: 'View Analytics' },
  { id: 'edit_content', name: 'Edit Content' },
  { id: 'publish_content', name: 'Publish Content' },
  { id: 'moderate_content', name: 'Moderate Content' },
  { id: 'moderate_users', name: 'Moderate Users' },
];

export default function GroupManagement() {
  const { groups, users, createGroup, updateGroupPermissions } = useAuthStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '', permissions: [] as string[] });

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    createGroup(newGroup);
    setNewGroup({ name: '', description: '', permissions: [] });
    setIsCreating(false);
  };

  const handlePermissionChange = (groupId: string, permission: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    const newPermissions = group.permissions.includes(permission)
      ? group.permissions.filter(p => p !== permission)
      : [...group.permissions, permission];

    updateGroupPermissions(groupId, newPermissions);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Group Management</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Users className="h-4 w-4 mr-2" />
          Create Group
        </button>
      </div>

      {isCreating && (
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
                  <fieldset>
                    <legend className="text-sm font-medium text-gray-700">Permissions</legend>
                    <div className="mt-2 space-y-2">
                      {availablePermissions.map((permission) => (
                        <div key={permission.id} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={`permission-${permission.id}`}
                              name={`permission-${permission.id}`}
                              type="checkbox"
                              checked={newGroup.permissions.includes(permission.id)}
                              onChange={(e) => {
                                const newPermissions = e.target.checked
                                  ? [...newGroup.permissions, permission.id]
                                  : newGroup.permissions.filter(p => p !== permission.id);
                                setNewGroup({ ...newGroup, permissions: newPermissions });
                              }}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`permission-${permission.id}`} className="font-medium text-gray-700">
                              {permission.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
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
                  onClick={() => setIsCreating(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{group.description}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {group.members.length} members
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Permissions</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {availablePermissions.map((permission) => (
                      <label
                        key={permission.id}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                          group.permissions.includes(permission.id)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={group.permissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(group.id, permission.id)}
                        />
                        <Shield className="h-4 w-4 mr-1" />
                        {permission.name}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Members</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {users
                      .filter((user) => group.members.includes(user.id))
                      .map((user) => (
                        <div
                          key={user.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-4 w-4 rounded-full mr-2"
                          />
                          {user.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}