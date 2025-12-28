import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  const onNavigate = jest.fn();
  const setUserDropdownOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header title', () => {
    render(
      <Header userDropdownOpen={false} setUserDropdownOpen={setUserDropdownOpen} onNavigate={onNavigate} />
    );
    expect(screen.getByText('PearlCard Journeys')).toBeInTheDocument();
  });

  it('calls onNavigate with main when home button is clicked', () => {
    render(
      <Header userDropdownOpen={false} setUserDropdownOpen={setUserDropdownOpen} onNavigate={onNavigate} />
    );
    const homeBtn = screen.getByLabelText('Home');
    fireEvent.click(homeBtn);
    expect(onNavigate).toHaveBeenCalledWith('main');
  });

  it('toggles user dropdown when user button is clicked', () => {
    render(
      <Header userDropdownOpen={false} setUserDropdownOpen={setUserDropdownOpen} onNavigate={onNavigate} />
    );
    const userBtn = screen.getByLabelText('User Menu');
    fireEvent.click(userBtn);
    expect(setUserDropdownOpen).toHaveBeenCalledWith(true);
  });

  it('shows dropdown and navigates to account, pearlcard, and logout', () => {
    render(
      <Header userDropdownOpen={true} setUserDropdownOpen={setUserDropdownOpen} onNavigate={onNavigate} />
    );
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('PearlCard Info')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    fireEvent.click(screen.getByText('My Account'));
    expect(onNavigate).toHaveBeenCalledWith('account');
    fireEvent.click(screen.getByText('PearlCard Info'));
    expect(onNavigate).toHaveBeenCalledWith('pearlcard');
    fireEvent.click(screen.getByText('Logout'));
    expect(onNavigate).toHaveBeenCalledWith('logout');
  });
});
