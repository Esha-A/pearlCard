import axios from 'axios';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({});
  axios.put.mockResolvedValue({});
  axios.delete.mockResolvedValue({});
});

describe('App', () => {
  it('renders JourneyApp and header', () => {
    render(<App />);
    // Should render the header from JourneyApp
    expect(screen.getByText(/PearlCard Journeys/i)).toBeInTheDocument();
  });

  it('renders main page UI', () => {
    render(<App />);
    // Should render username and PearlCard ID labels
    expect(screen.getByText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByText(/PearlCard ID:/i)).toBeInTheDocument();
  });
});
