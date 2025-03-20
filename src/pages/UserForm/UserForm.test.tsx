import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { UserForm } from './UserForm';
import userReducer from '../../store/userSlice';

describe('UserForm', () => {
  const renderUserForm = () => {
    const store = configureStore({
      reducer: {
        users: userReducer,
      },
    });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <UserForm />
        </BrowserRouter>
      </Provider>
    );
  };

  it('shows validation errors for empty required fields', async () => {
    renderUserForm();

    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderUserForm();

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });

  it('validates name length', async () => {
    renderUserForm();

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'ab' } });

    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Name must be at least 3 characters long')
      ).toBeInTheDocument();
    });
  });

  it('shows form in create mode', () => {
    renderUserForm();
    expect(screen.getByText('Create User')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('validates phone number format', async () => {
    renderUserForm();

    const phoneInput = screen.getByLabelText('Phone');
    fireEvent.change(phoneInput, { target: { value: 'invalid-phone' } });

    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Invalid phone number format')
      ).toBeInTheDocument();
    });
  });
});
