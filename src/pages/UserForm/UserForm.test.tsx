import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { UserForm } from './UserForm';
import userReducer from '../../store/userSlice';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: undefined }),
  };
});

vi.mock('../../hooks/useSnackbar', () => ({
  useSnackbar: () => ({
    showSnackbar: vi.fn(),
  }),
}));

describe('UserForm', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { users: userReducer },
    });
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <UserForm />
        </MemoryRouter>
      </Provider>,
    );
  };

  it('renders create form by default', () => {
    renderComponent();
    expect(screen.getByText('Create User')).toBeInTheDocument();
  });

  it('shows validation errors', async () => {
    renderComponent();
    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Name/), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Phone/), {
      target: { value: '1234567890' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/users');
    });
  });

  it('shows loading state during submission', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Name/), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: 'john@example.com' },
    });

    const submitButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /Save|Saving/i });
      expect(button).toBeDisabled();
    });
  });

  it('validates email format', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByText('Save'));

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });
});
