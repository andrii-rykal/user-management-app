import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { UserList } from './UserList';
import userReducer from '../../store/userSlice';

vi.mock('../../hooks/useSnackbar', () => ({
  useSnackbar: () => ({
    showSnackbar: vi.fn(),
  }),
}));

vi.mock('../../components/UserTable/UserTable', () => ({
  UserTable: ({
    users,
    onDelete,
    loading,
  }: {
    users: { id: number; name: string }[];
    onDelete: (id: number) => void;
    loading: boolean;
  }) => (
    <div data-testid="user-table" data-loading={loading}>
      {users.map((user: { id: number; name: string }) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button
            data-testid={`delete-button-${user.id}`}
            onClick={() => onDelete(user.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../../components/DeleteConfirmDialog/DeleteConfirmDialog', () => ({
  DeleteConfirmDialog: ({
    open,
    onClose,
    onConfirm,
  }: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }) => {
    if (!open) return null;
    return (
      <div data-testid="mock-dialog" role="dialog">
        <button onClick={onClose}>Cancel</button>
        <button
          data-testid="confirm-delete"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Delete
        </button>
      </div>
    );
  },
}));

describe('UserList', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
  };

  const renderUserList = (initialState = {}) => {
    const store = configureStore({
      reducer: { users: userReducer },
      preloadedState: {
        users: {
          users: [mockUser],
          loading: false,
          error: null,
          currentUser: null,
          ...initialState,
        },
      },
    });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>,
    );
  };

  it('renders header and create button', () => {
    renderUserList();
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Create User')).toBeInTheDocument();
  });

  it('shows error alert when error state exists', () => {
    renderUserList({ error: 'Failed to load users' });
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load users');
  });

  it('opens delete confirmation dialog on delete click', () => {
    renderUserList();
    const deleteButton = screen.getByTestId(`delete-button-${mockUser.id}`);
    fireEvent.click(deleteButton);
    expect(screen.getByTestId('mock-dialog')).toBeInTheDocument();
  });

  it('handles delete confirmation', async () => {
    const mockDispatch = vi.fn().mockResolvedValueOnce({
      type: 'users/deleteUser/fulfilled',
      payload: mockUser.id,
    });

    const store = configureStore({
      reducer: { users: userReducer },
      preloadedState: {
        users: {
          users: [mockUser],
          loading: false,
          error: null,
          currentUser: null,
        },
      },
    });
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByTestId(`delete-button-${mockUser.id}`));

    const confirmButton = screen.getByTestId('confirm-delete');
    await fireEvent.click(confirmButton);

    expect(mockDispatch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByTestId('mock-dialog')).not.toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    renderUserList({ loading: true });
    expect(screen.getByTestId('user-table')).toHaveAttribute(
      'data-loading',
      'true',
    );
  });
});
