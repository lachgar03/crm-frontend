// src/app/shared/directives/has-permission.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);

  @Input() set appHasPermission(requiredPermission: string) {
    // Use Angular Signals effect or computed logic
    const user = this.authService.currentUser();

    // Logic assumes your backend returns a list of permissions in AuthResponse
    // If it only returns Roles, map Roles to Permissions here or in AuthService
    const hasPermission = user?.roles.some(role =>
      // Simplified check - ideally backend sends flattened permissions list
      role === 'ROLE_SUPER_ADMIN'
    );

    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
