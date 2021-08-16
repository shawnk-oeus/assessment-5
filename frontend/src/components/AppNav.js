import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container} from 'react-bootstrap'; 
import UserContext from '../context/UserContext';


const AppNav = ({ handleLogout}) => {
    const userContext = useContext(UserContext);

    return (    
       <Container>
        <Navbar bg="light" expand="sm">
          <Navbar.Brand href="">Sudoku</Navbar.Brand>
          <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Navbar.Text>
                <Link to="/">
                  Home
                </Link> 
              </Navbar.Text>
              { !userContext.isLoggedIn &&           
                <Navbar.Text>
                  <Link to="/login">Login</Link> 
                </Navbar.Text>
              }
              {
                !userContext.isLoggedIn && 
                <Navbar.Text>
                  <Link to="/signup">Signup</Link> 
                </Navbar.Text>
              }        
              { userContext.isLoggedIn && 
                <Navbar.Text>
                  <Link to='/startgame'>Play Game</Link>
                </Navbar.Text>
              }
              { userContext.isLoggedIn &&
                <Navbar.Text>
                    <Link to='/statistics'>Stats</Link>
                </Navbar.Text>

              }
              { userContext.isLoggedIn &&
                <Navbar.Text onClick={handleLogout}>
                  <Link to='/'>Logout</Link>
                </Navbar.Text>
              }
              </Nav>
          </Navbar.Collapse>        
        </Navbar>
       </Container>
      
    )
}


export default AppNav;
