using BACKEND.Data;
using BACKEND.Models;
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
            _context = context;
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


        [HttpPost]
        public IActionResult Post(GrupaProizvoda GrupaProizvoda)
        {
            try
            {
                _context.Grupe_Proizvoda.Add(GrupaProizvoda);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, GrupaProizvoda);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }




        [HttpPut("sifra:int")]
        public IActionResult Put(int sifra, GrupaProizvoda GrupaProizvoda)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veća od 0" });
            }

            try
            {
                var grupa = _context.Grupe_Proizvoda.Find(sifra);
                if (grupa == null)
                {
                    return NotFound(new { poruka = "Grupa nije pronađena" });
                }
                grupa.Naziv = GrupaProizvoda.Naziv;
                _context.Grupe_Proizvoda.Update(grupa);
                _context.SaveChanges();
                return Ok(grupa);
            }
            catch (Exception e)
            {
                return BadRequest(e);



            }

        }





            [HttpDelete("{sifra:int}")]
            public IActionResult Delete(int sifra)
            {
                if (sifra < 1)
                {
                    return BadRequest(new { poruka = "Sifra mora biti veća od 0" });
                }

                try
                {
                    var grupa = _context.Grupe_Proizvoda.Find(sifra);
                    if (grupa == null)
                    {
                        return NotFound(new { poruka = "Grupa nije pronađena" });
                    }
                
                    _context.Grupe_Proizvoda.Remove(grupa);
                _context.SaveChanges();
                    return Ok(grupa);
                }
                catch (Exception e)
                {
                    return BadRequest(e);



                }





            
        }

    }
}