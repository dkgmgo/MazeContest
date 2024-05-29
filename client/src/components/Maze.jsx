import React, { useRef, useEffect, useState } from 'react';

const Maze = ({ mazeData, initialPlayersPositions, celluleSize, moves }) => {
    const canvasRef = useRef(null);
    const cellSize = celluleSize ? celluleSize : 20;
    const [currentStep, setCurrentStep] = useState(0);

    const drawAll = (players) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const numRows = mazeData.length;
        const numCols = mazeData[0].length;
        canvas.width = numCols * cellSize;
        canvas.height = numRows * cellSize;

        // Define colors
        const wallColor = 'black';
        const pathColor = 'white';
        const borderColor = 'gray';

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the maze
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                // walls and paths 
                ctx.fillStyle = mazeData[row][col] === 1 ? wallColor : pathColor;
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }

        // Draw the border around the maze
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, numCols * cellSize, numRows * cellSize);

        // Draw the goal
        ctx.fillStyle = 'green';
        ctx.fillRect((numCols - 1) * cellSize, (numRows - 1) * cellSize, cellSize, cellSize);

        drawPlayers(ctx, players);
    }

    const drawPlayers = (ctx, players) => {
        if (players) {
            players.forEach((player, index) => {
                ctx.fillStyle = players[index].color;
                ctx.beginPath();
                ctx.arc((player.x + 0.5) * cellSize, (player.y + 0.5) * cellSize, cellSize / 2.5, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
    }

    useEffect(() => {
        drawAll(initialPlayersPositions);
    }, [mazeData]);

    useEffect(() => {
        if (Object.keys(moves).length > 0) {
            const maxSteps = Math.max(...Object.values(moves).map(value => value.length));
            const interval = setInterval(() => {
                setCurrentStep((prevStep) => {
                    const nextStep = prevStep + 1;
                    if (nextStep >= maxSteps) {
                        clearInterval(interval);
                    }
                    return nextStep;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [moves]);

    useEffect(() => {
        let newPlayers = []
        Object.entries(moves).forEach(entry => {
            const [key, value] = entry;
            const move = value[Math.min(currentStep, value.length - 1)];
            newPlayers.push({ x: move.x, y: move.y, color: key });
        });
        drawAll(newPlayers);
    }, [currentStep, moves]);

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default Maze;
