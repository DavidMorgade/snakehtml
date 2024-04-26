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
    }
}
