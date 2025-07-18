import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import GrupeProizvoda from "../../services/GrupeProizvoda";
import { useEffect, useState } from "react";


export default function GrupeProizvodaPromjena(){
    
    const navigate  = useNavigate();
    const params = useParams()
    const[gp,setGp] = useState({})

    async function ucitajGrupeProizvoda() {
        const o = await GrupeProizvoda.getBySifra(params.sifra)
        setGp(o)
    }

    useEffect(()=>{
        ucitajGrupeProizvoda()
    },[])

    async function promjena(sifra,gp){
        const odgovor = await GrupeProizvoda.promjeni(sifra,gp);
        navigate(RouteNames.GRUPA_PROIZVODA);
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        promjena(
            params.sifra,
            {
            naziv: podaci.get('naziv')
            }
        )


    }


    return (
        <>
        Dodavanje smjera
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required defaultValue={gp.naziv}/>
            </Form.Group>

            


            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.GRUPA_PROIZVODA}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Promjeni GP
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}

        
        


    
