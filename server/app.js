const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { validateAlgorithm, executeAlgorithm, executeAlgorithmInFile, generateMaze } = require('./maze');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, 'uploads', req.file.originalname);

    fs.rename(tempPath, targetPath, (err) => {
        if (err) return res.sendStatus(500);

        if (!validateAlgorithm(targetPath)) {
            fs.unlink(targetPath, () => { });
            return res.status(400).send('Invalid algorithm file');
        }

        res.sendStatus(200);
    });
});

app.get('/play', (req, res) => {
    const { players, maze } = req.query;
    let moves = {};
    JSON.parse(players).forEach(player => {
        const filePath = path.join(__dirname, 'uploads', `${player.name}.js`);
        moves[player.color] = executeAlgorithmInFile(filePath, JSON.parse(maze));
    });
    res.json({ moves });
});

app.get('/maze', (req, res) => {
    const { level } = req.query;
    let maze = [];
    if (level === 'easy') {
        maze = generateMaze(9, 9, 'easy');
    } else if (level === 'medium') {
        maze = generateMaze(15, 15, 'medium');
    } else {
        maze = generateMaze(21, 21, 'hard');
    }
    res.json({ maze });
});

app.get('/players', (req, res) => {
    // list all the files in the uploads directory
    const files = fs.readdirSync('./uploads');
    res.json({ players: files });
});

app.post('/train', (req, res) => {
    const { maze, code } = req.body;
    moves = executeAlgorithm(code, maze);
    res.json({ moves: { 'red': moves } });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
