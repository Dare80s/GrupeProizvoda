import { HttpService } from "./HttpService"

async function  get() {
    return await HttpService.get('/GrupaProizvoda')
    // sve je u redu,dobili smo odgovor
    .then((odgovor)=>{
        //console.log(odgovor.data)
        return odgovor.data
    })
    //nastala je greška,obradi ju
    .catch((e)=>{})
    
}


async function  getBySifra(sifra) {
    return await HttpService.get('/GrupaProizvoda/' + sifra)
    // sve je u redu,dobili smo odgovor
    .then((odgovor)=>{
        //console.log(odgovor.data)
        return odgovor.data
    })
    //nastala je greška,obradi ju
    .catch((e)=>{})
    
}


async function dodaj(gp) {
    return await HttpService.post('/GrupaProizvoda',gp)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}


async function obrisi(sifra) {
    return await HttpService.delete('/GrupaProizvoda/'+sifra)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

async function promjeni(sifra, GrupaProizvoda) {
    return await HttpService.put('/GrupaProizvoda/'+sifra,GrupaProizvoda)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}
export default{
    get,
    getBySifra,
    dodaj,
    obrisi,
    promjeni
}