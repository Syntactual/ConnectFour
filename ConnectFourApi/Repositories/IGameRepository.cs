using System;
using ConnectFour.Models;
namespace ConnectFour.Repositories
{
    public interface IGameRepository
    {
        void SaveGame(GameModel game);
    }
}
