import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import GrupeProizvodaPregled from './pages/grupaproizvoda/GrupeProizvodaPregled'


function App() {
  

  return (
   <Container>
    <NavBarEdunova />

    <Container className='app'>
    <Routes>
      <Route path={RouteNames.HOME} element={<Pocetna />} />
      <Route path={RouteNames.GRUPA_PROIZVODA} element={<GrupeProizvodaPregled />} />
    </Routes>
    </Container>

    <hr />
    &copy; Dario 
    
   </Container>
  )
}

export default App
