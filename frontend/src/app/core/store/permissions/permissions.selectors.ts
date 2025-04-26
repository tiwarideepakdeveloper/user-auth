import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PermissionsState } from './permissions.state';

// 1. Select the feature state
export const selectPermissionsState = createFeatureSelector<PermissionsState>('permissions');

// 2. Select just the permissions list
export const selectPermissions = createSelector(
  selectPermissionsState,
  (state: PermissionsState) => state.permissions
);
