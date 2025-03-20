import { useContext } from 'react';
import { SnackbarContext } from '../context/SnackbarContext';
import { SnackbarContextType } from '../context/SnackbarTypes';

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
