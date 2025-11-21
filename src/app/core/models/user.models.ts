export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  tenantId: number;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
  description: string;
}
