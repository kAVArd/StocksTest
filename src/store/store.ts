import { configureStore } from '@reduxjs/toolkit';

import tickerSlice from './slices/ticker';

const store = configureStore({ reducer: { ticker: tickerSlice.reducer } });

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
