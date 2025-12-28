import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { useGetUser } from '../useGetUser';

jest.mock('axios');

describe('useGetUser', () => {
  it('fetches user and sets username and pearlCardId', async () => {
    const mockUser = { name: 'Max Mayfield', pearlCard: 42 };
    axios.get.mockResolvedValueOnce({ data: mockUser });
    const setCurrentUsername = jest.fn();
    const setCurrentPearlCardId = jest.fn();
    const getUser = renderHook(() => useGetUser(setCurrentUsername, setCurrentPearlCardId)).result.current;

    await act(async () => {
      await getUser();
    });

    expect(axios.get).toHaveBeenCalled();
    expect(setCurrentUsername).toHaveBeenCalledWith('Max Mayfield');
    expect(setCurrentPearlCardId).toHaveBeenCalledWith(42);
  });

  it('handles error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));
    const setCurrentUsername = jest.fn();
    const setCurrentPearlCardId = jest.fn();
    const getUser = renderHook(() => useGetUser(setCurrentUsername, setCurrentPearlCardId)).result.current;

    await act(async () => {
      await getUser();
    });

    expect(setCurrentUsername).not.toHaveBeenCalled();
    expect(setCurrentPearlCardId).not.toHaveBeenCalled();
  });
});
