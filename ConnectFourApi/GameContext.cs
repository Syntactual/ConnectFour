using System;
using Microsoft.EntityFrameworkCore;
using ConnectFour.Models;

namespace ConnectFour
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options) : base(options)
        {
        }

        public DbSet<GameModel> GameBoards { get; set; }
    }
}
