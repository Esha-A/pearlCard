
import { DataGrid } from '@mui/x-data-grid';
import { useMemo } from 'react';

function useStyles() {
  // You can expand this object for more style customizations
  return useMemo(() => ({
    container: {
      height: 500,
      width: '100%',
    },
    dataGrid: {
      '& .MuiDataGrid-columnHeadersInner': {
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: '#fff',
      },
    },
  }), []);
}


export default function JourneysDataGrid({ rows, onSortModelChange, sortModel, selectedIds = [], onSelectionModelChange, pageSize, onPageSizeChange, rowsPerPageOptions = [5, 10, 20, 50, 100] }) {

  const styles = useStyles();
  const columns = [
    { field: 'route', headerName: 'Route', flex: 1, minWidth: 120, sortable: true },
    { field: 'price', headerName: 'Price', flex: 1, minWidth: 100, sortable: true, valueFormatter: ({ value }) => `£${value}` },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120, sortable: true },
    { field: 'time', headerName: 'Time', flex: 1, minWidth: 120, sortable: true },
  ];

  // Map journeys to DataGrid rows, ensure rows is always an array
  const safeRows = Array.isArray(rows) ? rows : [];
  const gridRows = safeRows.map(j => ({
    id: j.id,
    route: j.route,
    price: j.price,
    date: new Date(j.timestamp).toLocaleDateString(),
    time: new Date(j.timestamp).toLocaleTimeString(),
  }));

  return (
    <div style={styles.container}>
      <DataGrid
        rows={gridRows}
        columns={columns}
        sx={styles.dataGrid}
        checkboxSelection
        selectionModel={selectedIds}
        onSelectionModelChange={onSelectionModelChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </div>
  );
}
