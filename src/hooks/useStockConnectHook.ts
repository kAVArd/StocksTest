import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import socket from '../services/socket';
import tickerSlice from '../store/slices/ticker';
import { Ticker } from '../types/Ticker';

const useStockConnectHook = () => {
  const dispatch = useDispatch();

  const connectStock = (stockSymbol: string) => {
    socket.connect('http://localhost:4000');
    socket.emit('ticker', stockSymbol);
    socket.on(stockSymbol, (data: any) => {
      const ticker = JSON.parse(data) as Ticker;
      dispatch(tickerSlice.actions.setTickerData({ stockSymbol, ticker }));
    });
  };

  useEffect(() => {
    return () => {
      if (socket.isConnected()) {
        socket.disconnect();
      }
    };
  }, []);

  return {
    connectStock,
    disconnectStock: () => socket.disconnect(),
  };
};

export default useStockConnectHook;
