let directions = [[0, -1, 'up'], [0, 1, 'down'], [-1, 0, 'left'], [1, 0, 'right']];

function bfs(maze, start) {
    let queue = [[...start, null]];
    let visited = new Set([`${start[0]},${start[1]}`]);
    let path = {};

    while (queue.length > 0) {
        let [x, y, dir] = queue.shift();

        if (x === maze.length - 1 && y === maze[0].length - 1) {
            let moves = [];
            while (x !== start[0] || y !== start[1]) {
                moves.unshift(dir);
                [x, y, dir] = path[`${x},${y}`];
            }
            return moves;
        }

        for (let [dx, dy, newDir] of directions) {
            let newX = x + dx;
            let newY = y + dy;

            if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length && maze[newY][newX] === 0 && !visited.has(`${newX},${newY}`)) {
                queue.push([newX, newY, newDir]);
                visited.add(`${newX},${newY}`);
                path[`${newX},${newY}`] = [x, y, dir];
            }
        }
    }

    throw new Error('stuck');
}

let start = [0, 0];
let moves = bfs(maze, start);
moves.forEach(m => {
    move(m);
});