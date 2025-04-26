import { createReducer, on } from '@ngrx/store';
import { setPermissions } from './permissions.actions';
import { initialState } from './permissions.state';

export const permissionsReducer = createReducer(
  initialState,
  on(setPermissions, (state, { permissions }) => ({
    ...state,
    permissions
  }))
);
