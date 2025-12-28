

import React from 'react';
import { render, act } from '@testing-library/react';
jest.mock('axios');
import axios from 'axios';
import { useJourneyList } from '../useJourneyList';

const USER_JOURNEYS_API = '/api/users/1/journeys/';

function TestComponent({ setUserJourneyList }) {
  const fetchJourneys = useJourneyList(setUserJourneyList);
  React.useEffect(() => {
    fetchJourneys();
  }, [fetchJourneys]);
  return <div data-testid="result">Test</div>;
}

describe('useJourneyList', () => {
  it('fetches journeys and sets user journey list', async () => {
    const setUserJourneyList = jest.fn();
    const journeys = [{ id: 1 }, { id: 2 }];
    axios.get.mockResolvedValue({ data: journeys });
    await act(async () => {
      render(<TestComponent setUserJourneyList={setUserJourneyList} />);
    });
    expect(axios.get).toHaveBeenCalledWith(USER_JOURNEYS_API);
    expect(setUserJourneyList).toHaveBeenCalledWith(journeys);
  });

  it('handles errors gracefully', async () => {
    const setUserJourneyList = jest.fn();
    axios.get.mockRejectedValue(new Error('fail'));
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await act(async () => {
      render(<TestComponent setUserJourneyList={setUserJourneyList} />);
    });
    expect(setUserJourneyList).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
