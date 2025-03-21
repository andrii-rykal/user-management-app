import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { UserTable } from './UserTable';

vi.mock('@mui/material', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Fade: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  IconButton: ({
    onClick,
    children,
    'aria-label': ariaLabel,
  }: {
    onClick?: () => void;
    children: React.ReactNode;
    'aria-label'?: string;
  }) => (
    <button onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  ),
}));

vi.mock('@mui/icons-material', () => ({
  Edit: () => 'EditIcon',
  Delete: () => 'DeleteIcon',
}));

vi.mock('@mui/x-data-grid', () => ({
  DataGrid: ({
    rows,
  }: {
    rows: Array<{ id: number; name: string; email: string; phone: string }>;
  }) => (
    <div data-testid="data-grid">
      {rows.map(row => (
        <div key={row.id} data-testid={`row-${row.id}`}>
          {row.name}
        </div>
      ))}
    </div>
  ),
}));

describe('UserTable', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <UserTable
        users={mockUsers}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        loading={false}
      />,
    );
    expect(container).toBeTruthy();
  });

  it('renders user data', () => {
    const { getByTestId } = render(
      <UserTable
        users={mockUsers}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        loading={false}
      />,
    );
    expect(getByTestId('data-grid')).toBeInTheDocument();
    expect(getByTestId('row-1')).toHaveTextContent('John Doe');
  });
});
