import React, { useState, useEffect } from 'react';
import CreateDraftForm from '../components/draft/CreateDraftForm';
import DraftBoard from '../components/draft/DraftBoard';
import LeagueSideBar from '../components/league/LeagueSideBar/LeagueSideBar';
import InviteComponent from '../components/league/InviteComponent';
import UserGuard from '../components/UserGuard';
import { Alert, AlertDescription } from '../components/ui/Alert';
import useLeagueContext from '../context/useLeagueContext';
import useSeasonContext from '../context/useSeasonContext';
import { League } from '../types/league.types';

const LeagueManagerPage: React.FC = () => {
  const { ownedLeagues, currentLeague } = useLeagueContext();
  const { currentSeason } = useSeasonContext();
  
  // Initialize sidebarExpanded based on whether a league is selected
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(!currentLeague);

  // Update sidebarExpanded when currentLeague changes
  useEffect(() => {
    // If no league is selected, expand the sidebar automatically
    if (!currentLeague) {
      setSidebarExpanded(true);
    } else {
      // If a league is selected, close the sidebar on mobile
      setSidebarExpanded(false);
    }
  }, [currentLeague]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  const isLeagueOwner = currentLeague && ownedLeagues.some((league: League) => league._id === currentLeague._id);

  return (
    <UserGuard>
      <div className="flex flex-col md:flex-row w-full">
        {/* Mobile Toggle Button - Always visible on mobile */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden w-full mt-5 p-3 bg-blue-600 text-white font-bold text-left flex justify-between items-center"
        >
          Menu
          <span className="text-xl">
            {sidebarExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </span>
        </button>

        {/* Sidebar - Always visible on desktop, conditionally visible on mobile */}
        <div className={`${sidebarExpanded ? 'block' : 'hidden'} md:block w-full md:w-1/4`}>
          <LeagueSideBar />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col w-full md:w-3/4">
          {!currentLeague && (
            <div className="flex items-center justify-center h-64 p-4">
              <Alert variant="info" className="my-4 w-full max-w-md">
                <AlertDescription>
                  Please select a league from the sidebar to get started.
                </AlertDescription>
              </Alert>
            </div>
          )}
          {currentLeague && currentSeason && !currentSeason.draft && (
            <div className="flex flex-col w-full p-2 md:p-4">
              {isLeagueOwner ? (
                <>
                  <InviteComponent />
                  <CreateDraftForm />
                </>
              ) : (
                <Alert variant="info" className="my-4">
                  <AlertDescription>
                    The draft for this league hasn't been created yet. Please wait for the league owner to set up the draft.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          {currentSeason && currentSeason.draft && (
            <div className="flex flex-col w-full">
              <DraftBoard />
            </div>
          )}
        </div>
      </div>
    </UserGuard>
  );
};

export default LeagueManagerPage;