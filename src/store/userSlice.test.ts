import { describe, it, expect } from 'vitest';
import userReducer, {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  clearCurrentUser,
  fetchUserById,
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    users: [],
    loading: false,
    error: null,
    currentUser: null,
  };

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchUsers.pending', () => {
    const state = userReducer(initialState, { type: fetchUsers.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchUsers.fulfilled', () => {
    const mockUsers = [mockUser];
    const state = userReducer(initialState, {
      type: fetchUsers.fulfilled.type,
      payload: mockUsers,
    });
    expect(state.users).toEqual(mockUsers);
    expect(state.loading).toBe(false);
  });

  it('should handle createUser.fulfilled', () => {
    const state = userReducer(initialState, {
      type: createUser.fulfilled.type,
      payload: mockUser,
    });
    expect(state.users).toContain(mockUser);
  });

  it('should handle updateUser.fulfilled', () => {
    const initialStateWithUser = {
      ...initialState,
      users: [mockUser],
    };
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const state = userReducer(initialStateWithUser, {
      type: updateUser.fulfilled.type,
      payload: updatedUser,
    });
    expect(state.users[0]).toEqual(updatedUser);
  });

  it('should handle deleteUser.fulfilled', () => {
    const initialStateWithUser = {
      ...initialState,
      users: [mockUser],
    };
    const state = userReducer(initialStateWithUser, {
      type: deleteUser.fulfilled.type,
      payload: mockUser.id,
    });
    expect(state.users).toHaveLength(0);
  });

  it('should handle clearCurrentUser', () => {
    const stateWithCurrentUser = {
      ...initialState,
      currentUser: mockUser,
    };
    const state = userReducer(stateWithCurrentUser, clearCurrentUser());
    expect(state.currentUser).toBe(null);
  });

  it('should handle fetchUsers.rejected', () => {
    const error = 'Failed to load users';
    const state = userReducer(initialState, {
      type: fetchUsers.rejected.type,
      payload: error,
    });
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should handle fetchUserById.fulfilled', () => {
    const state = userReducer(initialState, {
      type: fetchUserById.fulfilled.type,
      payload: mockUser,
    });
    expect(state.currentUser).toEqual(mockUser);
  });

  it('should handle updateUser.fulfilled with non-existent user', () => {
    const state = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: mockUser,
    });
    expect(state.users).toEqual([]);
  });
});
