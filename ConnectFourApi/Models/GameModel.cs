using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace ConnectFour.Models
{
    [Table("GameBoards")]
    public class GameModel
    {
        public GameModel()
        {
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string winner { get; set; }

        public DateTime DatePlayed { get; set; }
    }
}
