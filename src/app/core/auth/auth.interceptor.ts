// src/app/core/auth/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { TenantService } from '../services/tenant.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tenantService = inject(TenantService);

  const token = authService.getAccessToken();
  const subdomain = tenantService.getTenantHeader();

  let headers = req.headers;

  // 1. Add Bearer Token if logged in
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  // 2. Add Tenant Header (Critical for TenantResolutionFilter)
  if (subdomain) {
    headers = headers.set('X-Tenant-Subdomain', subdomain);
  }

  const clonedReq = req.clone({ headers });
  return next(clonedReq);
};
