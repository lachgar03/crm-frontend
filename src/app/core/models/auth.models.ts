export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  tenantId: number;
  username: string;
  roles: string[];
  tenantName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  tenantSubdomain?: string; // Optional, usually derived from URL
}
