import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddJourneyForm from '../AddJourneyForm';

const defaultProps = {
  journeyToAdd: { userId: 1, route: '', username: 'alice', timestamp: '' },
  toggle: jest.fn(),
  onSave: jest.fn(),
  errorMessage: '',
  username: 'alice',
};

describe('AddJourneyForm', () => {
  it('renders form fields and buttons', () => {
    render(<AddJourneyForm {...defaultProps} />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Route/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it('calls onSave when Save is clicked and date is valid', () => {
    render(<AddJourneyForm {...defaultProps} />);
    fireEvent.click(screen.getByText(/Save/i));
    expect(defaultProps.onSave).toHaveBeenCalledWith(defaultProps.journeyToAdd);
  });

  it('shows error for future date', () => {
    const futureDate = new Date(Date.now() + 86400000).toISOString().slice(0, 16);
    render(<AddJourneyForm {...defaultProps} journeyToAdd={{ ...defaultProps.journeyToAdd, timestamp: futureDate }} />);
    fireEvent.click(screen.getByText(/Save/i));
    expect(screen.getByRole('alert')).toHaveTextContent(/Cannot Create a Future Journey/i);
  });

  it('calls toggle when Cancel is clicked', () => {
    render(<AddJourneyForm {...defaultProps} />);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(defaultProps.toggle).toHaveBeenCalled();
  });
});
