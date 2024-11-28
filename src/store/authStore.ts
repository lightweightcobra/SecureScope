import { create } from 'zustand';
import { Role, User, Group } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  groups: Group[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  addUserToGroup: (userId: string, groupId: string) => void;
  removeUserFromGroup: (userId: string, groupId: string) => void;
  createGroup: (group: Omit<Group, 'id'>) => void;
  updateGroupPermissions: (groupId: string, permissions: string[]) => void;
  createUser: (userData: { name: string; email: string; role: Role; password: string }) => void;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    groups: ['g1'],
    password: 'password', // In a real app, this would be hashed
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    groups: ['g2'],
    password: 'password',
  },
  {
    id: '3',
    email: 'mod@example.com',
    name: 'Moderator User',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    groups: ['g3'],
    password: 'password',
  },
];

// Mock groups data
const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'Administrators',
    description: 'Full system access',
    permissions: ['manage_users', 'manage_roles', 'manage_content', 'view_analytics'],
    members: ['1'],
  },
  {
    id: 'g2',
    name: 'Content Editors',
    description: 'Can edit and publish content',
    permissions: ['edit_content', 'publish_content'],
    members: ['2'],
  },
  {
    id: 'g3',
    name: 'Moderators',
    description: 'Can moderate content and users',
    permissions: ['moderate_content', 'moderate_users', 'view_analytics'],
    members: ['3'],
  },
];

// Role-specific permissions
const rolePermissions: Record<Role, string[]> = {
  admin: ['manage_users', 'manage_roles', 'manage_content', 'view_analytics'],
  moderator: ['manage_content', 'view_analytics'],
  user: ['view_content'],
};

// Avatar collection for new users
const avatarCollection = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  users: mockUsers,
  groups: mockGroups,

  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = get().users.find(u => u.email === email && u.password === password);
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  hasPermission: (permission: string) => {
    const { user, groups } = get();
    if (!user) return false;

    // Check role-based permissions
    if (rolePermissions[user.role]?.includes(permission)) return true;

    // Check group-based permissions
    const userGroups = groups.filter(g => user.groups.includes(g.id));
    return userGroups.some(group => group.permissions.includes(permission));
  },

  createUser: (userData) => {
    const { users } = get();
    const newUser: User = {
      id: `u${Date.now()}`,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      avatar: avatarCollection[Math.floor(Math.random() * avatarCollection.length)],
      groups: [],
      password: userData.password,
    };

    set({ users: [...users, newUser] });
    return newUser;
  },

  addUserToGroup: (userId: string, groupId: string) => {
    set(state => ({
      groups: state.groups.map(group =>
        group.id === groupId
          ? { ...group, members: [...new Set([...group.members, userId])] }
          : group
      ),
      users: state.users.map(user =>
        user.id === userId
          ? { ...user, groups: [...new Set([...user.groups, groupId])] }
          : user
      ),
    }));
  },

  removeUserFromGroup: (userId: string, groupId: string) => {
    set(state => ({
      groups: state.groups.map(group =>
        group.id === groupId
          ? { ...group, members: group.members.filter(id => id !== userId) }
          : group
      ),
      users: state.users.map(user =>
        user.id === userId
          ? { ...user, groups: user.groups.filter(id => id !== groupId) }
          : user
      ),
    }));
  },

  createGroup: (groupData) => {
    const newGroup: Group = {
      ...groupData,
      id: `g${Date.now()}`,
      members: [],
    };
    set(state => ({
      groups: [...state.groups, newGroup],
    }));
  },

  updateGroupPermissions: (groupId: string, permissions: string[]) => {
    set(state => ({
      groups: state.groups.map(group =>
        group.id === groupId
          ? { ...group, permissions }
          : group
      ),
    }));
  },
}));