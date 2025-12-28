// Filters journeys by min and max price (inclusive)
export function filterJourneysByPrice(journeys, minPrice, maxPrice) {
  let filtered = journeys;
  if (minPrice !== "") {
    const min = Number(minPrice) || 0;
    filtered = filtered.filter((j) => Number(j.price) >= min);
  }
  if (maxPrice !== "") {
    const max = Number(maxPrice) || 0;
    filtered = filtered.filter((j) => Number(j.price) <= max);
  }
  return filtered;
}
// Filters journeys by fromDate and toDate (inclusive, using yyyy-mm-dd format)
export function filterJourneysByDate(journeys, fromDate, toDate) {
  let filtered = journeys;
  if (fromDate) filtered = filtered.filter((j) => new Date(j.timestamp).toISOString().slice(0, 10) >= fromDate);
  if (toDate) filtered = filtered.filter((j) => new Date(j.timestamp).toISOString().slice(0, 10) <= toDate);
  return filtered;
}
// Returns the next sort state for a sortable table
export function getNextSortState(currentSortKey, currentSortAsc, clickedKey) {
  if (currentSortKey === clickedKey) {
    return { sortAsc: !currentSortAsc };
  }
  return { sortKey: clickedKey, sortAsc: true };
}