import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { SerializedError } from '@reduxjs/toolkit';
import type { TFeedState, TOrder } from '@utils-types';

type TFeedSliceState = TFeedState & {
  userOrders: TOrder[];
  isOrdersLoading: boolean;
  ordersError: SerializedError | null;
};

const initialState: TFeedSliceState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  userOrders: [],
  isOrdersLoading: false,
  ordersError: null,
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

export const fetchUserOrders = createAsyncThunk('feed/fetchUserOrders', async () => {
  const orders = await getOrdersApi();
  return orders;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.ordersError = action.error;
      });
  },
});

export default feedSlice.reducer;
