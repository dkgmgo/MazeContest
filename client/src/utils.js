async function getPlayers() {
    const response = await fetch('http://localhost:3001/players');
    let players = [];

    if (response.ok) {
        const data = await response.json();
        players = data.players.map(player => player.replace('.js', ''))
    } else {
        console.log(response);
        alert('Failed to fetch players');
    }

    return players;
}

async function generateMaze(level) {
    const response = await fetch(`http://localhost:3001/maze?level=${level}`);
    let maze = [];

    if (response.ok) {
        const data = await response.json();
        maze = data.maze;
    } else {
        console.log(response);
        alert('Failed to fetch maze');
    }

    return maze;
}

async function play(players, maze) {
    const response = await fetch(`http://localhost:3001/play?players=${JSON.stringify(players)}&maze=${JSON.stringify(maze)}`);
    let moves = {};

    if (response.ok) {
        const data = await response.json();
        moves = data.moves;
    } else {
        console.log(response);
        alert('Failed to fetch moves');
    }

    return moves;
}

export default { getPlayers, generateMaze, play };