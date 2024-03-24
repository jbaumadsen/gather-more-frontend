import React, { createContext, useState, useEffect } from 'react';

const ProgramContext = createContext();

function ProgramContextProvider(props) {
    const [activeCards, setActiveCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/set2?setName=ravnica&page=1');
            const data = await response.json();
            console.log('data shoul be coming?');
            console.log(data);
            setActiveCards(data);
        };

        fetchData();
    }, []);

    return (
        <ProgramContext.Provider value={{ activeCards }}>
            {props.children}
        </ProgramContext.Provider>
    );
}

export { ProgramContext, ProgramContextProvider };