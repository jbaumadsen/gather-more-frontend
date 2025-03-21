import { useContext } from 'react';
import UserContext, { IUserContext } from './UserContext';

/**
 * Custom hook for accessing the UserContext
 * 
 * @returns The user context values and methods
 * @throws Error if used outside of a UserProvider
 */
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  
  return context;
};

export default useUserContext;