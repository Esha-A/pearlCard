import { useCallback } from "react";
import axios from "axios";
import { USER_API } from "../../../config";

export function useGetUser(setCurrentUsername, setCurrentPearlCardId) {
  return useCallback(() => {
    axios.get(USER_API)
      .then((res) => {
        const user = res.data || {};
        setCurrentUsername(user.name);
        setCurrentPearlCardId(user.pearlCard);
      })
      .catch((err) => console.log(err));
  }, [setCurrentUsername, setCurrentPearlCardId]);
}
