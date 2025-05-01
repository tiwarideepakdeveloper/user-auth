import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignInRequest, AuthResponse, SignUpRequest } from '../../models/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthEndPoints } from '../../enums/api.enum';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private store: Store, private http: HttpClient) { }

  signIn(signInRequest: SignInRequest) : Observable <AuthResponse> {
    return this.http.post<AuthResponse>(AuthEndPoints.SIGN_IN, signInRequest);
  }
  
  signUp(signUpRequest: SignUpRequest) : Observable <AuthResponse> {
    return this.http.post<AuthResponse>(AuthEndPoints.SIGN_UP, signUpRequest);
  }

  getProfile() : Observable <AuthResponse> {
    return this.http.get<AuthResponse>(AuthEndPoints.USER_PROFILE);
  }

  logout() : Observable <AuthResponse> {
    return this.http.post<AuthResponse>(AuthEndPoints.SIGN_OUT, {});
  }
}
