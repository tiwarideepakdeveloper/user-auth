import { Permission } from "../../models/user.model";

export interface PermissionsState {
  permissions: string[];
}

export const initialState: PermissionsState = {
  permissions: []
};