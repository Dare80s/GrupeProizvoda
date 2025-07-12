import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import GrupeProizvoda from "../../services/GrupeProizvoda";
import { NumericFormat } from "react-number-format";


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

    return(
        <>
        Tablični Pregled grupe proizvoda
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                </tr>
            </thead>
            <tbody>
                {grupeProizvoda &&grupeProizvoda.map((grupaproizvoda,index)=>(
                    <tr key={index}>
                        <td>{grupaproizvoda.naziv}</td>
                        
                    </tr>
                ))}
            </tbody>

        </Table>

        </>
    )
}