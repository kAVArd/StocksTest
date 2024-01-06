/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getStockTickers } from '../../store/selector/ticker';
import StockTable from '../../components/StockTable';
import useStockConnectHook from '../../hooks/useStockConnectHook';
import './ExamplePage.css';

function ExamplePage() {
  const { connectStock, disconnectStock } = useStockConnectHook();
  const [searchInput, setSearchInput] = useState('');
  const tickers = useSelector(getStockTickers);

  const getDataClick = () => {
    if (!searchInput) {
      return;
    }

    connectStock(searchInput);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!newValue) {
      disconnectStock();
    }

    setSearchInput(newValue);
  };

  const currentTickers = tickers[searchInput] ?? [];

  return (
    <div className="app">
      <h1>Stock page</h1>
      <div className="inputsRow">
        <input
          type="text"
          data-testid="symbolsInput"
          placeholder="Enter stock symbols"
          className="symbolsInput"
          value={searchInput}
          onChange={handleInput}
        />
        <button data-testid="fetchButton" className="button" onClick={getDataClick}>Get Data</button>
        <button data-testid="stopButton" className="button redButton" onClick={disconnectStock}>Stop fetching</button>
      </div>
      <StockTable tickers={currentTickers} />
    </div>
  );
}

export default ExamplePage;
