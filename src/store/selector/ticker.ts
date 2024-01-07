import { State } from '../store';

export const getStockTickers = (state: State) => state.ticker.data;

export default {};
