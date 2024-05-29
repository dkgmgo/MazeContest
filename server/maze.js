const fs = require('fs');
const vm = require('vm');

function validateAlgorithm(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    try {
        new vm.Script(code); // Validates if the code is valid JavaScript
        return true;
    } catch (err) {
        return false;
    }
}

function executeAlgorithmInFile(filePath, maze) {
    const code = fs.readFileSync(filePath, 'utf8');
    return executeAlgorithm(code, maze)
}

function executeAlgorithm(code, maze) {
    const sandbox = {
        maze,
        player: { x: 0, y: 0 },
        moves: [{ x: 0, y: 0, direction: 'down' }],
        move: (direction) => {
            const { x, y } = sandbox.player;
            let newX = x;
            let newY = y;
            switch (direction) {
                case 'up':
                    newY = y > 0 ? y - 1 : y;
                    break;
                case 'down':
                    newY = y < maze.length - 1 ? y + 1 : y;
                    break;
                case 'left':
                    newX = x > 0 ? x - 1 : x;
                    break;
                case 'right':
                    newX = x < maze[0].length - 1 ? x + 1 : x;
                    break;
            }
            if (maze[newY][newX] === 0) { // Only move if the new position is not a wall
                sandbox.player.x = newX;
                sandbox.player.y = newY;
            } else { //else the player is stuck
                console.log('Player is stuck');
                throw new Error('stuck');
            }

            sandbox.moves.push({ direction, x: sandbox.player.x, y: sandbox.player.y });
            // console.log('Player moved to', sandbox.player.x, sandbox.player.y);

            //check if the player has reached the goal
            if (sandbox.player.x === maze[0].length - 1 && sandbox.player.y === maze.length - 1) {
                console.log('Player reached the goal');
                throw new Error('goal');
            }
        },
    };
    vm.createContext(sandbox);
    try {
        vm.runInContext(code, sandbox);
    } catch (err) {
        if (err.message === 'stuck' || err.message === 'goal') {
            return sandbox.moves;
        }
        console.log('Error executing algorithm:', err);
    }

    return sandbox.moves;
}

function generateMaze(width, height, algorithm) {
    // TODO : Implement the other algorithms
    return simpleAlgo(width, height)
}

function simpleAlgo(width, height) {
    let grid = [];

    for (let i = 0; i < height; i++) {
        let row = [];
        if (i % 2 == 0) {
            for (let j = 0; j < width; j++) {
                if (j % 2 == 0) {
                    row.push(0);
                } else {
                    row.push(1);
                }
            }
        } else {
            row = Array(width).fill(1);
        }
        grid.push(row);
    }

    let counter = 2;
    let walls = [];

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (grid[i][j] == 0) {
                grid[i][j] = counter;
                counter += 1;
            } else {
                walls.push([i, j]);
            }
        }
    }

    const end = (grid) => {
        let winner = grid[0][0];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (grid[i][j] != winner && grid[i][j] != 1) {
                    return false;
                }
            }
        }
        return true;
    }


    while (!end(grid)) {
        walls = walls.sort(() => Math.random() - 0.5);

        let [i, j] = walls.pop();


        cells = [];

        if (i - 1 >= 0 && grid[i - 1][j] == 1) {
            cells = (j > 0 && j < width - 1) ? [grid[i][j - 1], grid[i][j + 1]] : [];
        } else {
            cells = (i > 0 && i < height - 1) ? [grid[i - 1][j], grid[i + 1][j]] : [];
        }

        if (cells && cells[0] != cells[1] && cells[0] != 1 && cells[1] != 1) {
            grid[i][j] = cells[0];

            for (let k = 0; k < height; k++) {
                for (let l = 0; l < width; l++) {
                    if (grid[k][l] == cells[1]) {
                        grid[k][l] = cells[0];
                    }
                }
            }
        }

    }

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (grid[i][j] != 1) {
                grid[i][j] = 0;
            }
        }
    }

    return grid;
}

module.exports = { validateAlgorithm, executeAlgorithm, executeAlgorithmInFile, generateMaze };
