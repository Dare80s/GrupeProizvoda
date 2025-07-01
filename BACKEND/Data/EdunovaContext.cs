using BACKEND.Models;
using Microsoft.EntityFrameworkCore;

namespace BACKEND.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> options) : base(options)
        {
            // ovdje se mogu postaviti opcije, ali ne sada
        }
        public DbSet<GrupaProizvoda> Grupe_Proizvoda { get; set; }
    }
}
