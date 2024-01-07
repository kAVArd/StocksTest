export interface Ticker {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  last_trade_time: string;
  dividend: number;
  yield: number;
}
