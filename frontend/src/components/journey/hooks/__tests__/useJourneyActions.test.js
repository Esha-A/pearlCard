jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';
import { useJourneyActions } from '../useJourneyActions';

jest.mock('axios');
const USER_JOURNEYS_API = '/api/users/1/journeys/';

const refreshList = jest.fn();
const setModal = jest.fn();
const setModalErrorMessage = jest.fn();
const setJourneyToAdd = jest.fn();
const setSelectedJourneyIds = jest.fn();
const currentUserId = 1;
const currentUsername = 'alice';

const props = {
  refreshList,
  setModal,
  setModalErrorMessage,
  setJourneyToAdd,
  setSelectedJourneyIds,
  currentUserId,
  currentUsername
};

const TestComponent = React.forwardRef((_, ref) => {
  const actions = useJourneyActions(props);
  React.useImperativeHandle(ref, () => actions);
  return <div data-testid="result">Test</div>;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useJourneyActions', () => {
  it('submits a new journey', async () => {
    jest.useFakeTimers();
    axios.post.mockResolvedValue({});
    const ref = React.createRef();
    render(<TestComponent ref={ref} />);
    await act(async () => {
      await ref.current.handleSubmit({ route: 'A' });
      jest.runAllTimers();
    });
    expect(axios.post).toHaveBeenCalledWith(USER_JOURNEYS_API, { route: 'A' });
    expect(setModal).toHaveBeenCalledWith(false);
    expect(refreshList).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('edits a journey', () => {
    const ref = React.createRef();
    render(<TestComponent ref={ref} />);
    act(() => {
      ref.current.editJourney({ route: 'B' });
    });
    expect(setJourneyToAdd).toHaveBeenCalledWith({ route: 'B', userId: 1, username: 'alice' });
    expect(setModal).toHaveBeenCalledWith(true);
    expect(setModalErrorMessage).toHaveBeenCalledWith("");
  });

  it('deletes journeys', async () => {
    axios.delete.mockResolvedValue({});
    const ref = React.createRef();
    render(<TestComponent ref={ref} />);
    await act(async () => {
      await ref.current.handleDelete([1, 2]);
    });
    expect(axios.delete).toHaveBeenCalledTimes(2);
    expect(refreshList).toHaveBeenCalled();
    expect(setSelectedJourneyIds).toHaveBeenCalledWith([]);
  });

  it('creates a journey', () => {
    const ref = React.createRef();
    render(<TestComponent ref={ref} />);
    act(() => {
      ref.current.createJourney();
    });
    expect(setJourneyToAdd).toHaveBeenCalledWith({ userId: 1, route: '', username: 'alice' });
    expect(setModal).toHaveBeenCalledWith(true);
    expect(setModalErrorMessage).toHaveBeenCalledWith("");
  });
});
