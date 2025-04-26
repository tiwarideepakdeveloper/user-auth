import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectPermissions } from '../../store/permissions/permissions.selectors';

@Directive({
  selector: '[appCan]'
})
export class CanDirective implements OnDestroy {

  private subscription: Subscription | undefined;
  private requiredPermission: string = '';
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) { }

  @Input() set appCan(permission: string) {
    this.requiredPermission = permission;
    this.subscribeToPermissions();
  }
  private subscribeToPermissions() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.store.pipe(select(selectPermissions)).subscribe(permissions => {
      if (permissions.includes(this.requiredPermission)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
