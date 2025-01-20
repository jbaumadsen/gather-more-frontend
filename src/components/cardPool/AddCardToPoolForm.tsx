import { useState, useEffect } from 'react';
import useUserContext from '../../hooks/useUserContext';
import { Card } from '../../types/card.types';
import { CardPool } from '../../types/cardPool.types';

const AddCardToPoolForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedCards, setSuggestedCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { cards, currentCardPool, setCurrentCardPool } = useUserContext();

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredCards = cards.filter((card: Card) => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSuggestedCards(filteredCards.slice(0, 10));
      console.log(filteredCards);
    } else {
      setSuggestedCards([]);
    }
  }, [searchTerm, cards]);

  const handleAddCard = (card: Card) => {
    if (!currentCardPool?._id) return;
    console.log("Addingcard", card);
    const updatedCardPool: CardPool = {
      _id: currentCardPool._id,
      name: currentCardPool.name || '',
      ruleSet: currentCardPool.ruleSet || '',
      cardSets: currentCardPool.cardSets || [],
      cards: currentCardPool?.cards ? [...currentCardPool.cards, card] : [card]
    };
    console.log(updatedCardPool);
    setCurrentCardPool(updatedCardPool);
    setSearchTerm('');
    setSuggestedCards([]);
    setCurrentCardIndex(0);
  }

  const handleMoveDown = () => {
    setCurrentCardIndex(currentCardIndex + 1);
  }

  const handleMoveUp = () => {
    setCurrentCardIndex(currentCardIndex - 1);
  }

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestedCards.length > 0) {
          handleAddCard(suggestedCards[currentCardIndex]);
        }
        break;
      case 'ArrowDown':
        handleMoveDown();
        break;
      case 'ArrowUp':
        handleMoveUp();
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Card to Pool</h1>
      <input 
        className="border border-gray-300 rounded-md p-2" 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleOnKeyPress}
      />
      <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => handleAddCard(suggestedCards[currentCardIndex])}>Search</button>
      <div>
        {suggestedCards.map((card, index) => (
          // if index is the current card index, make it bold
          <div className={`cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md m-1 ${index === currentCardIndex ? 'font-bold' : ''}`} key={index} onClick={() => handleAddCard(card)}>
            <span className="cursor-pointer" onClick={() => handleAddCard(card)}>{card.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddCardToPoolForm;