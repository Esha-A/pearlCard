import { mapJourneysToState } from '../mapJourneysToState';

describe('mapJourneysToState', () => {
  const prevState = {
    userJourneyList: [],
    currentUsername: 'oldUser',
    currentPearlCardId: 'oldCard',
    currentUserId: 42,
    modal: false,
    journeyToAdd: { userId: 42, route: '', username: 'oldUser' },
  };

  it('maps journeys to state when journeys are present', () => {
    const journeys = [
      { username: 'alice', pearlCardId: 'pc-123', id: 1 },
      { username: 'alice', pearlCardId: 'pc-123', id: 2 },
    ];
    const result = mapJourneysToState(journeys, prevState);
    expect(result.userJourneyList).toEqual(journeys);
    expect(result.currentUsername).toBe('alice');
    expect(result.currentPearlCardId).toBe('pc-123');
    expect(result.modal).toBe(false);
    expect(result.journeyToAdd).toBe(prevState.journeyToAdd);
  });

  it('maps empty journeys to state and shows modal', () => {
    const journeys = [];
    const result = mapJourneysToState(journeys, prevState);
    expect(result.userJourneyList).toEqual([]);
    expect(result.currentUsername).toBe('oldUser');
    expect(result.currentPearlCardId).toBe('oldCard');
    expect(result.modal).toBe(true);
    expect(result.journeyToAdd).toEqual({ userId: 42, route: '', username: 'oldUser' });
  });

  it('handles missing username and pearlCardId in journeys', () => {
    const journeys = [{ id: 1 }];
    const result = mapJourneysToState(journeys, prevState);
    expect(result.currentUsername).toBe('');
    expect(result.currentPearlCardId).toBe('');
  });

  it('uses prevState values if journeys is empty', () => {
    const journeys = [];
    const customPrev = { ...prevState, currentUsername: 'bob', currentPearlCardId: 'pc-999', currentUserId: 7 };
    const result = mapJourneysToState(journeys, customPrev);
    expect(result.currentUsername).toBe('bob');
    expect(result.currentPearlCardId).toBe('pc-999');
    expect(result.journeyToAdd).toEqual({ userId: 7, route: '', username: 'bob' });
  });
});
