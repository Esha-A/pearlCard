import React, { useState } from 'react';
import AddJourneyForm from './AddJourneyForm';
import '../../App.css';
import JourneysDataGrid from './JourneysDataGrid';
import Header from '../header/Header';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import FiltersSidebar from '../FiltersSidebar';
import { useJourneyList } from './hooks/useJourneyList';
import { useFilteredJourneys } from './hooks/useFilteredJourneys';
import { useSelectedJourneys } from './hooks/useSelectedJourneys';
import { useJourneyActions } from './hooks/useJourneyActions';
import { useDeleteDialog } from './hooks/useDeleteDialog';
import UnderConstruction from '../UnderConstruction';

import { useMemo } from 'react';
import { useGetUser } from './hooks/useGetUser.js';

function useStyles() {
  return useMemo(() => ({
    mainFlexRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: 0,
    },
    filtersSidebar: {
        flex: '0 0 320px',
        maxWidth: 340,
        marginRight: 24,
        background: '#fff',
        borderRadius: 8,
        padding: 24,
        marginTop: 0,
        marginBottom: 0,
    },
    journeyTableSection: {
        flex: 1,
        minWidth: 0,
    },
    card: {
        padding: 24,
    },
    tableContainer: {},
    totalText: {
        marginTop: 8,
        textAlign: 'right',
        fontWeight: 'bold',
    },
  }), []);
}


