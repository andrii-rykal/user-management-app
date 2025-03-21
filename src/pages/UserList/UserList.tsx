import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteUser } from '../../store/userSlice';
import { UserTable } from '../../components/UserTable/UserTable';
import { DeleteConfirmDialog } from '../../components/DeleteConfirmDialog/DeleteConfirmDialog';
import { useSnackbar } from '../../hooks/useSnackbar';

export const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.users);
  const [userToDelete, setUserToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const { showSnackbar } = useSnackbar();

  // Видалено useEffect з fetchUsers

  const handleEdit = (id: number) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setUserToDelete({ id, name: user.name });
    }
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await dispatch(deleteUser(userToDelete.id)).unwrap();
        showSnackbar('User successfully deleted');
        setUserToDelete(null);
      } catch (error: unknown) {
        console.error('Error deleting user:', error);
        showSnackbar('Error deleting user', 'error');
      }
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/users/new')}
        sx={{ mb: 3 }}
      >
        Create User
      </Button>

      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <DeleteConfirmDialog
        open={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
        userName={userToDelete?.name}
        loading={loading}
      />
    </Box>
  );
};
