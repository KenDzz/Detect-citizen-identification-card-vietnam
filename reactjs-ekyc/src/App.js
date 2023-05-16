import './App.css';
import { Container, Accordion, Image ,Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route,Link, useLocation} from 'react-router-dom';
import MyHistory from './pages/history';
import MyeKYC from './pages/ekyc';

function App() {
    return (
        
        <Container>
                <div className="box">
            <Router>
            <Navbar  expand="lg" variant="light" bg="light" className='p-3 mb-5 shadow p-3 mb-5 bg-white rounded'>
                <Navbar.Brand href="#home">KenDzz</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Link className="nav-link nav-hover" to="/">eKYC</Link>
                    <Link className="nav-link nav-hover" to="/history">History</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
               <Routes>
                    <Route path='/' element={<MyeKYC/>} />
                    <Route path='/history' element={<MyHistory/>} />
                </Routes>
            </Router>
            </div>
        </Container> 
    );
}

export default App;
