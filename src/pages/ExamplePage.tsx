import React from 'react';
import connectStock from '../services/ticker';

function ExamplePage() {
  const next = () => {
    console.log('----start----');
    // this is just example of how to use the service to get stock data from streaming API
    connectStock('AAPL');
  };

  return (
    <div className="app ">
      <h1>Example Page</h1>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={next}>Get Data</button>
    </div>
  );
}

export default ExamplePage;
