import React from "react";

function useStyles() {
  return {
    sidebar: {
      padding: '1rem',
      background: '#f8f9fa',
      borderRadius: 4,
    },
    mb3: {
      marginBottom: '0.75rem',
    },
    label: {
      marginRight: '0.5rem',
      fontWeight: 500,
    },
    input: {
      width: '100%',
      padding: '0.375rem 0.75rem',
      border: '1px solid #ced4da',
      borderRadius: 4,
      marginBottom: 0,
      fontSize: '1rem',
    },
    multiselectDropdown: {
      position: 'relative',
    },
    multiselectToggle: {
      width: '100%',
      textAlign: 'left',
      background: '#fff',
      border: '1px solid #ced4da',
      borderRadius: 4,
      padding: '.375rem .75rem',
      color: '#495057',
      cursor: 'pointer',
    },
    multiselectPanel: {
      position: 'absolute',
      zIndex: 20,
      background: 'white',
      border: '1px solid #dee2e6',
      padding: '0.5rem',
      marginTop: '0.25rem',
      width: '100%',
      maxHeight: 200,
      overflow: 'auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
    },
    multiselectOption: {
      display: 'block',
      marginBottom: '0.25rem',
      cursor: 'pointer',
    },
    btn: {
      width: '100%',
      padding: '0.375rem 0.75rem',
      fontSize: '0.9rem',
      background: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
    },
  };
}

export default function FiltersSidebar({
  fromDate,
  toDate,
  filterRoutes,
  minPrice,
  maxPrice,
  routesDropdownOpen,
  toggleRoutesDropdown,
  toggleRouteSelection,
  onClearFilters,
  onChangeFromDate,
  onChangeToDate,
  onChangeMinPrice,
  onChangeMaxPrice,
  RouteEnum
}) {
  const styles = useStyles();
  return (
    <div style={styles.sidebar}>
      <div style={styles.mb3}>
        <label htmlFor="from-date" style={styles.label}>From:</label>
        <input id="from-date" type="date" value={fromDate} onChange={onChangeFromDate} style={styles.input} />
      </div>
      <div style={styles.mb3}>
        <label htmlFor="to-date" style={styles.label}>To:</label>
        <input id="to-date" type="date" value={toDate} onChange={onChangeToDate} style={styles.input} />
      </div>
      <div style={styles.mb3}>
        <label htmlFor="routes-dropdown" style={styles.label}>Routes:</label>
        <div style={styles.multiselectDropdown}>
          <button id="routes-dropdown" type="button" style={styles.multiselectToggle} onClick={toggleRoutesDropdown}>
            {filterRoutes && filterRoutes.length > 0 ? `${filterRoutes.length} selected` : 'All Routes'}
          </button>
          {routesDropdownOpen && (
            <div style={styles.multiselectPanel}>
              {Object.values(RouteEnum).map((r) => {
                const checked = (filterRoutes || []).includes(r);
                return (
                  <label key={r} style={styles.multiselectOption}>
                    <input type="checkbox" checked={checked} onChange={() => toggleRouteSelection(r)} /> {r}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div style={styles.mb3}>
        <label htmlFor="min-price" style={styles.label}>Min Price:</label>
        <input id="min-price" type="number" value={minPrice} onChange={onChangeMinPrice} style={styles.input} step="0.01" placeholder="0.00" />
      </div>
      <div style={styles.mb3}>
        <label htmlFor="max-price" style={styles.label}>Max Price:</label>
        <input id="max-price" type="number" value={maxPrice} onChange={onChangeMaxPrice} style={styles.input} step="0.01" placeholder="0.00" />
      </div>
      <div>
        <button style={styles.btn} onClick={onClearFilters}>Clear Filters</button>
      </div>
    </div>
  );
}
