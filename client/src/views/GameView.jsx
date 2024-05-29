import React, { useEffect, useState } from 'react';
import ComboBox from '../components/ComboBox';
import utils from '../utils';
import Maze from '../components/Maze';

const GameView = () => {
    const colors = ['red', 'blue', 'yellow', 'purple', 'pink', 'brown', 'gray', 'black']; // not green cause it's the goal color
    const levelItems = ['easy', 'medium', 'hard'];

    const [selectPlayers, setSelectPlayers] = useState([]);
    const [level, setLevel] = useState('easy');
    const [playersList, setPlayersList] = useState([]);
    const [generatedMaze, setGeneratedMaze] = useState([[]]);
    const [moves, setMoves] = useState([]);
    const [spinner, setSpinner] = useState(false);

    const handleSelect = (values) => {
        setSelectPlayers(values);
    };

    const startGame = async () => {
        setSpinner(true);
        const maze = await utils.generateMaze(level);
        setGeneratedMaze(maze);
        setSpinner(false);
        setMoves(await utils.play(selectPlayers.map((player, index) => ({ name: player, color: colors[index % colors.length] })), maze));
        console.log(moves);
        alert('Game Started');
    }

    useEffect(async () => {
        setPlayersList(await utils.getPlayers());
    }, []);

    return (
        <div className='p-2'>
            <h1 className='mx-5'>Launch a Game</h1>
            <div className='d-flex justify-content-around mt-5'>
                <div>
                    <ComboBox items={playersList} onSelect={handleSelect} label='Select Players' />
                    <ul>
                        {selectPlayers.map((value, index) => (
                            <li key={index} style={{ color: colors[index % colors.length] }}><h5>{value}</h5></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ComboBox items={levelItems} onSelect={(value) => setLevel(value[0])} singleSelect={true} label='Level' />
                </div>
            </div>
            <div className='d-flex justify-content-around mt-2'>
                <button className='btn btn-primary' onClick={startGame}>Start Game</button>
            </div>
            <div className='text-center mt-5'>
                {
                    spinner ? <div class="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> : <Maze mazeData={generatedMaze} initialPlayersPositions={[]} moves={moves} />
                }
            </div>
        </div>
    );
};

export default GameView;