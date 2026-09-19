import type { RootState } from '@services';
import type { TOrder } from '@utils-types';

export const selectOrderRequest = (state: RootState): boolean =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState): TOrder | null =>
  state.order.orderModalData;
export const selectOrderDetails = (state: RootState): TOrder | null =>
  state.order.orderDetails;
