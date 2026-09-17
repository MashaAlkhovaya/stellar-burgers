import type { RootState } from '@services';
import type { TFeedState, TOrder } from '@utils-types';

export const selectFeedOrders = (state: RootState): TOrder[] => state.feed.orders;
export const selectUserOrders = (state: RootState): TOrder[] => state.feed.userOrders;
export const selectFeed = (state: RootState): TFeedState => state.feed;
