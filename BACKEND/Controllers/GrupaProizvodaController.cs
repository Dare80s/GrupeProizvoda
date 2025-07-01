using BACKEND.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Linq.Expressions;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GrupaProizvodaController : ControllerBase 
    {
        // koristimo dependency injection

        // 1.  definiramo privatno svojstvo
        private readonly EdunovaContext _context;

        // 2. u konstruktoru postavljamo vrijednost
        public GrupaProizvodaController(EdunovaContext context)
        {
            _context = context ;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Grupe_Proizvoda);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}


