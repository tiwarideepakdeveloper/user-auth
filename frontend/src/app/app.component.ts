import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { loginSuccess } from './core/store/user/user.actions';
import { Store } from '@ngrx/store';
import { setPermissions } from './core/store/permissions/permissions.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  
  constructor(
    private authService: AuthService, 
    private store: Store,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.authService.getProfile().subscribe({
        next: (response) => {
          this.store.dispatch(loginSuccess({ user: response.data }));
          let permissions = response.data.user_roles.flatMap((role) => role.permissions).map((perm) => perm.permission_name);
          this.store.dispatch(setPermissions({ permissions: permissions }));
          this.toastr.success(response.message, 'Success');
        },
        error: (err) => {
          localStorage.removeItem('token');
          this.toastr.error(err, 'Error');
          this.router.navigate(['/auth/sign-in']);
        }
      });
    }
    return;
  }
}
