import { useMemo } from "react";
import { filterJourneysByDate, filterJourneysByPrice } from "../utils/helpers";

export function useFilteredJourneys(userJourneyList, fromDate, toDate, filterRoutes, minPrice, maxPrice, sortKey, sortAsc) {
  return useMemo(() => {
    let filtered = filterJourneysByDate(userJourneyList || [], fromDate, toDate) || [];
    if (Array.isArray(filtered) && filterRoutes && filterRoutes.length) {
      filtered = filtered.filter((j) => filterRoutes.includes(String(j.route)));
    }
    filtered = filterJourneysByPrice(filtered || [], minPrice, maxPrice) || [];
    if (sortKey && Array.isArray(filtered)) {
      filtered = filtered.slice().sort((a, b) => {
        switch (sortKey) {
          case 'route': return String(a.route || '').localeCompare(String(b.route || ''));
          case 'price': return (Number(a.price) || 0) - (Number(b.price) || 0);
          case 'timestamp': return new Date(a.timestamp) - new Date(b.timestamp);
          default: return 0;
        }
      });
      if (!sortAsc) filtered = filtered.reverse();
    }
    return Array.isArray(filtered) ? filtered : [];
  }, [userJourneyList, fromDate, toDate, filterRoutes, minPrice, maxPrice, sortKey, sortAsc]);
}
