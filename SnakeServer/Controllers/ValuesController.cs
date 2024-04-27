using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnakeServer.Data;
using SnakeServer.models;

namespace SnakeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        public ValuesController(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        // Create a new Highscore with user
        [HttpPost]
        public async Task<ActionResult<List<User>>> AddScore(User newUser)
        {
            if(newUser != null)
            {
                appDbContext.Users.Add(newUser);
                await appDbContext.SaveChangesAsync();
                return Ok(await appDbContext.Users.ToListAsync());
            }
            return BadRequest("Object instance not set");
        }
        // Get all Highscores from the database
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetScores()
        {
            return Ok(await appDbContext.Users.ToListAsync());
        }
        // Get the top 10 Highscores
        [HttpGet("top")]
        public async Task<ActionResult<List<User>>> GetTopScores()
        {
            return Ok(await appDbContext.Users.OrderByDescending(u => u.Score).Take(10).ToListAsync());
        }
        // Get a specific Highscore by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetScore(int id)
        {
            var user = await appDbContext.Users.FindAsync(id);
            if(user != null)
            {
                return Ok(user);
            }
            return NotFound("User not found");
        }
        // Delete all Highscores
        [HttpDelete]
        public async Task<ActionResult> DeleteScores()
        {
            appDbContext.Users.RemoveRange(appDbContext.Users);
            await appDbContext.SaveChangesAsync();
            return Ok("All users deleted");
        }
    }
}
