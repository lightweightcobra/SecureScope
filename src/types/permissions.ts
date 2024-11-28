export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'user' | 'content' | 'system' | 'analytics';
}

export const defaultPermissions: Permission[] = [
  {
    id: 'manage_users',
    name: 'Manage Users',
    description: 'Create, update, and delete user accounts',
    category: 'user'
  },
  {
    id: 'manage_roles',
    name: 'Manage Roles',
    description: 'Create and modify user roles',
    category: 'user'
  },
  {
    id: 'manage_content',
    name: 'Manage Content',
    description: 'Create, edit, and delete content',
    category: 'content'
  },
  {
    id: 'view_analytics',
    name: 'View Analytics',
    description: 'Access system analytics and reports',
    category: 'analytics'
  },
  {
    id: 'edit_content',
    name: 'Edit Content',
    description: 'Modify existing content',
    category: 'content'
  },
  {
    id: 'publish_content',
    name: 'Publish Content',
    description: 'Make content publicly available',
    category: 'content'
  },
  {
    id: 'moderate_content',
    name: 'Moderate Content',
    description: 'Review and moderate user-generated content',
    category: 'content'
  },
  {
    id: 'moderate_users',
    name: 'Moderate Users',
    description: 'Manage user behavior and interactions',
    category: 'user'
  }
];