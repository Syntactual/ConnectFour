using System;
using ConnectFour.Models;

namespace ConnectFour.Repositories
{
    public class GameRepository : IGameRepository
    {
        GameContext _context;
        public GameRepository(GameContext context)
        {
            _context = context;
        }

        public void SaveGame(GameModel game)
        {
            _context.GameBoards.Add(game);
            _context.SaveChanges();
        }
    }
}
