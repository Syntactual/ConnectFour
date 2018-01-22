using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace ConnectFour.Models
{
    public class GameModel
    {
        public GameModel()
        {
        }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public string gameBoard { get; set; }

        public DateTime DatePlayed { get; set; }
    }
}
