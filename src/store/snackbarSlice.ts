import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'success' as AlertColor,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; severity?: AlertColor }>,
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'success';
      state.open = true;
    },
    hideSnackbar: state => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
