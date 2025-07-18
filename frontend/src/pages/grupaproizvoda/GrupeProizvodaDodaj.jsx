import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import GrupeProizvoda from "../../services/GrupeProizvoda";


export default function GrupeProizvodaDodaj(){
    
    const navigate  = useNavigate();

    async function dodaj(gp){
        const odgovor = await GrupeProizvoda.dodaj(gp);
        navigate(RouteNames.GRUPA_PROIZVODA);
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        dodaj(
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
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            


            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.GRUPA_PROIZVODA}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Dodaj GP
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}

        
        


    
