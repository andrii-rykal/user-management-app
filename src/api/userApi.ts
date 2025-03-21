import axios from 'axios';
import { User } from '../types/User';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  createUser: async (user: User): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
  },

  updateUser: async (id: number, user: User): Promise<User> => {
    if (id > 10) {
      return {
        ...user,
        id,
      };
    }
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  },
};
