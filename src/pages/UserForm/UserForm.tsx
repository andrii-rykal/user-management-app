import { useState } from 'react';
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
import { createUser, updateUser } from '../../store/userSlice';
import { useSnackbar } from '../../hooks/useSnackbar';
import { UserFormData } from '../../types/User';
import { useAppDispatch } from '@/store/hooks';

export const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      if (id) {
        await dispatch(updateUser({ id: Number(id), user: data })).unwrap();
        showSnackbar('User successfully updated');
      } else {
        await dispatch(createUser(data)).unwrap();
        showSnackbar('User successfully created');
      }
      navigate('/users');
    } catch (error: unknown) {
      console.error('Failed to save user:', error);
      showSnackbar('Error saving user. Please try again later.', 'error');
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
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters long',
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email format',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Phone"
              {...register('phone', {
                pattern: {
                  value:
                    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: 'Invalid phone number format',
                },
              })}
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
