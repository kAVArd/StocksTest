const FETCH_INTERVAL = 5000;
const PRETTY_PRINT_JSON = true;

const http = require('http');
const express = require('express');
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

function getRandomValBetween(min, max, precision) {
  min = min === undefined ? 0 : min;
  max = max === undefined ? 9007199254740992 : max;
  precision = precision === undefined ? 0 : precision;

  var random = Math.random() * (max - min) + min;

  return random.toFixed(precision);
}

function getUTCDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuote2(socket, ticker) {
  const quote = {};
  quote.ticker = ticker;
  quote.exchange = 'NASDAQ';
  quote.price = getRandomValBetween(100, 300, 2);
  quote.change = getRandomValBetween(0, 200, 2);
  quote.change_percent = getRandomValBetween(0, 1, 2);
  quote.last_trade_time = getUTCDate();
  quote.dividend = getRandomValBetween(0, 1, 2);
  quote.yield = getRandomValBetween(0, 2, 2);

  socket.emit(ticker, PRETTY_PRINT_JSON ? JSON.stringify(quote, null, 4) : JSON.stringify(quote));
}

function trackTicker(socket, ticker) {
  console.log('track Ticker');

  // run the first time immediately
  getQuote2(socket, ticker);

  // every N seconds
  const timer = setInterval(function() {
    getQuote2(socket, ticker);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('ticker', (ticker) => {
    // console.log('ticker:', msg);
    trackTicker(socket, ticker);
  });

  socket.on('disconnect', () => {
    console.log('Client is disconnected');
  });
});

// Устанавливаем маршрут для корневого URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

httpServer.listen(4000, () => {
  console.log('Server is started, port: 4000');
});
