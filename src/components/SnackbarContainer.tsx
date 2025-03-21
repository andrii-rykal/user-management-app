import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { hideSnackbar } from '../store/snackbarSlice';

export const SnackbarContainer = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector(state => state.snackbar);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => dispatch(hideSnackbar())}
    >
      <Alert onClose={() => dispatch(hideSnackbar())} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
