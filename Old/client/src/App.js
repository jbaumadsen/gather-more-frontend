import React, { useContext } from 'react';
import { ProgramContext } from './context/ProgramContext';
import SetFinder from './components/setfinder';

function App() {
  const { activeCards } = useContext(ProgramContext);

  return (
    <div className="App">
      <p>hello</p>
      {/* Use activeCards here */}
      <SetFinder></SetFinder>
      {activeCards.length ? activeCards.map(card => (
        <div className="mtg_fun_card" key={card.id}>
          {/* <h3>{card.name}</h3>
          <p>{card.text}</p> */}
          <img src={card.imageUrl} alt="" />
        </div>
      )): <p>no cards yet</p>}
    </div>
  );
}

export default App;