function JourneyApp({ currentPage: currentPageProp }) {
    const styles = useStyles();

    const [userJourneyList, setUserJourneyList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentUserId] = useState(2);
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentPearlCardId, setCurrentPearlCardId] = useState("");
    const [toDate, setToDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [internalCurrentPage, setCurrentPage] = useState('main');
    const currentPage = currentPageProp !== undefined ? currentPageProp : internalCurrentPage;
    const [filterRoutes, setFilterRoutes] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedJourneyIds, setSelectedJourneyIds] = useState([]);
    const [routesDropdownOpen, setRoutesDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDismissed, setModalDismissed] = useState(false);
    // Track if the empty-list modal has ever been shown, to prevent repeat popups
    const [emptyModalShown, setEmptyModalShown] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState("");
    const [journeyToAdd, setJourneyToAdd] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);


    const getUser = useGetUser(setCurrentUsername, setCurrentPearlCardId);

    React.useEffect(() => {
        getUser();
    }, [getUser]);

    // Wrap setUserJourneyList to also set dataLoaded, but only update if changed
    const refreshList = useJourneyList((journeys) => {
        setUserJourneyList((prev) => {
            // Only update if journeys actually changed (deep compare by JSON.stringify)
            if (
                Array.isArray(prev) &&
                prev.length === journeys.length &&
                prev.every((j, i) => JSON.stringify(j) === JSON.stringify(journeys[i]))
            ) {
                return prev;
            }
            return journeys;
        });
        setDataLoaded((prev) => prev ? prev : true);
    });

    const filteredJourneys = useFilteredJourneys(userJourneyList, fromDate, toDate, filterRoutes, minPrice, maxPrice, sortKey, sortAsc);
    const getSelectedJourneys = useSelectedJourneys(userJourneyList, selectedJourneyIds);
    // Patch: Provide a custom setModal that does NOT close the modal on add
    // Instead, the modal will only close when the user explicitly closes it
    const journeyActions = useJourneyActions({
        refreshList,
        setModal: (open) => {
            // Only allow closing if open === false and user explicitly closes
            // Otherwise, ignore automatic close requests from handleSubmit
            if (open === false) return; // Ignore auto-close
            setModal(open);
        },
        setModalErrorMessage,
        setJourneyToAdd,
        setSelectedJourneyIds,
        currentUserId,
        currentUsername
    });
    const deleteDialog = useDeleteDialog(getSelectedJourneys);

    React.useEffect(() => {
        refreshList();
    }, [refreshList]);

    // Open AddJourneyForm if no journeys exist and modal is not already open or dismissed, but only after data is loaded
    React.useEffect(() => {
        if (
            dataLoaded &&
            userJourneyList.length === 0 &&
            !modal &&
            !modalDismissed &&
            !emptyModalShown
        ) {
            setModal(true);
            setJourneyToAdd({ userId: currentUserId, route: "", username: currentUsername });
            setEmptyModalShown(true);
        }
    }, [dataLoaded, userJourneyList.length, currentUserId, currentUsername, modal, modalDismissed, emptyModalShown]);

    // Custom toggle to track dismiss
    const handleModalToggle = () => {
        setModal((m) => {
            if (m) setModalDismissed(true);
            return !m;
        });
    };

    return (
        <>
        <Header
            userDropdownOpen={userDropdownOpen}
            setUserDropdownOpen={setUserDropdownOpen}
            onNavigate={(page) => {
            if (currentPageProp === undefined) setCurrentPage(page);
            setUserDropdownOpen(false);
            }}
        />
        {currentPage === 'main' ? (
            <div style={styles.mainFlexRow} className="journey-main-flex-row">
                <div style={styles.filtersSidebar} className="journey-filters-sidebar">
                    <div className="mb-3 sidebar-action-row">
                        <button className="btn btn-secondary action-btn" onClick={() => {
                            const sels = getSelectedJourneys();
                            if (sels.length === 1) journeyActions.editJourney(sels[0]);
                        }} disabled={selectedJourneyIds.length !== 1}>Edit</button>
                        <button className="btn btn-danger action-btn" onClick={deleteDialog.openDeleteDialog} disabled={selectedJourneyIds.length === 0}>Delete</button>
                        <DeleteConfirmationDialog
                            open={deleteDialog.showDeleteDialog}
                            count={deleteDialog.journeysToDelete.length}
                            onCancel={deleteDialog.closeDeleteDialog}
                            onConfirm={() => deleteDialog.confirmDeleteDialog(journeyActions.handleDelete)}
                        />
                    </div>
                    <FiltersSidebar
                        fromDate={fromDate}
                        toDate={toDate}
                        filterRoutes={filterRoutes}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        routesDropdownOpen={routesDropdownOpen}
                        toggleRoutesDropdown={() => setRoutesDropdownOpen((open) => !open)}
                        toggleRouteSelection={(route) => {
                            setFilterRoutes((prev) => {
                            const set = new Set(prev || []);
                            if (set.has(route)) set.delete(route); else set.add(route);
                            return Array.from(set);
                            });
                        }}
                        onClearFilters={() => {
                            setFromDate("");
                            setToDate("");
                            setFilterRoutes([]);
                            setMinPrice("");
                            setMaxPrice("");
                        }}
                        onChangeFromDate={(e) => setFromDate(e.target.value)}
                        onChangeToDate={(e) => setToDate(e.target.value)}
                        onChangeMinPrice={(e) => setMinPrice(e.target.value)}
                        onChangeMaxPrice={(e) => setMaxPrice(e.target.value)}
                        RouteEnum={require('./helpers/routes.js').RouteEnum}
                    />
                </div>
                <div style={styles.journeyTableSection}>
                    <div style={styles.card}>
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Username:</strong> {currentUsername || "(unknown)"}
                                <br />
                                <strong>PearlCard ID:</strong> {currentPearlCardId || "(none)"}
                            </div>
                            <div>
                                <button className="btn btn-primary action-btn" onClick={journeyActions.createJourney}>Add Journey</button>
                            </div>
                        </div>
                        <div style={styles.tableContainer}>
                            <JourneysDataGrid
                                rows={filteredJourneys}
                                sortModel={sortKey ? [{ field: sortKey, sort: sortAsc ? 'asc' : 'desc' }] : []}
                                onSortModelChange={(model) => {
                                    if (model.length > 0) {
                                    const { field, sort } = model[0];
                                    setSortKey(field);
                                    setSortAsc(sort === 'asc');
                                    }
                                }}
                                selectedIds={selectedJourneyIds}
                                onSelectionModelChange={(ids) => setSelectedJourneyIds(Array.isArray(ids) ? ids : [ids])}
                                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                            />
                        </div>
                        <div style={styles.totalText}>
                            Total: £{Array.isArray(filteredJourneys) ? filteredJourneys.reduce((s, j) => s + (Number(j.price) || 0), 0).toFixed(2) : '0.00'}
                        </div>
                    </div>
                    {modal && (
                        <AddJourneyForm journeyToAdd={journeyToAdd} toggle={handleModalToggle} onSave={journeyActions.handleSubmit} errorMessage={modalErrorMessage} username={currentUsername} />
                    )}
                </div>
            </div>
        ) : (
            <UnderConstruction title={
            currentPage === 'account' ? 'Account Info' :
            currentPage === 'pearlcard' ? 'PearlCard Info' :
            'Page'
            } />
        )}
        </>
    );
}

export default JourneyApp;
