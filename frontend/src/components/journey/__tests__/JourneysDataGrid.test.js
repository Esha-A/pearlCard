import React from 'react';
import { render, screen } from '@testing-library/react';
import JourneysDataGrid from '../JourneysDataGrid';

jest.mock('@mui/x-data-grid', () => ({
  DataGrid: (props) => {
    if (!global.__datagrid_props_calls) global.__datagrid_props_calls = [];
    global.__datagrid_props_calls.push(props);
    return <div data-testid="mui-datagrid" />;
  },
}));

describe('JourneysDataGrid', () => {
  const rows = [
    { id: 1, route: 'A', price: 10, timestamp: '2023-01-01T10:00:00Z' },
    { id: 2, route: 'B', price: 20, timestamp: '2023-01-02T12:00:00Z' },
  ];

  it('renders DataGrid with mapped rows', () => {
    render(
      <JourneysDataGrid
        rows={rows}
        sortModel={[]}
        selectedIds={[]}
        onSelectionModelChange={() => {}}
        onSortModelChange={() => {}}
        rowsPerPageOptions={[5, 10]}
      />
    );
    expect(screen.getByTestId('mui-datagrid')).toBeInTheDocument();
  });

  it('maps journey fields to DataGrid row fields', () => {
    render(
      <JourneysDataGrid
        rows={rows}
      />
    );
    // Check that the mapped fields exist in the props
    // Access props from the global set by the mock
    const lastCall = global.__datagrid_props_calls?.[global.__datagrid_props_calls.length - 1];
    const gridRows = lastCall?.rows || [];
    expect(Array.isArray(gridRows)).toBe(true);
    expect(gridRows.length).toBe(2);
    expect(gridRows[0]).toMatchObject({
      id: 1,
      route: 'A',
      price: 10,
      date: expect.any(String),
      time: expect.any(String),
    });
  });
});
