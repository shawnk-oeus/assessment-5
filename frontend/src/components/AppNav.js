import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container} from 'react-bootstrap'; 


const AppNav = ({isLoggedIn, handleLogout}) => {


    return (    
        <Navbar bg="light" expand="sm">
          <Container>
            <Navbar.Brand href="#home">Sudoku</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="justify-content-end">
            <Nav className="me-auto">
              <Navbar.Text>
                <Link to="/">
                  Home
                </Link> 
              </Navbar.Text>
              { !isLoggedIn &&           
                <Navbar.Text>
                  <Link to="/login">Login</Link> 
                </Navbar.Text>
              }
              {
                !isLoggedIn && 
                <Navbar.Text>
                  <Link to="/signup">Signup</Link> 
                </Navbar.Text>
              }        
              { isLoggedIn && 
                <Navbar.Text>
                  <Link to='/startgame'>Play Game</Link>
                </Navbar.Text>
              }
              { isLoggedIn &&
                <Navbar.Text>
                   <Link to='/statistics'>Stats</Link>
                </Navbar.Text>

              }
              { isLoggedIn &&
                <Navbar.Text onClick={handleLogout}>
                  <Link to='/'>Logout</Link>
                </Navbar.Text>
              }
              </Nav>
            </Navbar.Collapse>         
          </Container>
            
        </Navbar>
    )
}


export default AppNav;
