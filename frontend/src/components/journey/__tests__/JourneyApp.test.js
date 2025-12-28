jest.mock('axios');
import axios from 'axios';
import React from 'react';
import { render, screen } from '@testing-library/react';
import JourneyApp from '../JourneyApp';

jest.mock('../JourneysDataGrid', () => () => <div data-testid="journeys-datagrid" />);
jest.mock('../AddJourneyForm', () => (props) => <div data-testid="add-journey-form" {...props} />);
jest.mock('../../header/Header', () => (props) => <div data-testid="header" {...props} />);
jest.mock('../../DeleteConfirmationDialog', () => (props) => <div data-testid="delete-dialog" {...props} />);
jest.mock('../../FiltersSidebar', () => (props) => <div data-testid="filters-sidebar" {...props} />);
jest.mock('../../UnderConstruction', () => (props) => <div data-testid="under-construction" {...props} />);

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
});

// Minimal smoke test for rendering main page and modal

describe('JourneyApp', () => {
  it('renders header and main page', async () => {
    await import('react-dom/test-utils').then(async ({ act }) => {
      await act(async () => {
        render(<JourneyApp />);
      });
    });
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('journeys-datagrid')).toBeInTheDocument();
    expect(screen.getByTestId('filters-sidebar')).toBeInTheDocument();
  });


  it('renders AddJourneyForm modal when modal is true', async () => {
    render(<JourneyApp />);
    // Simulate the effect of dataLoaded and empty userJourneyList
    // Wait for the modal to appear
    const modal = await screen.findByTestId('add-journey-form');
    expect(modal).toBeInTheDocument();
  });

  it('renders UnderConstruction for non-main page', () => {
    render(<JourneyApp currentPage="account" />);
    expect(screen.getByTestId('under-construction')).toBeInTheDocument();
  });
});
