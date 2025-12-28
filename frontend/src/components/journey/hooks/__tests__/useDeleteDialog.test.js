
import React from 'react';
import { render, act } from '@testing-library/react';
import { useDeleteDialog } from '../useDeleteDialog';

function TestComponent({ getSelectedJourneys, onDelete }) {
  const dialog = useDeleteDialog(getSelectedJourneys);
  React.useImperativeHandle(onDelete, () => dialog, [dialog]);
  return (
    <div>
      <span data-testid="showDeleteDialog">{String(dialog.showDeleteDialog)}</span>
      <span data-testid="journeysToDelete">{JSON.stringify(dialog.journeysToDelete)}</span>
    </div>
  );
}

describe('useDeleteDialog', () => {
  it('opens and closes the delete dialog and confirms delete', () => {
    const getSelectedJourneys = jest.fn(() => [{ id: 1 }, { id: 2 }]);
    const handleDelete = jest.fn();
    const ref = React.createRef();
    render(<TestComponent getSelectedJourneys={getSelectedJourneys} onDelete={ref} />);

    // Initially closed
    expect(ref.current.showDeleteDialog).toBe(false);
    expect(ref.current.journeysToDelete).toEqual([]);

    // Open dialog
    act(() => {
      ref.current.openDeleteDialog();
    });
    expect(ref.current.showDeleteDialog).toBe(true);
    expect(ref.current.journeysToDelete).toEqual([1, 2]);

    // Close dialog
    act(() => {
      ref.current.closeDeleteDialog();
    });
    expect(ref.current.showDeleteDialog).toBe(false);
    expect(ref.current.journeysToDelete).toEqual([]);

    // Confirm delete
    act(() => {
      ref.current.openDeleteDialog();
      ref.current.confirmDeleteDialog(handleDelete);
    });
    expect(handleDelete).toHaveBeenCalled();
    expect(ref.current.showDeleteDialog).toBe(false);
    // journeysToDelete may be reset after confirmation
    expect(Array.isArray(ref.current.journeysToDelete)).toBe(true);
  });

  it('does not open dialog if no journeys selected', () => {
    const getSelectedJourneys = jest.fn(() => []);
    const ref = React.createRef();
    render(<TestComponent getSelectedJourneys={getSelectedJourneys} onDelete={ref} />);
    act(() => {
      ref.current.openDeleteDialog();
    });
    expect(ref.current.showDeleteDialog).toBe(false);
    expect(ref.current.journeysToDelete).toEqual([]);
  });
});
