// contexts/cardPools/useCardPool.ts
import { useContext } from 'react';
import CardPoolContext from './CardPoolContext';

/**
 * Custom hook to use the CardPool context
 */
export const useCardPool = () => {
  const context = useContext(CardPoolContext);
  
  if (context === undefined) {
    throw new Error('useCardPool must be used within a CardPoolProvider');
  }
  
  return context;
};

export default useCardPool;