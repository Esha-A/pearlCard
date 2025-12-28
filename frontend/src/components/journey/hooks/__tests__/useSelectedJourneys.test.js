
import React from 'react';
import { render } from '@testing-library/react';
import { useSelectedJourneys } from '../useSelectedJourneys';

function TestComponent({ journeys, selectedIds }) {
  const selected = useSelectedJourneys(journeys, selectedIds)();
  return <div data-testid="result">{JSON.stringify(selected)}</div>;
}

describe('useSelectedJourneys', () => {
  it('returns selected journeys by id', () => {
    const journeys = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ];
    const selectedIds = [2, 3];
    const { getByTestId } = render(<TestComponent journeys={journeys} selectedIds={selectedIds} />);
    expect(getByTestId('result').textContent).toBe(JSON.stringify([
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ]));
  });

  it('returns empty array if no ids match', () => {
    const journeys = [
      { id: 1 },
      { id: 2 },
    ];
    const selectedIds = [3];
    const { getByTestId } = render(<TestComponent journeys={journeys} selectedIds={selectedIds} />);
    expect(getByTestId('result').textContent).toBe(JSON.stringify([]));
  });
});
