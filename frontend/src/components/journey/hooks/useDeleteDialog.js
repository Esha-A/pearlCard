import { useState } from "react";

export function useDeleteDialog(getSelectedJourneys) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [journeysToDelete, setJourneysToDelete] = useState([]);

  const openDeleteDialog = () => {
    const sels = getSelectedJourneys();
    if (sels.length === 0) return;
    setShowDeleteDialog(true);
    setJourneysToDelete(sels.map(j => j.id));
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setJourneysToDelete([]);
  };

  const confirmDeleteDialog = (handleDelete) => {
    handleDelete(journeysToDelete);
    closeDeleteDialog();
  };

  return {
    showDeleteDialog,
    journeysToDelete,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDeleteDialog
  };
}
