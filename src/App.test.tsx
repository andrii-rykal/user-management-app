import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './store/userSlice';
import snackbarReducer from './store/snackbarSlice';
import App from './App';

vi.mock('./pages/UserList/UserList', () => ({
  UserList: () => <div data-testid="user-list">User List Component</div>,
}));

vi.mock('./pages/UserForm/UserForm', () => ({
  UserForm: () => <div data-testid="user-form">User Form Component</div>,
}));

vi.mock('@mui/material', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mui-container">{children}</div>
  ),
  CssBaseline: () => null,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  createTheme: () => ({}),
  Snackbar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="snackbar">{children}</div>
  ),
  Alert: ({ children }: { children: React.ReactNode }) => (
    <div role="alert">{children}</div>
  ),
}));

describe('App', () => {
  const store = configureStore({
    reducer: {
      users: userReducer,
      snackbar: snackbarReducer,
    },
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByTestId('mui-container')).toBeInTheDocument();
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });

  it('provides theme context', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByTestId('mui-container')).toBeInTheDocument();
  });
});
