import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from './hooks';
import userReducer from './userSlice';

describe('Redux hooks', () => {
  const store = configureStore({
    reducer: {
      users: userReducer,
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('useAppDispatch returns a dispatch function', () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: Wrapper,
    });
    expect(typeof result.current).toBe('function');
  });

  it('useAppSelector selects state correctly', () => {
    const { result } = renderHook(
      () => useAppSelector(state => state.users.loading),
      { wrapper: Wrapper },
    );
    expect(result.current).toBe(false);
  });
});
