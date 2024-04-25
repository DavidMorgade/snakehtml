namespace SnakeServer.models
{
    public class User
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public DateTime ScoredAt { get; set; } = DateTime.Now;
    }
}
