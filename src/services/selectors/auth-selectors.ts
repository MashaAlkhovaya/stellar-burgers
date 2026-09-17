import type { RootState } from '@services';
import type { TUser } from '@utils-types';

export const selectUser = (state: RootState): TUser | null => state.auth.user;
export const selectIsAuthenticated = (state: RootState): boolean =>
  Boolean(state.auth.user);
export const selectIsAuthChecked = (state: RootState): boolean =>
  state.auth.isAuthChecked;
export const selectAuthError = (state: RootState): string =>
  state.auth.error?.message ?? '';
