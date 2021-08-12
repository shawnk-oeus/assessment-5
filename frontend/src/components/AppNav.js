import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'reactstrap';


const AppNav = ({isLoggedIn, handleLogout}) => {
  
    return (
      <div>     
        <Navbar color="light" expand="lg">
            <NavItem>
              <Link to="/">
                Home
              </Link> 
            </NavItem>
            { !isLoggedIn &&
              <div>
                <NavItem>
                  <Link to="/login">
                    Login
                  </Link> 
                </NavItem>
                <NavItem>
                  <Link to="/signup">
                    Signup
                  </Link> 
                </NavItem>
              </div>
            }         
            { isLoggedIn && 
              <div>
                <NavItem>
                  <Link to='/startgame'>Play Game</Link>
                </NavItem>
                <NavItem>
                <Link to='/statistics'>Stats</Link>
              </NavItem>
              <NavItem onClick={handleLogout}>
                  <Link to='/'>Logout</Link>
              </NavItem>
              </div>           
            }
            
        </Navbar>
      </div>
    )
}


export default AppNav;
