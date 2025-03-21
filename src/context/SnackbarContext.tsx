import { createContext } from 'react';
import { SnackbarContextType } from './SnackbarTypes';

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);
