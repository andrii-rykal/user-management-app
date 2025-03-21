import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserTable } from './UserTable';

describe('UserTable', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  it('renders table with user data', () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        loading={false}
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <UserTable
        users={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        loading={true}
      />,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
