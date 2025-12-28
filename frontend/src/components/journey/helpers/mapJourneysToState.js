// Helper to map journeys API response to App state
export function mapJourneysToState(journeys, prevState) {
  const hasJourneys = journeys.length > 0;
  const username = hasJourneys ? journeys[0].username || "" : prevState.currentUsername || "";
  const pearlCardId = hasJourneys ? journeys[0].pearlCardId || "" : prevState.currentPearlCardId || "";
  const shouldShowModal = !hasJourneys;
  return {
    userJourneyList: journeys,
    currentUsername: username,
    currentPearlCardId: pearlCardId,
    modal: shouldShowModal,
    journeyToAdd: shouldShowModal ? { userId: prevState.currentUserId, route: "", username } : prevState.journeyToAdd,
  };
}
