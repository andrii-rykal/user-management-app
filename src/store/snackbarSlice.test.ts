import { describe, it, expect } from 'vitest';
import snackbarReducer, { showSnackbar, hideSnackbar } from './snackbarSlice';

describe('snackbarSlice', () => {
  const initialState = {
    open: false,
    message: '',
    severity: 'success' as const,
  };

  it('should handle initial state', () => {
    expect(snackbarReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle showSnackbar', () => {
    const message = 'Test message';
    const actual = snackbarReducer(initialState, showSnackbar({ message }));
    expect(actual.message).toEqual(message);
    expect(actual.open).toEqual(true);
  });

  it('should handle hideSnackbar', () => {
    const state = { ...initialState, open: true };
    const actual = snackbarReducer(state, hideSnackbar());
    expect(actual.open).toEqual(false);
  });
});
