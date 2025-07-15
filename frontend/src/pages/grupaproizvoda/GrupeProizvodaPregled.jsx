import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import GrupeProizvoda from "../../services/GrupeProizvoda";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function GrupeProizvodaPregled(){

    const[grupeProizvoda, setGrupeProizvoda] = useState([])

     async function dohvatiGrupeProizvoda() {
        const odgovor = await GrupeProizvoda.get()
        setGrupeProizvoda(odgovor)

     }

    //hooks se izvodi prilikom dolaska na stranicu GrupeProizvoda
    useEffect(()=>{
        dohvatiGrupeProizvoda()
    },[])

     function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return;
        }
        brisanje(sifra)
    }

    async function brisanje(sifra) {
        const odgovor = await GrupeProizvoda.obrisi(sifra);
        dohvatiGrupeProizvoda();
    }


    return(
        <>
        

        <Link 
        className="btn btn-success"
        to={RouteNames.GRUPA_PROIZVODA_NOVI} >Dodavanje GrupeProizvoda</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {grupeProizvoda &&grupeProizvoda.map((grupaproizvoda,index)=>(
                    <tr key={index}>
                        <td>{grupaproizvoda.naziv}</td>
                        <td>
                            <Button variant="danger"
                            onClick={()=>obrisi(grupaproizvoda.sifra)}>
                                Obriši
                            </Button>                        
                        </td>
                        
                    </tr>
                ))}
            </tbody>

        </Table>

        </>
    )
}