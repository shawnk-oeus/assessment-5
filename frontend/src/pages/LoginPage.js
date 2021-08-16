import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap'
import UserContext from '../context/UserContext';

const Login = ({handleLogin}) => {

  const userContext = useContext(UserContext);

  if (userContext.isLoggedIn) {
    return (<div>
       <Redirect to="/" />
    </div>)
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name='username' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" name='password'/>
        </Form.Group>
        <Button variant="primary" type="submit" id='loginButton'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;


// <h1>Login Page</h1>
//       <form onSubmit={handleLogin}>
//         <label>User Name:</label>
//         <input type='text' placeholder='Enter username' name='username' />
//         <br />
//         <label>Password:</label>
//         <input type='password' name='password' />
//         <br />
//         <button type='submit' >Submit</button>
//         <br />
//       </form>