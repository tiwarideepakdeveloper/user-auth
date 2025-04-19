import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../../store/user/user.actions';
import { LoginRequest, LoginResponse } from '../../models/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthEndPoints } from '../../enums/api.enum';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store, private http: HttpClient) { }

  login(loginRequest: LoginRequest) : Observable <LoginResponse> {
    return this.http.post<LoginResponse>(AuthEndPoints.SIGN_IN, loginRequest);
  }
  
  getProfile() : Observable <LoginResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<LoginResponse>(AuthEndPoints.USER_PROFILE, {headers});
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(logout());
  }
}
