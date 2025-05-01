import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { logout } from '../../core/store/user/user.actions';
import { Router } from '@angular/router';
import { setPermissions } from '../../core/store/permissions/permissions.actions';

@Component({
  selector: 'app-drop-down',
  imports: [
    NgIf
  ],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  isOpen = false;
  
  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ){}

  changePassword() {
    
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        localStorage.removeItem('token');
        this.store.dispatch(logout());
        this.store.dispatch(setPermissions({ permissions: [] }));
        this.router.navigate(['/auth/sign-in']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /** When Click out side of this component drop down will be hidden */
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if(!this.isOpen) return;
    this.isOpen = !!this.elementRef.nativeElement.contains(targetElement);
  }
}
