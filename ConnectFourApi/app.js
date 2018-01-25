const express = require('express')
const app = express()
const gameRepo = require('./gameRepository');
var bodyParser = require('body-parser')


app.use(express.static('../ConnectFourFrontEnd/dist'));
app.get('/', (req, res) => res.send('Hello World!'))

app.use(bodyParser());

app.post('/SaveGame', (req, res) => {
    game = new gameRepo();
    game.saveGame(req.body);
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))