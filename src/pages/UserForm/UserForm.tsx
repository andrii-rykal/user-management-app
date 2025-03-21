import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, selectUserById } from '../../store/userSlice';
import { UserFormData } from '../../types/User';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formValidation } from './UserForm.constants';
import { showSnackbar } from '../../store/snackbarSlice';

export const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(state =>
    id ? selectUserById(state, Number(id)) : null,
  );

  useEffect(() => {
    if (id && user) {
      reset(user);
    }
  }, [id, user, reset]);

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      if (id) {
        await dispatch(updateUser({ id: Number(id), user: data })).unwrap();
        dispatch(showSnackbar({ message: 'User successfully updated' }));
      } else {
        await dispatch(createUser(data)).unwrap();
        dispatch(showSnackbar({ message: 'User successfully created' }));
      }
      navigate('/users');
    } catch (error: unknown) {
      dispatch(
        showSnackbar({
          message: `Error saving user: ${error instanceof Error ? error.message : 'Please try again later.'}`,
          severity: 'error',
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit User' : 'Create User'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Name"
              {...register('name', formValidation.name)}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email', formValidation.email)}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Phone"
              {...register('phone', formValidation.phone)}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/users')}
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
