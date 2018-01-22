using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConnectFour.Models;
using ConnectFour.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ConnectFour.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly IGameRepository _gameRepo;

        public GameController(IGameRepository gameRepo){
            _gameRepo = gameRepo;
        }
        

        // POST api/SaveGame
        [HttpPost]
        public void SaveGame(string board)
        {
            var game = new GameModel
            {
                DatePlayed = DateTime.Now,
                gameBoard = board
            };

            _gameRepo.SaveGame(game);
        }

       

       
    }
}
