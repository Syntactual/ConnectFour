const sql = require('mssql')
const WinningGameModel = require('./models/WinningGameModel');

module.exports = class GameRepository{
    async saveGame(WinningGameModel){
        try {
            
            const pool = await sql.connect('Server=tcp:connect-four-dev.database.windows.net,1433;Initial Catalog=connect-four-db;Persist Security Info=False;User ID=elanjoshrand;Password=Fooldog12;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;')
            const result = await sql.query`insert into GameBoards (winner, DatePlayed)
                                            values (${WinningGameModel.winner}, ${WinningGameModel.datePlayed})`
            console.log(result)
        } catch (err) {
            console.error(err)
        }
    }
}

