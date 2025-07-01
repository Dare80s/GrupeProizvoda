using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models
{
    public class GrupaProizvoda
    {
        [Key]
        public int Sifra_grupe { get; set; }
        public string Naziv_grupe { get; set; } = "";

    }
}
