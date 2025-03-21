import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { userApi } from './userApi';

vi.mock('axios');

describe('userApi', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
  };

  it('getUsers should fetch users', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [mockUser] });
    const users = await userApi.getUsers();
    expect(users).toEqual([mockUser]);
  });

  it('getUser should fetch single user', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockUser });
    const user = await userApi.getUser(1);
    expect(user).toEqual(mockUser);
  });

  it('createUser should post new user', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: mockUser });
    const user = await userApi.createUser(mockUser);
    expect(user).toEqual(mockUser);
  });

  it('updateUser should handle ID > 10', async () => {
    const result = await userApi.updateUser(11, mockUser);
    expect(result).toEqual({ ...mockUser, id: 11 });
  });

  it('updateUser should put existing user', async () => {
    vi.mocked(axios.put).mockResolvedValue({ data: mockUser });
    const user = await userApi.updateUser(1, mockUser);
    expect(user).toEqual(mockUser);
  });

  it('deleteUser should delete user', async () => {
    vi.mocked(axios.delete).mockResolvedValue({});
    await expect(userApi.deleteUser(1)).resolves.not.toThrow();
  });
});
