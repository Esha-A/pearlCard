import React from 'react';
import { render, screen } from '@testing-library/react';
import UnderConstruction from '../UnderConstruction';

describe('UnderConstruction', () => {
  it('renders title and message', () => {
    render(<UnderConstruction title="Test Page" />);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText(/Page under construction/i)).toBeInTheDocument();
  });
});
