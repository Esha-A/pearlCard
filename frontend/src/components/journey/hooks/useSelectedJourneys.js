import { useCallback } from "react";

export function useSelectedJourneys(userJourneyList, selectedJourneyIds) {
  return useCallback(() => {
    return userJourneyList.filter((j) => selectedJourneyIds.includes(j.id));
  }, [userJourneyList, selectedJourneyIds]);
}
