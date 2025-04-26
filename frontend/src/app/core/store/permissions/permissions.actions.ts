import { createAction, props } from '@ngrx/store';

export const setPermissions = createAction(
  '[Permissions] Set Permissions',
  props<{ permissions: string[] }>()
);
