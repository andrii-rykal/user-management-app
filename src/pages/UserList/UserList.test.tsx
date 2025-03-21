import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { UserList } from './UserList';
import userReducer from '../../store/userSlice';

describe('UserList', () => {
  const renderUserList = () => {
    const store = configureStore({
      reducer: {
        users: userReducer,
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

  it('renders user list page', () => {
    renderUserList();

    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create User' }),
    ).toBeInTheDocument();
  });

  it('navigates to create user form', () => {
    renderUserList();

    const createButton = screen.getByRole('button', { name: 'Create User' });
    fireEvent.click(createButton);
  });
});
