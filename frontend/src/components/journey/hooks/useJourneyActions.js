import axios from "axios";
import { USER_JOURNEYS_API } from "../../../config";

export function useJourneyActions({
  refreshList,
  setModal,
  setModalErrorMessage,
  setJourneyToAdd,
  setSelectedJourneyIds,
  currentUserId,
  currentUsername
}) {
  const handleSubmit = (journey) => {
    setModalErrorMessage("");
    const normalizedJourney = { ...journey };
    const handleError = (err) => {
      if (err.response && err.response.data && err.response.data.detail) {
        setModalErrorMessage(err.response.data.detail);
      } else console.log(err);
    };
    const forceRefresh = () => {
      // Small delay to ensure backend update is complete
      setTimeout(() => {
        refreshList();
      }, 200);
    };
    if (journey.id) {
      axios.put(`${USER_JOURNEYS_API}${journey.id}/`, normalizedJourney).then(() => {
        setModal(false);
        forceRefresh();
        setModalErrorMessage("");
      }).catch(handleError);
      return;
    }
    axios.post(USER_JOURNEYS_API, normalizedJourney).then(() => {
      setModal(false);
      forceRefresh();
      setModalErrorMessage("");
    }).catch(handleError);
  };

  const editJourney = (journey) => {
    const j = { ...journey };
    if (!j.userId) j.userId = currentUserId;
    if (!j.username) j.username = currentUsername;
    setJourneyToAdd(j);
    setModal(true);
    setModalErrorMessage("");
  };

  const handleDelete = (journeyIds) => {
    const deletes = journeyIds.map((id) => axios.delete(`${USER_JOURNEYS_API}${id}/`));
    Promise.all(deletes).then(() => {
      refreshList();
      setSelectedJourneyIds([]);
    }).catch((err) => {
      console.error(err);
      refreshList();
      setSelectedJourneyIds([]);
    });
  };

  const createJourney = () => {
    setJourneyToAdd({
      userId: currentUserId,
      route: "",
      username: currentUsername
    });
    setModal(true);
    setModalErrorMessage("");
  };

  return {
    handleSubmit,
    editJourney,
    handleDelete,
    createJourney
  };
}
