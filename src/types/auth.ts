export type Role = 'admin' | 'moderator' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar: string;
  groups: string[];
  password: string; // In a real app, this would be hashed
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  members: string[];
}

export interface RoleDefinition {
  name: Role;
  permissions: string[];
  description: string;
  color: string;
}