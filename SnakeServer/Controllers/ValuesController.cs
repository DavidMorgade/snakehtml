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
    }
}
