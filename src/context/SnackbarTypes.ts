import { ReactNode } from 'react';

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarContextType {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
}

export interface SnackbarProviderProps {
  children: ReactNode;
}
