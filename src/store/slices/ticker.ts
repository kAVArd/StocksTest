/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ticker } from '../../types/Ticker';

interface TickerState {
  data: { [key: string]: Ticker[] };
}

const initialState: TickerState = { data: {} };

const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    setTickerData(state, action: PayloadAction<{ stockSymbol: string; ticker: Ticker }>) {
      const { stockSymbol, ticker } = action.payload;

      const newTickers = [ticker, ...(state.data[stockSymbol] ?? [])];
      state.data[stockSymbol] = newTickers;
    },
  },
});

export default {
  reducer: tickerSlice.reducer,
  actions: tickerSlice.actions,
};
