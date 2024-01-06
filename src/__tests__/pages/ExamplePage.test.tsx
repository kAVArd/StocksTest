// ExamplePage.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';

jest.mock('socket.io-client');

const mockStore = configureStore([]);

describe('ExamplePage', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({ ticker: {
      data: { AAPL: [] }
    } });
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <ExamplePage />
      </Provider>
    );
  });

  it('should handle input change', async () => {
    const { getByPlaceholderText, getByText, container } = render(
      <Provider store={store}>
        <ExamplePage />
      </Provider>
    );

    const input = getByPlaceholderText('Enter stock symbols');

    userEvent.type(input, "AAPL");

    expect(input).toHaveValue('AAPL');
  });
});
