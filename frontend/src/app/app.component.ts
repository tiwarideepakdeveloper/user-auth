import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { loginSuccess } from './core/store/user/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SchoolFrontend';
  
  constructor(
    private authService: AuthService, 
    private store: Store
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.authService.getProfile().subscribe({
        next: (response) => {
          this.store.dispatch(loginSuccess({ user: response.data }));
        },
        error: (err) => {
          localStorage.removeItem('token');
        }
      });
    }
    return;
  }
}
