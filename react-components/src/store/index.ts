import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchSlice';
import formReducer from './reducers/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
