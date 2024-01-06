import { io } from 'socket.io-client';

let socket = null;

function tickerConnect(stockSymbol: string) {
  socket = io('http://localhost:4000');

  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });

  socket.on('connect_timeout', () => {
    console.error('Connection timeout');
  });

  socket.emit('ticker', stockSymbol);

  socket.on(stockSymbol, (data: any) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
}

export default tickerConnect;
