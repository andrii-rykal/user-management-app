import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

describe('DeleteConfirmDialog', () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnConfirm.mockClear();
  });

  it('renders dialog with basic content', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText('Delete Confirmation')).toBeInTheDocument();
    expect(
      screen.getByText('This action cannot be undone.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('shows custom message with user name when provided', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        userName="John Doe"
      />,
    );

    expect(
      screen.getByText('Are you sure you want to delete user "John Doe"?'),
    ).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when delete button is clicked', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables buttons and shows loading state', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        loading={true}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: 'Deleting...' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(deleteButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
    expect(deleteButton).toHaveTextContent('Deleting...');
  });
});
