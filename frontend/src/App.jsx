import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import GrupeProizvodaPregled from './pages/grupaproizvoda/GrupeProizvodaPregled'
import GrupeProizvodaDodaj from './pages/grupaproizvoda/GrupeProizvodaDodaj'


function App() {
  

  return (
   <Container>
    <NavBarEdunova />

    <Container className='app'>
    <Routes>
      <Route path={RouteNames.HOME} element={<Pocetna />} />
      <Route path={RouteNames.GRUPA_PROIZVODA} element={<GrupeProizvodaPregled />} />
      <Route path={RouteNames.GRUPA_PROIZVODA_NOVI} element={<GrupeProizvodaDodaj />} />
    </Routes>
    </Container>

    <hr />
    &copy; Dario 
    
   </Container>
  )
}

export default App
