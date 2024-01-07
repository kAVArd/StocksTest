// ExamplePage.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';
import io from 'socket.io-client';

let mockEmitter = jest.fn();
let mockDisconnect = jest.fn();
let mockOn = jest.fn();
jest.mock('socket.io-client', () => {
  return jest.fn(() => ({
    emit: mockEmitter,
    on: mockOn,
    disconnect: mockDisconnect,
  }))
});

const mockStore = configureStore([]);

describe('ExamplePage', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({ ticker: {
      data: { AAPL: [] }
    } });

  });

  it('socket emit test', () => {
    render(
      <Provider store={store}>
        <ExamplePage />
      </Provider>
    );
  });

  it('should handle input change', async () => {
    const mockSocket = io('http://localhost:5000');

    const { getByPlaceholderText, getByText, container } = render(
      <Provider store={store}>
        <ExamplePage />
      </Provider>
    );

    const input = getByPlaceholderText('Enter stock symbols');

    userEvent.type(input, "AAPL");

    expect(input).toHaveValue('AAPL');

    userEvent.click(getByText('Get Data'));

    expect(mockSocket.emit).toHaveBeenCalledWith('ticker', 'AAPL');

    mockSocket.on('AAPL', (data: any) => {
      expect(data).toEqual([]);
    });

    userEvent.click(getByText('Stop fetching'));

    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
});
