import React, { useState } from 'react';
import CodeInput from '../components/CodeInput';
import Maze from '../components/Maze';

const TrainView = () => {

    const [moves, setMoves] = useState([])

    const trainMaze = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const player = { x: 0, y: 0, color: 'red' }

    const train = async (code) => {
        const data = { code, maze: trainMaze };

        const response = await fetch('http://localhost:3001/train', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Code Executed successfully');
            const data = await response.json();
            setMoves(data.moves);
        } else {
            alert('Code Execution failed refresh and try again');
        }
    }

    return (
        <div className='p-3'>
            <h1>Welcome to Training</h1>
            <p> Here you can test your code on this 10x10 simple maze before uploading it </p>
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ flex: 1, padding: '10px' }}>
                    <CodeInput handleSubmit={train} />
                </div>
                <div className='text-center' style={{ flex: 1, padding: '10px' }}>
                    <Maze mazeData={trainMaze} initialPlayersPositions={[player]} celluleSize={30} moves={moves} />
                </div>
            </div>
        </div>
    );
};

export default TrainView;