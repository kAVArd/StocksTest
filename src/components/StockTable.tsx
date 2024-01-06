import React from 'react';
import { Ticker } from '../types/Ticker';
import './StockTable.css';
import { formatDate } from '../util/date';

interface TickerTableProps {
  tickers: Ticker[];
}

function StockTable({ tickers }: TickerTableProps) {
  if (!tickers.length) {
    return null;
  }

  const getPriceDifference = (ticker: Ticker, index: number, array: Ticker[]) => {
    if (index === array.length - 1) {
      return ticker.change;
    }

    const previousPrice = array[index + 1].price;
    const currentPrice = ticker.price;

    return currentPrice - previousPrice;
  };

  return (
    <table className="table" id="stockTable">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Exchange</th>
          <th>Price</th>
          <th>Change</th>
          <th>Change Percent</th>
          <th>Last Trade Time</th>
          <th>Dividend</th>
          <th>Yield</th>
        </tr>
      </thead>
      <tbody>
        {tickers.map((ticker, index) => (
          <tr key={`${ticker.ticker}/${ticker.last_trade_time}/${ticker.price}`}>
            <td>{ticker.ticker}</td>
            <td>{ticker.exchange}</td>
            <td className={getPriceDifference(ticker, index, tickers) >= 0 ? 'priceUp' : 'priceDown'}>{ticker.price}</td>
            <td>{ticker.change}</td>
            <td>{ticker.change_percent}</td>
            <td>{formatDate(ticker.last_trade_time)}</td>
            <td>{ticker.dividend}</td>
            <td>{ticker.yield}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockTable;
