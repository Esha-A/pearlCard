import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';

describe('DeleteConfirmationDialog', () => {
  const defaultProps = {
    open: true,
    count: 2,
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
  };

  it('renders dialog with correct count', () => {
    render(<DeleteConfirmationDialog {...defaultProps} />);
    expect(screen.getByText(/delete 2 journeys/i)).toBeInTheDocument();
    expect(screen.getByText(/this action cannot be undone/i)).toBeInTheDocument();
  });

  it('calls onCancel when Cancel or close button is clicked', () => {
    render(<DeleteConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(defaultProps.onCancel).toHaveBeenCalled();
    fireEvent.click(screen.getByText(/×/i));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(2);
  });

  it('calls onConfirm when Delete is clicked', () => {
    render(<DeleteConfirmationDialog {...defaultProps} />);
    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('returns null if open is false', () => {
    const { container } = render(<DeleteConfirmationDialog {...defaultProps} open={false} />);
    expect(container.firstChild).toBeNull();
  });
});
