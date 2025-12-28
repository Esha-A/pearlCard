import { useCallback } from "react";
import axios from "axios";
import { USER_JOURNEYS_API } from "../../../config";
import { mapJourneysToState } from "../helpers/mapJourneysToState";

export function useJourneyList(setUserJourneyList) {
  return useCallback(() => {
    axios.get(USER_JOURNEYS_API)
      .then((res) => {
        const journeys = res.data || [];
        setUserJourneyList(journeys); // Only set the array
      })
      .catch((err) => console.log(err));
  }, [setUserJourneyList]);
}
