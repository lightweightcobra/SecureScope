import { create } from 'zustand';
import { Permission, defaultPermissions } from '../types/permissions';

interface PermissionState {
  permissions: Permission[];
  addPermission: (permission: Omit<Permission, 'id'>) => void;
  removePermission: (id: string) => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: defaultPermissions,
  
  addPermission: (permission) => {
    const newPermission: Permission = {
      ...permission,
      id: permission.name.toLowerCase().replace(/\s+/g, '_'),
    };
    
    set((state) => ({
      permissions: [...state.permissions, newPermission],
    }));
  },
  
  removePermission: (id) => {
    set((state) => ({
      permissions: state.permissions.filter((p) => p.id !== id),
    }));
  },
}));