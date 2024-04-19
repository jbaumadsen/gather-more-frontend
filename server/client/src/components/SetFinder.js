import React, { useState } from 'react';

function SetFinder() {
    const [setName, setSetName] = useState('');
    const [setDetails, setSetDetails] = useState(null);

    const handleInputChange = (event) => {
        setSetName(event.target.value);
    };

    const handleGetSetClick = async () => {
        try {
            const response = await fetch(`/api/mtg/sets?setName=${encodeURIComponent(setName)}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const setData = await response.json();
            setSetDetails(setData);
        } catch (error) {
            console.error('Failed to fetch set:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={setName}
                onChange={handleInputChange}
                placeholder="Enter set name"
            />
            <button onClick={handleGetSetClick}>Get Set</button>
            {setDetails && (
                <div>
                    <p>Name: {setDetails.name}</p>
                    <p>Type: {setDetails.type}</p>
                    {/* Add more fields as needed */}
                </div>
            )}
        </div>
    );
}

export default SetFinder;