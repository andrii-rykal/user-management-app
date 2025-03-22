import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SnackbarContainer } from './SnackbarContainer';
import snackbarReducer from '../../store/snackbarSlice';

vi.mock('@mui/material', () => ({
  Snackbar: ({
    children,
    open,
  }: {
    children: React.ReactNode;
    open: boolean;
  }) => (open ? <div data-testid="snackbar">{children}</div> : null),
  Alert: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert">{children}</div>
  ),
}));

describe('SnackbarContainer', () => {
  it('renders snackbar with message', () => {
    const store = configureStore({
      reducer: { snackbar: snackbarReducer },
      preloadedState: {
        snackbar: {
          open: true,
          message: 'Test Message',
          severity: 'success' as const,
        },
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <SnackbarContainer />
      </Provider>,
    );

    expect(getByTestId('snackbar')).toBeInTheDocument();
    expect(getByTestId('alert')).toHaveTextContent('Test Message');
  });
});
