// store/user/user.state.ts
import { User } from '../../models/user.model';

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

export const initialUserState: UserState = {
  user: null,
  isLoggedIn: false
};
