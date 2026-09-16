import { combineReducers } from '@reduxjs/toolkit';

import burgerConstructorReducer from './slices/burger-constructor-slice';
import feedReducer from './slices/feed-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
});
