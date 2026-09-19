import type { RootState } from '@services';
import type { TConstructorState } from '@utils-types';

export const selectConstructorItems = (state: RootState): TConstructorState =>
  state.burgerConstructor;
