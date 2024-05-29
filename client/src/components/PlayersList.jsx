import React, { useEffect, useState } from 'react';
import utils from '../utils';

function PlayersList() {
    const [players, setPlayers] = useState(null);

    useEffect(async () => {
        setPlayers(await utils.getPlayers());
    }, []);

    return (
        <div className='d-flex justify-content-around container border rounded flex-column mt-5'>
            <h2 className='text-center'>Players List</h2>
            <ul className='list-group'>
                {players && players.map((player, index) => (
                    <li key={index} className='list-group-item'>
                        <div className='mt-2 bg-light border rounded'>{player}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayersList;
