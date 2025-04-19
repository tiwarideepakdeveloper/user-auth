import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './user.actions';
import { initialUserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true
  })),
  on(logout, () => ({
    user: null,
    isLoggedIn: false
  }))
);
