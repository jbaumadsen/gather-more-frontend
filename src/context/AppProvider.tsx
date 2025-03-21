import React from 'react';
import { UserProvider } from './UserContext';
import { LeagueProvider } from './LeagueContext';
import { SeasonProvider } from './SeasonContext';
import { DraftProvider } from './DraftContext';
import { TeamProvider } from './TeamContext';
import { useUserContext } from './useUserContext';
import { CardPoolProvider } from './CardPoolContext';
import { CardLibraryProvider } from './CardLibraryContext';

/**
 * AppProvider combines all context providers in the proper hierarchy
 * This is the main context wrapper that should be used at the app root
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UserProvider>
      <AppProviderInner>
        {children}
      </AppProviderInner>
    </UserProvider>
  );
};

/**
 * Inner provider component that uses the user context
 * This separation is needed because we need to access user context values
 * to pass down to other providers
 */
const AppProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user } = useUserContext();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const userId = user?.id?.toString();

  return (
    <UserProvider>
      <CardLibraryProvider>
        <CardPoolProvider>
          <LeagueProvider token={token} apiBaseUrl={apiBaseUrl}>
            <SeasonProvider userId={userId}>
              <TeamProvider>
                <DraftProvider>
                  {children}
                </DraftProvider>
              </TeamProvider>
            </SeasonProvider>
          </LeagueProvider>
        </CardPoolProvider>
      </CardLibraryProvider>
    </UserProvider>
  );
};

export default AppProvider;