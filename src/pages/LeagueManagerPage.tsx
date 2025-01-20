import React from 'react';
import useUserContext from '../hooks/useUserContext';
import CreateDraftForm from '../components/draft/CreateDraftForm';
import DraftBoard from '../components/draft/DraftBoard';
import LeagueSideBar from '../components/league/LeagueSideBar/LeagueSideBar';
import InviteComponent from '../components/league/InviteComponent';
import RegisterPage from './RegisterPage';

const LeagueManagerPage: React.FC = () => {

  const { currentLeague, currentSeason, currentDraft, user } = useUserContext();

  return (
    <>
      {!user && <RegisterPage />}
      {user && (
      <div className="flex  w-full">
        <LeagueSideBar />        
        <div className="flex flex-col w-3/4">
          {currentLeague && currentSeason && !currentDraft && (
            <div className="flex flex-col w-full m-4">
              <InviteComponent />
              <CreateDraftForm /> 
            </div>
          )}
          {currentDraft && (
            <div className="flex flex-col w-full">
              <DraftBoard />
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default LeagueManagerPage;
