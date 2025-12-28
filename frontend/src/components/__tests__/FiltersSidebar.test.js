import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FiltersSidebar from '../FiltersSidebar';

describe('FiltersSidebar', () => {
  const RouteEnum = { A: 'A', B: 'B' };
  const defaultProps = {
    fromDate: '',
    toDate: '',
    filterRoutes: [],
    minPrice: '',
    maxPrice: '',
    routesDropdownOpen: false,
    toggleRoutesDropdown: jest.fn(),
    toggleRouteSelection: jest.fn(),
    onClearFilters: jest.fn(),
    onChangeFromDate: jest.fn(),
    onChangeToDate: jest.fn(),
    onChangeMinPrice: jest.fn(),
    onChangeMaxPrice: jest.fn(),
    RouteEnum,
  };

  it('renders all filter fields and clear button', () => {
    render(<FiltersSidebar {...defaultProps} />);
    expect(screen.getByLabelText(/From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Routes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').some(btn => btn.textContent.match(/Clear Filters/i))).toBe(true);
  });

  it('calls onClearFilters when Clear Filters is clicked', () => {
    render(<FiltersSidebar {...defaultProps} />);
    const clearBtn = screen.getAllByRole('button').find(btn => btn.textContent.match(/Clear Filters/i));
    fireEvent.click(clearBtn);
    expect(defaultProps.onClearFilters).toHaveBeenCalled();
  });

  it('shows route options when dropdown is open', () => {
    render(<FiltersSidebar {...defaultProps} routesDropdownOpen={true} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('calls toggleRoutesDropdown when routes dropdown button is clicked', () => {
    render(<FiltersSidebar {...defaultProps} />);
    const routeBtn = screen.getAllByRole('button').find(btn => btn.textContent.match(/All Routes/i));
    fireEvent.click(routeBtn);
    expect(defaultProps.toggleRoutesDropdown).toHaveBeenCalled();
  });
});
