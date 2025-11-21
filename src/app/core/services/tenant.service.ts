// src/app/core/services/tenant.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TenantService {
  // Signal to reactively access current subdomain
  readonly subdomain = signal<string | null>(null);

  constructor() {
    this.resolveTenantFromUrl();
  }

  private resolveTenantFromUrl() {
    const host = window.location.hostname; // e.g., "client1.crm.com"
    const parts = host.split('.');

    // Logic depends on your domain structure.
    // If localhost: "client1.localhost"
    if (parts.length > 0 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      this.subdomain.set(parts[0]);
    } else {
      // Fallback for local development (e.g. manual override)
      this.subdomain.set(localStorage.getItem('tenant_subdomain'));
    }
  }

  getTenantHeader(): string {
    return this.subdomain() || '';
  }
}
