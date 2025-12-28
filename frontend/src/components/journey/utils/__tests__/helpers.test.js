import {
  filterJourneysByPrice,
  filterJourneysByDate,
  getNextSortState,
} from '../helpers';

describe('filterJourneysByPrice', () => {
  const journeys = [
    { price: 5 },
    { price: 10 },
    { price: 20 },
  ];
  it('filters by minPrice', () => {
    expect(filterJourneysByPrice(journeys, 10, '')).toEqual([
      { price: 10 },
      { price: 20 },
    ]);
  });
  it('filters by maxPrice', () => {
    expect(filterJourneysByPrice(journeys, '', 10)).toEqual([
      { price: 5 },
      { price: 10 },
    ]);
  });
  it('filters by minPrice and maxPrice', () => {
    expect(filterJourneysByPrice(journeys, 6, 15)).toEqual([
      { price: 10 },
    ]);
  });
  it('returns all if no min/max', () => {
    expect(filterJourneysByPrice(journeys, '', '')).toEqual(journeys);
  });
});

describe('filterJourneysByDate', () => {
  const journeys = [
    { timestamp: '2023-01-01T00:00:00Z' },
    { timestamp: '2023-01-10T00:00:00Z' },
    { timestamp: '2023-01-20T00:00:00Z' },
  ];
  it('filters by fromDate', () => {
    expect(filterJourneysByDate(journeys, '2023-01-10', '')).toEqual([
      { timestamp: '2023-01-10T00:00:00Z' },
      { timestamp: '2023-01-20T00:00:00Z' },
    ]);
  });
  it('filters by toDate', () => {
    expect(filterJourneysByDate(journeys, '', '2023-01-10')).toEqual([
      { timestamp: '2023-01-01T00:00:00Z' },
      { timestamp: '2023-01-10T00:00:00Z' },
    ]);
  });
  it('filters by fromDate and toDate', () => {
    expect(filterJourneysByDate(journeys, '2023-01-05', '2023-01-15')).toEqual([
      { timestamp: '2023-01-10T00:00:00Z' },
    ]);
  });
  it('returns all if no dates', () => {
    expect(filterJourneysByDate(journeys, '', '')).toEqual(journeys);
  });
});

describe('getNextSortState', () => {
  it('toggles sortAsc if same key', () => {
    expect(getNextSortState('route', true, 'route')).toEqual({ sortAsc: false });
    expect(getNextSortState('route', false, 'route')).toEqual({ sortAsc: true });
  });
  it('sets new sortKey and sortAsc true if different key', () => {
    expect(getNextSortState('route', true, 'price')).toEqual({ sortKey: 'price', sortAsc: true });
  });
});
