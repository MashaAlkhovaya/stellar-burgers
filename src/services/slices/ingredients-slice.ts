import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { SerializedError } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils-types';

type TIngredientsState = {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: SerializedError | null;
};

const initialState: TIngredientsState = {
  isLoading: false,
  ingredients: [],
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default ingredientsSlice.reducer;
